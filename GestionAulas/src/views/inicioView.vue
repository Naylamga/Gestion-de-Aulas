<script setup> 
import { onMounted, ref } from 'vue' 
import { useRouter } from 'vue-router' 
import { supabase } from '@/supabase' 
 
const router = useRouter() 
 
const correoUsuario = ref('') 
const cerrandoSesion = ref(false) 
 
onMounted(async () => { 
  const { 
    data: { user }, 
  } = await supabase.auth.getUser() 
 
  if (user) { 
    correoUsuario.value = user.email 
  } 
}) 
 
async function cerrarSesion() { 
  try { 
    cerrandoSesion.value = true 
 
    const { error } = await supabase.auth.signOut() 
 
    if (error) { 
      throw error 
    } 
 
    router.push('/login') 
  } catch (error) { 
    alert(error.message) 
  } finally { 
    cerrandoSesion.value = false 
  } 
} 
</script>

<template> 
  <main class="pagina-inicio"> 
    <section class="tarjeta-inicio"> 
      <div class="icono">✓</div> 
 
      <h1>¡Bienvenido!</h1> 
 
      <p>Iniciaste sesión correctamente.</p> 
 
      <div class="datos-usuario"> 
        <span>Usuario autenticado</span> 
        <strong>{{ correoUsuario }}</strong> 
      </div> 
 
      <button 
        type="button" 
:disabled="cerrandoSesion" 
@click="cerrarSesion" 
> 
{{ cerrandoSesion ? 'Cerrando...' : 'Cerrar sesión' }} 
</button> 
</section> 
</main> 
</template> 