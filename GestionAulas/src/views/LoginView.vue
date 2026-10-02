<script setup> 
import { ref } from 'vue' 
import { useRouter } from 'vue-router' 
import { supabase } from '@/supabase' 
 
const router = useRouter() 
 
const correo = ref('') 
const contrasena = ref('') 
 
const cargando = ref(false) 
const mensaje = ref('') 
const inicioExitoso = ref(false) 
 
async function iniciarSesion() { 
  mensaje.value = '' 
  inicioExitoso.value = false 
 
  try { 
    cargando.value = true 
 
    const { error } = await supabase.auth.signInWithPassword({ 
      email: correo.value, 
      password: contrasena.value, 
    }) 
 
    if (error) { 
      throw error 
    } 
 
    inicioExitoso.value = true 
    mensaje.value = 'Inicio de sesión correcto.' 
 
    router.push('/inicio') 
  } catch (error) { 
    if (error.message === 'Invalid login credentials') { 
      mensaje.value = 'El correo o la contraseña son incorrectos.' 
    } else if (error.message === 'Email not confirmed') { 
      mensaje.value = 'Primero tenés que confirmar tu correo electrónico.' 
    } else { 
      mensaje.value = error.message 
    } 
  } finally { 
    cargando.value = false 
  } 
} 
</script>

<template> 
  <main class="pagina-login"> 
    <section class="tarjeta-login"> 
      <h1>Iniciar sesión</h1> 
 
      <p class="descripcion"> 
        Ingresá con tu correo electrónico y contraseña. 
      </p> 
 
      <form @submit.prevent="iniciarSesion"> 
        <div class="campo"> 
          <label for="correo">Correo electrónico</label> 
 
          <input 
            id="correo" 
            v-model="correo" 
            type="email" 
            placeholder="nombre@correo.com" 
            autocomplete="email" 
            required 
          /> 
        </div> 
 
        <div class="campo"> 
          <label for="contrasena">Contraseña</label> 
 
          <input 
            id="contrasena" 
            v-model="contrasena" 
            type="password" 
            placeholder="Ingresá tu contraseña" 
            autocomplete="current-password" 
            required 
          /> 
          <router-link to="/recuperar-contrasena">¿Has olvidado tu contraseña?</router-link>
        </div> 
 

        <button type="submit" :disabled="cargando"> 
          {{ cargando ? 'Ingresando...' : 'Ingresar' }} 
        </button> 
      </form> 
 
      <p 
        v-if="mensaje" 
        class="mensaje" 
        :class="{ exito: inicioExitoso, error: !inicioExitoso }" 
      > 
        {{ mensaje }} 
      </p> 
 
      <p class="enlace-registro"> 
        ¿Todavía no tenés una cuenta? 
 
        <RouterLink to="/registro"> 
          Registrate 
        </RouterLink> 
      </p> 
    </section> 
  </main> 
</template>
