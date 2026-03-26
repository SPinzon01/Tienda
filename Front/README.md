# React + Vite:

node -v

npm install

npm run dev

## Estructura carpetas:

├── Diagrama ER/           # Contiene los archivos relacionados con el modelo de datos.
├── node_modules/          # Dependencias y librerías del proyecto.
├── public/                # Archivos estáticos (imágenes, favicons, etc.).
├── src/                   # Directorio principal del código fuente.
│   ├── assets/            # Archivos estáticos específicos de la aplicación.
│   ├── components/        # Componentes de React reutilizables.
│   │   ├── DeviceCard.jsx
│   │   └── DeviceList.jsx
│   ├── data/              # Datos de la aplicación en formato JSON.
│   │   └── devices.json
│   ├── modules/           # Vistas principales de la aplicación.
│   │   ├── AdminPanel.jsx
│   │   └── Home.jsx
│   ├── App.jsx            # Componente raíz de la aplicación.
│   └── main.jsx           # Punto de entrada de la aplicación.
├── .gitignore             # Archivos y carpetas a ignorar por Git.
├── .eslintrc.cjs          # Configuración de ESLint para el análisis de código.
├── index.html             # Archivo HTML principal.
├── package.json           # Información del proyecto, dependencias y scripts.
├── package-lock.json      # Versiones exactas de las dependencias.
├── README.md              # Documentación del proyecto.
└── vite.config.js         # Configuración de Vite.