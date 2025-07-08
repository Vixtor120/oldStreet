# 🎮 OldStreet - Servidor de Rolplay

![OldStreet Logo](/public/images/logo.png)

OldStreet es una plataforma web moderna para una comunidad de gaming, desarrollada con tecnologías de última generación. El proyecto proporciona una interfaz intuitiva y atractiva para que los usuarios puedan acceder a información sobre la comunidad, normativas, y proceso de whitelist.

## ✨ Características Principales

- **Diseño Responsivo**: Interfaz adaptable para dispositivos móviles y escritorio
- **Navegación Fluida**: Animaciones suaves usando Framer Motion
- **Modo Oscuro**: Diseño optimizado para modo oscuro con acentos en amarillo
- **Integración con Discord**: Acceso directo a la comunidad de Discord
- **Gestión de Whitelist**: Sistema de solicitud para unirse a la comunidad
- **📧 Sistema de Correos**: Envío automático de formularios de whitelist por correo electrónico
- **🚀 Deploy Ready**: Configurado para hosting en Hostinger con PHP

## 🚀 Tecnologías Utilizadas

- **Frontend:**
  - [React 18](https://reactjs.org/) - Biblioteca de UI con hooks y componentes funcionales
  - [TypeScript](https://www.typescriptlang.org/) - Tipado estático para desarrollo robusto
  - [Tailwind CSS](https://tailwindcss.com/) - Framework CSS utilitario
  - [Framer Motion](https://www.framer.com/motion/) - Biblioteca de animaciones
  - [Vite](https://vitejs.dev/) - Build tool y servidor de desarrollo

- **Backend:**
  - [PHP](https://www.php.net/) - Manejo de envío de correos
  - Función `mail()` nativa de PHP para envío de correos
  - Headers CORS para integración frontend-backend

## �📋 Requisitos Previos

- Node.js (versión 16.0 o superior)
- npm o yarn
- Git

## 🛠️ Instalación y Configuración

1. **Clonar el repositorio:**
   ```bash
   git clone <url-del-repositorio>
   cd OldStreet_New
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno:**
   - Copia el archivo `.env.example` a `.env`
   - Ajusta las variables según tu entorno

4. **Iniciar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```

## � Scripts Disponibles

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

## 🎨 Características de UI/UX

- **Navbar Responsive:**
  - Menú hamburguesa para móviles
  - Animaciones suaves en transiciones
  - Indicador de página actual
  - Integración con Discord

- **Diseño Moderno:**
  - Paleta de colores oscura con acentos en amarillo
  - Tipografía clara y legible
  - Animaciones sutiles para mejor feedback
  - Diseño centrado en la experiencia de usuario

## 🚀 Despliegue en Hostinger

### Compilación automática
Ejecuta el script de compilación según tu sistema operativo:

**Windows:**
```bash
build_for_hostinger.bat
```

**Linux/Mac:**
```bash
./build_for_hostinger.sh
```

### Despliegue manual
1. **Compilar el proyecto:**
   ```bash
   npm run build
   ```

2. **Preparar archivos:**
   - Copia todo el contenido de `dist/` a tu directorio `public_html/` en Hostinger
   - Asegúrate de subir también:
     - `send_whitelist.php` (manejo de correos)
     - `.htaccess` (configuración del servidor)

3. **Configurar correo:**
   - Verifica que el correo `oldstreetnew@oldstreetcm.com` esté configurado en tu panel de Hostinger
   - Prueba el envío accediendo a `tu-dominio.com/test_email.php`

### 📧 Sistema de Correos
El formulario de whitelist envía automáticamente los datos a `oldstreetnew@oldstreetcm.com` con:
- ✅ Formato HTML profesional y organizado
- ✅ Todas las respuestas del formulario estructuradas
- ✅ Información del personaje y fecha de envío
- ✅ Diseño responsive para lectura en cualquier dispositivo

Para más detalles, consulta: [CORREO_SETUP.md](./CORREO_SETUP.md)

## 🤝 Contribución

1. Fork el proyecto
2. Crea tu rama de feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add: alguna característica amazing'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 🌟 Agradecimientos

- A la comunidad de OldStreet por su apoyo
- A todos los contribuidores que hacen este proyecto posible

---

<div align="center">
Desarrollado con ❤️ para la comunidad OldStreet
</div>
