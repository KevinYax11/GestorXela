# Grupo Gestor Quetzaltenango

[Read in English](./README.md)

Una plataforma moderna de gestión de contenido para la asociación Grupo Gestor Quetzaltenango, construida con Next.js 15 y Payload CMS.

## Acerca del proyecto

Grupo Gestor Quetzaltenango es una asociación local, permanente, autónoma y sin fines de lucro, creada con un enfoque empresarial. Está conformada por miembros representativos de la comunidad que trabajan voluntariamente para promover el desarrollo económico de la región.

Esta plataforma les permite gestionar y publicar noticias, eventos, columnas de opinión e información institucional a través de un sistema de administración de contenido en español.

## Funcionalidades

- 📰 **Gestión de Noticias** - Artículos con texto enriquecido, categorías e imágenes destacadas
- 🎉 **Sistema de Eventos** - Listado de eventos con registro y control de capacidad
- 💭 **Columnas de Opinión** - Artículos por institución con identidad visual propia
- 🏠 **Página de Inicio** - Inicio personalizable administrado desde el CMS
- 🔐 **Panel de Administración** - Interfaz en español con control de acceso por roles

## Stack Tecnológico

- **Framework**: Next.js 15 (App Router)
- **CMS**: Payload CMS 3.x
- **Base de datos**: PostgreSQL con Drizzle ORM
- **Editor de texto**: Lexical Editor
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS
- **Despliegue**: Docker + Docker Compose

## Cómo iniciar (Desarrollo)

### Opción A: Docker (Recomendado)

Todo corre dentro de contenedores — no se necesita instalar PostgreSQL ni Node localmente.

```bash
git clone <repo-url>
cd grupo-gestor-xela

# Primera vez: construir la imagen e iniciar
docker compose up --build

# Inicios posteriores
docker compose up
```

La aplicación ejecuta las migraciones automáticamente al iniciar.

- **Frontend**: http://localhost:3000  
- **Panel de administración**: http://localhost:3000/admin

Comandos útiles de Docker:
```bash
docker compose logs -f app   # Ver logs en tiempo real
docker compose down          # Detener todo
docker compose build app     # Reconstruir tras cambios de dependencias
```

---

### Opción B: Node local + BD en Docker

Recarga en caliente más rápida. Corre la app con tu Node local mientras PostgreSQL corre en Docker.

```bash
# 1. Iniciar solo la base de datos
docker compose -f docker-compose.dev.yml up -d

# 2. Copiar el archivo de entorno e instalar dependencias
cp test.env .env
pnpm install

# 3. Iniciar el servidor de desarrollo
pnpm dev
```

> **Tip:** Si el servidor de desarrollo falla o el caché de `.next` está dañado, usa `pnpm devsafe` — limpia el caché antes de iniciar.

---

### Variables de entorno

El archivo `docker-compose.yml` ya incluye valores por defecto para desarrollo local, por lo que no se necesita un `.env` para la Opción A.

Para la Opción B, las variables clave en `.env` son:

| Variable | Descripción |
|---|---|
| `DATABASE_URL` | Cadena de conexión a PostgreSQL |
| `PAYLOAD_SECRET` | Clave secreta para Payload (32+ caracteres) |
| `NEXT_PUBLIC_SERVER_URL` | URL del sitio (por defecto: `http://localhost:3000`) |

---

## Comandos principales

```bash
pnpm dev                  # Iniciar servidor de desarrollo
pnpm devsafe              # Limpiar caché .next e iniciar servidor
pnpm build                # Compilar para producción
pnpm generate:types       # Regenerar tipos TypeScript tras cambios en el esquema
pnpm generate:importmap   # Regenerar import map tras agregar componentes
pnpm payload migrate      # Ejecutar migraciones de base de datos manualmente
pnpm test                 # Ejecutar todas las pruebas (integración + e2e)
```

## Documentación

- **Plan de implementación completo**: `docs/primary_project_prompt.md`
- **Reglas de Payload**: `AGENTS.md`
- **Mockups de diseño**: `docs/mockups/`

## Licencia

MIT

---

**Hecho con ❤️ para Grupo Gestor Quetzaltenango**
