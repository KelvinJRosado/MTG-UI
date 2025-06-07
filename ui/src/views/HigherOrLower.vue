<template>
  <div class="higher-lower-container">
    <h2>Higher or Lower</h2>
    <p>Welcome to the Higher or Lower MTG game!</p>

    <div v-if="loading" class="loading-message">Loading card...</div>

    <div v-else-if="error" class="error-message">
      {{ error }}
    </div>

    <div v-else-if="card" class="game-container">
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

      <!-- Input area -->
      <div class="input-area">
        <p>Enter guess here</p>
        <div class="input-group">
          <input
            v-model="userGuess"
            placeholder="Enter guess here"
            class="guess-input"
          />
          <button @click="submitGuess" class="submit-button">Submit</button>
        </div>
      </div>
    </div>

    <button
      v-if="!loading && (!card || showNewCardButton)"
      @click="fetchRandomCard"
      class="new-card-button"
    >
      Get a Card
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const card = ref<any>(null);
const loading = ref(false);
const error = ref('');
const userGuess = ref('');
const showNewCardButton = ref(false);

async function fetchRandomCard() {
  error.value = '';
  card.value = null;
  loading.value = true;
  showNewCardButton.value = false;

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
      }
    }
  } catch (e) {
    console.error('Network error:', e);
    error.value = 'Network error. Is the API running?';
  } finally {
    loading.value = false;
  }
}

function submitGuess() {
  // Make sure userGuess has the current input value
  if (userGuess.value) {
    console.log('User guessed:', userGuess.value);
    // Currently we just log the value as specified in requirements
    // In the future, this would compare with card.value.cmc
  } else {
    console.log('No guess entered');
  }
}

onMounted(() => {
  // No automatic card fetch on mount, user needs to click the button
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

.input-area {
  width: 100%;
  max-width: 300px;
}

.input-group {
  display: flex;
  gap: 0.5rem;
}

.guess-input {
  flex: 1;
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.25rem;
  font-size: 1rem;
}

.submit-button,
.new-card-button {
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
.new-card-button:hover {
  background-color: #1d4ed8;
}

.new-card-button {
  margin-top: 1rem;
}
</style>
