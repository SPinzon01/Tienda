# 📱 Proyecto App Móvil Híbrida - AA2
> **Tienda Electrónica Inteligente** | Ionic React + Capacitor + Node.js

Este proyecto consiste en una aplicación móvil híbrida desarrollada con **Ionic React**, **Capacitor** y un backend en **Node.js/Express** con **SQLite**. Cumple con los requisitos de autenticación, servicios API, carrito de compras y almacenamiento local persistente en dispositivos **Android** y **Web**.

---

## 🏗️ Arquitectura del Sistema

El sistema se divide en dos grandes componentes:

1.  **`/Back`**: Servidor API RESTful construido con **Node.js** y **Express**. Utiliza **Sequelize** como ORM para gestionar una base de datos **SQLite**.
2.  **`/Front`**: Aplicación móvil híbrida construida con **Ionic React** y **Capacitor**. Utiliza **@ionic/storage** para persistencia local y la **API nativa de Cámara**.

---

## 🛠️ Tecnologías Core

| Área | Tecnologías |
| :--- | :--- |
| **Frontend** | Ionic 8, React 19, Vite, React Router v7, Axios |
| **Mobile** | Capacitor 8, Native Camera Plugin, CapacitorHttp |
| **Backend** | Node.js, Express, Sequelize, SQLite3, Bcrypt |
| **Seguridad** | CORS persistente, Encriptación de contraseñas, Network Security Policy |

---

## 🚀 Guía de Instalación y Ejecución

Sigue estos pasos en orden para asegurar que el proyecto funcione en tu máquina o en la de tus compañeros.

### 1. Servidor Backend
```powershell
cd Back
npm install
# (Opcional) Limpiar y crear 10 productos de prueba:
node seed.js
# Iniciar servidor
node index.js
```
*El servidor corre en el puerto **4000**.*

### 2. Frontend (Web)
```powershell
cd Front
# IMPORTANTE: Usar esta bandera por compatibilidad de React 19
npm install --legacy-peer-deps
# Iniciar modo desarrollo
npm run dev
```

### 3. Despliegue en Android (Emulador)
Para ver la app en Android Studio:
```powershell
cd Front
npm run build
npx cap sync android
# Abrir en Android Studio
npx cap open android
```
> [!IMPORTANT]
> **Configuración de Red**: La app detecta automáticamente si estás en Android y se conecta a la IP `10.0.2.2:4000` (el localhost del PC visto desde el emulador). No necesitas cambiar nada.

---

## 📸 Funcionalidades Destacadas

*   **🔒 Autenticación Local**: Sistema de registro y login con persistencia automática de sesión.
*   **🛒 Carrito de Compras Persistente**: Los productos no se borran aunque cierres la app o recargues la página.
*   **📷 Captura de Fotos Real**: En el Panel de Administración puedes usar la cámara de tu celular para subir fotos de productos.
*   **⚡ Conectividad Nativa**: Uso de `CapacitorHttp` para saltar restricciones de CORS en dispositivos móviles.

---

## 📋 Solución de Problemas Comunes

*   **Error `ERESOLVE` al instalar**: Asegúrate de usar siempre `npm install --legacy-peer-deps`.
*   **Error de AGP versión (8.13 vs 8.12)**: El proyecto ya está forzado a usar **8.12.0** en `build.gradle` para máxima compatibilidad con Android Studio.
*   **La app no conecta al backend**: Revisa que tu servidor Node esté escuchando. En el emulador de Android debe verse el log: `[Hora] GET /api/...` gracias al logger que integramos.

---

## 👨‍💻 Autores
- **Sergio Pinzón** - Líder de Desarrollo y Arquitectura.
- **Equipo de Trabajo AA2** - Universidad Tecnológica.
