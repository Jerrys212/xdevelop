# Prueba Técnica — Frontend con Next.js

Aplicación web desarrollada con Next.js 16, TypeScript y Tailwind CSS que consume APIs públicas para gestión de usuarios, posts y búsqueda de libros.

## Stack Tecnológico

- **Framework:** Next.js 16 (App Router)
- **Lenguaje:** TypeScript
- **Estilos:** Tailwind CSS + Shadcn UI
- **Estado Global:** Zustand
- **Data Fetching:** TanStack Query
- **Tablas:** TanStack Table
- **Fuente:** DM Sans

## APIs Utilizadas

- **ReqRes** — Autenticación y listado de usuarios
- **JSONPlaceholder** — Posts y comentarios
- **Open Library** — Búsqueda de libros

## Requisitos

- Node.js 18+
- npm

## Instalación

```bash
git clone <url-del-repo>
cd prueba-tecnica
npm install
```

Copia el archivo de variables de entorno:

```bash
cp .env.example .env.local
```

Rellena las variables en `.env.local`:

```bash
NEXT_PUBLIC_REQRES_URL=https://reqres.in
NEXT_PUBLIC_REQRES_API_KEY=tu_api_key
```

> Puedes obtener tu API key gratuita en [reqres.in](https://reqres.in)

Corre el proyecto:

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Credenciales de prueba

| Rol   | Email                  | Contraseña |
| ----- | ---------------------- | ---------- |
| Admin | eve.holt@reqres.in     | cityslicka |
| User  | george.bluth@reqres.in | cityslicka |

## Funcionalidades

### Autenticación

- Login con email y contraseña via ReqRes
- `accessToken` guardado en cookie accesible por JS
- `refreshToken` simulado en cookie HttpOnly
- Logout limpia cookies y estado global
- Rutas protegidas via layout server-side

### Usuarios

- Tabla con TanStack Table y paginación real
- Búsqueda por nombre y email en frontend
- Filtros de rol simulados
- Selección múltiple y borrado masivo
- Exportación a CSV

### Posts

- Lista de posts con filtro por usuario y título
- Detalle de post con comentarios
- Crear posts (solo admin)
- Editar posts (solo admin)
- Favoritos persistidos en localStorage via Zustand

### Libros

- Búsqueda de libros con Open Library
- Filtros por autor y año de publicación
- Paginación de resultados
- Detalle del libro seleccionado

## Decisiones Técnicas

### Protección de rutas

Se implementó via layout server-side en `(protected)/layout.tsx` en lugar de `proxy.ts` debido a un bug conocido de Next.js 16 con Turbopack que causaba que el archivo de proxy se quedara compilando indefinidamente.

### Roles simulados

ReqRes no devuelve roles en su respuesta de login. Los roles se asignan según el email usado:

- `eve.holt@reqres.in` → admin
- Cualquier otro email válido de ReqRes → user

### Actualizaciones optimistas

Se implementaron en la creación y edición de posts usando `onSuccess` de TanStack Query, actualizando el cache local inmediatamente después de una respuesta exitosa.

### Favoritos

Los posts favoritos se persisten en `localStorage` usando el middleware `persist` de Zustand, por lo que sobreviven recargas de página.

## Tests

```bash
npm test
```

Se incluye un test unitario para el store de autenticación (`useAuthStore`) verificando el comportamiento de `setAuth` y `clearAuth`.
