<script setup lang="ts">
const { loggedIn, user, session, fetch, clear } = useUserSession()

onMounted(async () => {
  await fetch()
})

async function onClickClearSession() {
  await clear()
  await fetch()
}
</script>

<template>
  <div class="h-screen flex items-center justify-center">
    <div class="max-w-2xl space-y-3">
      <p>Logged In : 
        <span>{{ loggedIn }}</span>
      </p>
      <p>User : 
        <span>{{ user }}</span>
      </p>
      <p>Session : 
        <span>{{ session }}</span>
      </p>

      <u-button color="red" @click="onClickClearSession">Clear Session</u-button>
    </div>
  </div>
</template>

<style scoped></style>