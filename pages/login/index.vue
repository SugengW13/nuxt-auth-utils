<script setup lang="ts">
definePageMeta({middleware: 'auth'})
</script>

<template>
  <div class="h-screen flex items-center justify-center">
    <div class="space-y-10 w-[360px]">
      <p class="text-4xl font-semibold text-center">Nuxt Auth Utils</p>

      <form-login />
    </div>
  </div>
</template>

<style scoped></style>