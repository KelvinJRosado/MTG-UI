<script setup lang="ts">
// Import Vue composition API utilities if needed in the future
import { RouterLink, RouterView } from 'vue-router';
import { ref } from 'vue';

const cardName = ref('');
const result = ref<any>(null);
const loading = ref(false);
const error = ref('');

async function searchCard() {
  error.value = '';
  result.value = null;
  if (!cardName.value) {
    error.value = 'Please enter a card name.';
    return;
  }
  loading.value = true;
  try {
    const apiUrl = `http://localhost:3000/api/card?name=${encodeURIComponent(
      cardName.value,
    )}`;

    console.log('Calling API endpoint:', apiUrl);

    const res = await fetch(apiUrl);
    if (!res.ok) {
      const err = await res.json();
      error.value = err.error || 'Error fetching card.';
    } else {
      result.value = await res.json();
    }
  } catch (e) {
    console.log('Network error:', e);
    error.value = 'Network error.';
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <header>
    <h1>MTG Simple UI</h1>
    <nav>
      <!-- Navigation links -->
      <RouterLink to="/">Home</RouterLink>
    </nav>
  </header>
  <main>
    <!-- Welcome message -->
    <section>
      <h2>Welcome to my Simple MTG UI!</h2>
      <p>
        TUse this page to display basic information about a selected MTG card.
        This site uses Scryfall data to fetch card details.
      </p>
    </section>
    <section style="margin-top: 2rem">
      <input
        v-model="cardName"
        type="text"
        placeholder="Enter card name"
        style="padding: 0.5rem; min-width: 200px"
        @keyup.enter="searchCard"
      />
      <button
        @click="searchCard"
        :disabled="loading"
        style="margin-left: 0.5rem; padding: 0.5rem 1rem"
      >
        {{ loading ? 'Searching...' : 'Search' }}
      </button>
      <div v-if="error" style="color: red; margin-top: 0.5rem">{{ error }}</div>
      <div v-if="result" style="margin-top: 1rem">
        <div v-if="result.image">
          <div
            style="
              height: 175px;
              width: 100%;
              max-width: 350px;
              overflow: hidden;
              border-radius: 8px;
              box-shadow: 0 2px 8px #0001;
              margin-bottom: 1rem;
            "
          >
            <img
              :src="result.image"
              :alt="result.name || 'Card image'"
              style="
                width: 100%;
                height: 350px;
                object-fit: cover;
                object-position: top;
                display: block;
              "
            />
          </div>
        </div>
      </div>
    </section>
    <RouterView />
  </main>
</template>

<style scoped lang="css">
header {
  line-height: 1.5;
  max-width: 100vw;
  background: #f8fafc;
  padding: 1rem 0;
  border-bottom: 1px solid #e5e7eb;
}

header h1 {
  margin: 0 0 0.5rem 1rem;
  font-size: 2rem;
  font-weight: 700;
  color: #2563eb;
}

nav > a {
  padding-left: 1rem;
  padding-right: 1rem;
  color: #2563eb;
  text-decoration: none;
}
nav > a.router-link-active {
  font-weight: bold;
  text-decoration: underline;
}
main {
  padding: 2rem 1rem;
}
</style>
