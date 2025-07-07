# OldStreet React Project

Este es un proyecto de React creado con Vite, que proporciona una configuración moderna y rápida para el desarrollo de aplicaciones React con TypeScript y Tailwind CSS.

## 🚀 Características

- **React 18**: Última versión de React con hooks y componentes funcionales
- **TypeScript**: Tipado estático para mejor desarrollo y mantenimiento
- **Tailwind CSS**: Framework CSS utilitario para estilos rápidos y consistentes
- **Vite**: Herramienta de construcción rápida y servidor de desarrollo
- **ESLint**: Linting de código para mantener calidad y consistencia
- **Hot Module Replacement (HMR)**: Recarga instantánea durante el desarrollo

## 📋 Requisitos Previos

- Node.js (versión 16.0 o superior)
- npm o yarn

## 🛠️ Instalación

1. Clona el repositorio o descarga los archivos
2. Instala las dependencias:
   ```bash
   npm install
   ```

## 🚀 Scripts Disponibles

- `npm run dev`: Inicia el servidor de desarrollo
- `npm run build`: Construye la aplicación para producción
- `npm run preview`: Previsualiza la construcción de producción
- `npm run lint`: Ejecuta ESLint para revisar el código

## 💻 Desarrollo

Para iniciar el servidor de desarrollo:

```bash
npm run dev
```

La aplicación se abrirá en [http://localhost:5173](http://localhost:5173) por defecto.

> **Nota**: Si el puerto 5173 está ocupado, Vite automáticamente usará el siguiente puerto disponible.

## 🏗️ Estructura del Proyecto

```
OldStreet_New/
├── public/                 # Archivos públicos estáticos
├── src/
│   ├── components/        # Componentes reutilizables
│   ├── pages/            # Páginas de la aplicación
│   │   └── Home.tsx      # Página principal
│   ├── assets/           # Recursos estáticos
│   ├── App.tsx           # Componente principal
│   ├── main.tsx          # Punto de entrada
│   └── index.css         # Estilos globales + Tailwind
├── .github/
│   └── copilot-instructions.md  # Instrucciones para Copilot
├── .vscode/
│   └── tasks.json        # Tareas de VS Code
├── tailwind.config.js    # Configuración de Tailwind
├── tsconfig.json         # Configuración de TypeScript
├── vite.config.js        # Configuración de Vite
└── package.json          # Dependencias del proyecto
```

## 📝 Guías de Desarrollo

- Usa componentes funcionales con hooks y TypeScript
- Mantén los componentes pequeños y enfocados
- Usa nombres descriptivos para variables y funciones
- Aprovecha las utilidades de Tailwind CSS para estilos rápidos
- Sigue las mejores prácticas de React y TypeScript

## 🔧 Tecnologías Utilizadas

- [React](https://reactjs.org/) - Biblioteca de JavaScript para construir interfaces de usuario
- [TypeScript](https://www.typescriptlang.org/) - Superset de JavaScript con tipado estático
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS utilitario
- [Vite](https://vitejs.dev/) - Herramienta de construcción rápida
- [ESLint](https://eslint.org/) - Herramienta de linting para JavaScript/TypeScript
