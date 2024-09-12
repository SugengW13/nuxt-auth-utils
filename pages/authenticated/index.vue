<script setup lang="ts">
definePageMeta({ middleware: 'is-auth' })

const { loggedIn, user, session, fetch, clear } = useUserSession()

const isLoading = ref(false)

onMounted(async () => {
  await fetch()
})

async function onClickLogout() {
  isLoading.value = true

  try {
    await clear()
    await fetch()

    navigateTo('/login')
  } catch (_) {
    useToast().add({ title: 'Unauthenticated', color: 'red' })
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="h-screen flex items-center justify-center">
    <div class="max-w-2xl space-y-3">
      <p>Logged In :
        <span>{{ loggedIn }}</span>
      </p>

      <u-button block color="red" :loading="isLoading" :disabled="isLoading" @click="onClickLogout">Logout</u-button>
    </div>
  </div>
</template>

<style scoped></style>