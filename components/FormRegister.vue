<script setup lang="ts">
import { ref, object, string, type InferType } from 'yup'
import type { FormSubmitEvent } from '#ui/types'

const $router = useRouter()

const schema = object({
  email: string().email('Invalid email').required('Required'),
  password: string()
    .min(8, 'Must be at least 8 characters')
    .required('Required'),
  passwordConfirmation: string()
    .required('Required')
    .min(8, 'Must be at least 8 characters')
    .oneOf([ref('password')], 'Passwords must match')
})

type Schema = InferType<typeof schema>

const state = reactive({
  email: 'sugeng@gmail.com',
  password: 'password',
  passwordConfirmation: 'password'
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  const { email, password, passwordConfirmation } = event.data

  try {
    const res = await $fetch('/api/auth/register', {
      method: 'post', body: {
        email, password, passwordConfirmation
      }
    })

    useToast().add({ title: res.message, color: 'green' })

    navigateTo('/login')
  } catch (e) {
    useToast().add({ title: 'Account Already Registered', color: 'red' })
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

    <UFormGroup label="Password Confirmation" name="passwordConfirmation">
      <UInput v-model="state.passwordConfirmation" type="password" />
    </UFormGroup>

    <UButton type="submit" block>
      Register
    </UButton>

    <UButton type="button" variant="outline" block @click="$router.push('/login')">
      Login
    </UButton>
  </UForm>
</template>
