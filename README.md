# Cooperativa de Gestión de Aulas
Evaluación de Proyectos - 7°2 
Gomez Nayla - Ortiz Morena

Sistema de Gestión de Espacios Escolares

> **Gestión de Aulas** es una plataforma web y móvil desarrollada bajo el modelo de **cooperativa escolar tecnológica**. Su objetivo principal es optimizar la organización, disponibilidad y estado de los espacios físicos de la institución en tiempo real.

## ¿Qué problema resuelve?
En instituciones con alta circulación de estudiantes y docentes, la coordinación de aulas y espacios de uso común genera demoras, desorganización y pérdidas de tiempo. **Gestión de Aulas* centraliza la información espacial en una sola pantalla para responder a las necesidades de toda la comunidad educativa:

- **Equipo Directivo y Preceptores:** Visualización inmediata de la ubicación de cada curso, grupo y docente en cada módulo horario.
- **Docentes:** Gestión y reserva anticipada de aulas-taller, laboratorios o salas específicas evitando superposiciones.
- **Personal de Auxiliares / Maestranza:** Indicador en tiempo real de aulas liberadas para coordinar las tareas de limpieza y mantenimiento de forma eficiente.

## Entorno de desarrollo recomendado

[VS Code](https://code.visualstudio.com/) + [Vue (Oficial)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (y desactiva Vetur).

## Navegadores recomendados

- Navegadores basados en Chromium (Chrome, Edge, Brave, etc.):
  - [Vue.js DevTools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
  - [Activar el formateador personalizado de objetos en Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js DevTools](https://addons.mozilla.org/es/firefox/addon/vue-js-devtools/)
  - [Activar el formateador personalizado de objetos en Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Personalizar la configuración

Consulta la [referencia de configuración de Vite](https://vite.dev/config/).

## Configuración del proyecto

```sh
npm install
```

## Compilar y recargar

```sh
npm run dev
```

## Compilar y minimizar

```sh
npm run build
```

## Comprobar con ESLint

```sh
npm run lint
```

## Configuración de Supabase

Este proyecto utiliza [Supabase](https://supabase.com/) para la autenticación y la gestión de la base de datos.

### 1. Crear un proyecto en Supabase

1. Ve a [app.supabase.com](https://app.supabase.com/).
2. Crea un nuevo proyecto.
3. Copia la `URL` del proyecto y la `Anon Key` (clave pública) desde `Settings > API`.

### 2. Configurar las variables de entorno

Crea un archivo `.env` en la raíz del proyecto (este archivo ya está ignorado por Git) y añade lo siguiente: 

```env
VITE_SUPABASE_URL=TU_SUPABASE_URL
VITE_SUPABASE_ANON_KEY=TU_SUPABASE_ANON_KEY
```
Reemplaza `TU_SUPABASE_URL` y `TU_SUPABASE_ANON_KEY` con los valores que copiaste anteriormente.

### 3. Cliente de Supabase

El cliente ya se encuentra configurado en `src/supabase.js` de la siguiente manera:

```js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

### 4. Configurar la autenticación

#### URLs de redirección

Para que el restablecimiento de contraseña funcione correctamente, debes añadir las URLs de redirección en Supabase.

1. Ve a `Authentication > URL Configuration`.
2. Añade las siguientes URLs:

| Entorno | URL |
| --- | --- |
| Desarrollo | `http://localhost:5173/restablecer-contrasena` |
| Producción | `https://tu-dominio.com/restablecer-contrasena` |

### 5. Base de datos y políticas (Recomendaciones)

Si vas a utilizar tablas en Supabase, ten en cuenta lo siguiente:

- Activa la protección con Row Level Security (RLS) para todas las tablas sensibles.
- Crea políticas específicas para usuarios autenticados (ej. solo pueden ver o modificar sus propios datos).
- No expongas claves privadas. Utiliza siempre la `Anon Key` en el cliente y funciones Edge para acciones privilegiadas.
