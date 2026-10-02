<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '@/supabase'
import { useRouter } from 'vue-router'

const router = useRouter()

const contrasena = ref('')
const confirmarContrasena = ref('')
const cargando = ref(false)
const error = ref('')

onMounted(async () => {
  // Supabase lee automáticamente los tokens del enlace (hash) al inicializarse.
  // Comprobamos que hay una sesión válida para poder actualizar la contraseña.
  const { data, error: err } = await supabase.auth.getSession()

  if (err) {
    error.value = 'El enlace no es válido o ha caducado. Solicita uno nuevo.'
    return
  }

  if (!data.session) {
    error.value = 'El enlace no es válido o ha caducado. Solicita uno nuevo.'
  }
})

async function cambiarContrasena() {
  error.value = ''

  if (contrasena.value !== confirmarContrasena.value) {
    error.value = 'Las contraseñas no coinciden.'
    return
  }

  if (contrasena.value.length < 6) {
    error.value = 'La contraseña debe tener al menos 6 caracteres.'
    return
  }

  cargando.value = true

  try {
    const { error: err } = await supabase.auth.updateUser({
      password: contrasena.value
    })

    if (err) {
      error.value = err.message
      cargando.value = false
      return
    }

    // Cerramos sesión para forzar el inicio con la nueva contraseña (más seguro)
    await supabase.auth.signOut()

    cargando.value = false
    router.push('/login')
  } catch (e) {
    error.value = 'Ha ocurrido un error al cambiar la contraseña.'
    cargando.value = false
  }
}
</script>

<template>
  <div class="login-container">
    <form class="login-form" @submit.prevent="cambiarContrasena">
      <h2>Restablecer contraseña</h2>
      <p class="texto-info">Introduce tu nueva contraseña.</p>

      <div class="form-group">
        <label for="password">Nueva contraseña</label>
        <input
          id="password"
          v-model="contrasena"
          type="password"
          placeholder="Mínimo 6 caracteres"
          required
          autocomplete="new-password"
        />
      </div>

      <div class="form-group">
        <label for="confirm-password">Confirmar nueva contraseña</label>
        <input
          id="confirm-password"
          v-model="confirmarContrasena"
          type="password"
          placeholder="Repite tu nueva contraseña"
          required
          autocomplete="new-password"
        />
      </div>

      <button type="submit" :disabled="cargando">
        {{ cargando ? 'Guardando...' : 'Cambiar contraseña' }}
      </button>

      <p v-if="error" class="error-message">{{ error }}</p>

      <div class="enlaces">
        <router-link to="/login">Volver al inicio de sesión</router-link>
      </div>
    </form>
  </div>
</template>
