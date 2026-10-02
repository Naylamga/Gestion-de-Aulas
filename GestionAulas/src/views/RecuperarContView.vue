<script setup>
import { ref } from 'vue'
import { supabase } from '@/supabase'

const correo = ref('')
const cargando = ref(false)
const enviado = ref(false)
const error = ref('')

async function enviarEnlace() {
  error.value = ''
  cargando.value = true

  try {
    const { error: err } = await supabase.auth.resetPasswordForEmail(correo.value, {
      redirectTo: `${window.location.origin}/restablecer-contrasena`
    })

    if (err) {
      error.value = err.message
    }
  } catch (e) {
    error.value = 'Ha ocurrido un error al enviar el enlace.'
  } finally {
    cargando.value = false
    enviado.value = true
  }
}
</script>

<template>
  <div class="login-container">
    <form class="login-form" @submit.prevent="enviarEnlace">
      <h2>Recuperar contraseña</h2>
      <p class="texto-info">
        Introduce tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.
      </p>

      <div class="form-group">
        <label for="email">Correo electrónico</label>
        <input
          id="email"
          v-model="correo"
          type="email"
          placeholder="correo@ejemplo.com"
          required
          autocomplete="email"
        />
      </div>

      <button type="submit" :disabled="cargando">
        {{ cargando ? 'Enviando...' : 'Enviar enlace de recuperación' }}
      </button>

      <p v-if="enviado" class="mensaje-exito">
        Si ese correo electrónico existe, hemos enviado un enlace para restablecer tu contraseña.
      </p>

      <p v-if="error" class="error-message">{{ error }}</p>

      <div class="enlaces">
        <router-link to="/login">Volver al inicio de sesión</router-link>
      </div>
    </form>
  </div>
</template>
