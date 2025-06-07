<template>
  <div class="higher-lower-container">
    <h2>Higher or Lower</h2>

    <!-- Score display -->
    <div v-if="gameActive || gameOver" class="score-display">
      Score: {{ score }}
    </div>

    <p v-if="!gameActive && !gameOver">
      Welcome to the Higher or Lower MTG game!
    </p>

    <div v-if="loading" class="loading-message">Loading card...</div>

    <div v-else-if="error" class="error-message">
      {{ error }}
    </div>

    <!-- Game over screen -->
    <div v-else-if="gameOver" class="game-over">
      <h3>Game Over!</h3>
      <p>Your final score: {{ score }}</p>
      <p>The card "{{ card.name }}" was released in {{ card.yearReleased }}.</p>
      <button @click="startNewGame" class="new-game-button">Play Again</button>
    </div>

    <!-- Active game -->
    <div v-else-if="card && gameActive" class="game-container">
      <!-- Card display with top half of the image -->
      <div class="card-preview">
        <div class="card-image-container">
          <img
            v-if="card.image"
            :src="card.image"
            alt="Card preview"
            class="card-image"
          />
          <div v-else class="no-image">No image available</div>
        </div>
      </div>

      <!-- Random year and guess buttons -->
      <div class="game-question">
        <p>
          Was this card printed before or after <strong>{{ randomYear }}</strong
          >?
        </p>
        <div class="guess-buttons">
          <button @click="makeGuess('before')" class="guess-button lower">
            Before
          </button>
          <button @click="makeGuess('after')" class="guess-button higher">
            After
          </button>
        </div>
      </div>
      
      <!-- End game button -->
      <div class="end-game-container">
        <button @click="endGame" class="end-game-button">
          End Game
        </button>
      </div>
    </div>

    <!-- Start game button -->
    <button
      v-if="!loading && !gameActive && !gameOver"
      @click="startNewGame"
      class="new-card-button"
    >
      Start Game
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const card = ref<any>(null);
const loading = ref(false);
const error = ref('');
const gameActive = ref(false);
const gameOver = ref(false);
const score = ref(0);
const randomYear = ref(0);

// Generate a random year between 1993 (first MTG set) and current year
function generateRandomYear() {
  const startYear = 1993;
  const currentYear = new Date().getFullYear();
  return Math.floor(Math.random() * (currentYear - startYear + 1)) + startYear;
}

function startNewGame() {
  score.value = 0;
  gameOver.value = false;
  fetchRandomCard();
}

async function fetchRandomCard() {
  error.value = '';
  card.value = null;
  loading.value = true;

  try {
    const apiUrl = 'http://localhost:3000/api/random-card';
    const res = await fetch(apiUrl);

    if (!res.ok) {
      const err = await res.json();
      error.value = err.error || 'Error fetching random card.';
    } else {
      const data = await res.json();

      if (!data) {
        error.value = 'Could not get a valid card. Please try again.';
      } else {
        card.value = {
          name: data.name,
          image: data.image_uris?.normal || data.image_uris?.large || null,
          yearReleased: data.released_at
            ? new Date(data.released_at).getFullYear()
            : null,
          cmc: data.cmc || null,
        };

        // Generate a random year for comparison
        randomYear.value = generateRandomYear();

        // Set game active once we have a card
        gameActive.value = true;
      }
    }
  } catch (e) {
    console.error('Network error:', e);
    error.value = 'Network error. Is the API running?';
  } finally {
    loading.value = false;
  }
}

function makeGuess(guess: 'before' | 'after') {
  if (!card.value || !card.value.yearReleased) return;

  const cardYear = card.value.yearReleased;
  let isCorrect = false;

  // Check if guess is correct
  if (guess === 'after' && cardYear >= randomYear.value) {
    isCorrect = true;
  } else if (guess === 'before' && cardYear < randomYear.value) {
    isCorrect = true;
  }

  if (isCorrect) {
    // Increase score and get a new card
    score.value++;
    fetchRandomCard();
  } else {
    // End the game
    gameActive.value = false;
    gameOver.value = true;
  }
}

// Function to manually end the game
function endGame() {
  gameActive.value = false;
  gameOver.value = true;
}

onMounted(() => {
  // No automatic card fetch on mount, user needs to click the button to start
});
</script>

<style scoped>
.higher-lower-container {
  padding: 2rem;
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
}

h2 {
  color: #2563eb;
  margin-bottom: 1rem;
}

p {
  font-size: 1.2rem;
  color: #333;
  margin-bottom: 1.5rem;
}

.score-display {
  font-size: 1.5rem;
  font-weight: bold;
  color: #2563eb;
  margin-bottom: 1rem;
}

.loading-message,
.error-message {
  margin: 2rem 0;
  padding: 1rem;
  border-radius: 0.5rem;
}

.error-message {
  background-color: #fee2e2;
  color: #dc2626;
}

.game-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
}

.card-preview {
  width: 100%;
  max-width: 300px;
  margin-bottom: 2rem;
}

.card-image-container {
  position: relative;
  width: 100%;
  height: 210px; /* Half of a typical card height */
  overflow: hidden;
  border-radius: 4.75% 4.75% 0 0; /* Rounded corners on top only */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.card-image {
  width: 100%;
  object-fit: cover;
  object-position: top; /* Show only the top half */
  margin-bottom: -100%; /* Hide the bottom half */
}

.no-image {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #e5e7eb;
  color: #6b7280;
}

.game-question {
  width: 100%;
  max-width: 300px;
  margin-top: 1rem;
}

.guess-buttons {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 1rem;
}

.guess-button {
  flex: 1;
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 0.25rem;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s;
}

.lower {
  background-color: #ef4444;
  color: white;
}

.lower:hover {
  background-color: #dc2626;
}

.higher {
  background-color: #10b981;
  color: white;
}

.higher:hover {
  background-color: #059669;
}

.submit-button,
.new-card-button,
.new-game-button {
  padding: 0.5rem 1rem;
  background-color: #2563eb;
  color: white;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.2s;
}

.submit-button:hover,
.new-card-button:hover,
.new-game-button:hover {
  background-color: #1d4ed8;
}

.new-card-button,
.new-game-button {
  margin-top: 1rem;
}

.game-over {
  margin: 2rem 0;
  padding: 2rem;
  background-color: #f3f4f6;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.game-over h3 {
  font-size: 1.8rem;
  color: #2563eb;
  margin-bottom: 1rem;
}

.end-game-container {
  margin-top: 2rem;
  width: 100%;
  max-width: 300px;
  display: flex;
  justify-content: center;
}

.end-game-button {
  padding: 0.5rem 1rem;
  background-color: #6b7280;
  color: white;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.2s;
}

.end-game-button:hover {
  background-color: #4b5563;
}
</style>
