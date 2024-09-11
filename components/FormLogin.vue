<script setup lang="ts">
import { object, string, type InferType } from 'yup'
import type { FormSubmitEvent } from '#ui/types'

const $router = useRouter()

const schema = object({
  email: string().email('Invalid email').required('Required'),
  password: string()
    .min(8, 'Must be at least 8 characters')
    .required('Required')
})

type Schema = InferType<typeof schema>

const state = reactive({
  email: 'sugeng@gmail.com',
  password: 'password'
})

async function onSubmit (event: FormSubmitEvent<Schema>) {
  const {email, password} = event.data

  try {
    const res = await $fetch('/api/auth/login', {
      method: 'post', body: {
        email, password
      }
    })

    useToast().add({ title: res.message, color: 'green' })

    navigateTo('/authenticated')
  } catch (e) {
    useToast().add({ title: 'Wrong Email or Password', color: 'red' })
  }
}
</script>

<template>
  <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
    <UFormGroup label="Email" name="email">
      <UInput v-model="state.email" />
    </UFormGroup>

    <UFormGroup label="Password" name="password">
      <UInput v-model="state.password" type="password" />
    </UFormGroup>

    <UButton type="submit" block>
      Login
    </UButton>

    <UButton type="button" variant="outline" block @click="$router.push('/register')">
      Register
    </UButton>
  </UForm>
</template>

