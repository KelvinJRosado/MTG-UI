<script setup lang="ts">
// Import Vue composition API utilities if needed in the future
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <header>
    <h1>Simple UI</h1>
    <nav>
      <!-- Navigation links -->
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
    </nav>
  </header>
  <main>
    <!-- Welcome message -->
    <section>
      <h2>Welcome to the Simple UI!</h2>
      <p>This is a Vue 3 app using the Composition API.</p>
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
