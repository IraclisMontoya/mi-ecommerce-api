# Café Origen — API

Backend REST para la tienda en línea Café Origen. Node.js, Express y MongoDB.

**API en vivo:** https://mi-ecommerce-api-gevd.onrender.com
**Frontend:** https://github.com/IraclisMontoya/mi-ecommerce

## Funcionalidades

- Autenticación con JWT (registro, login, rutas protegidas)
- CRUD de productos y categorías
- Carrito de compras persistente por usuario
- Creación de órdenes con dirección de envío y método de pago
- Arquitectura por capas: rutas, controladores, modelos, middlewares
- Manejo global de errores y logging de peticiones
- Variables de entorno separadas por ambiente (desarrollo / producción)

## Stack técnico

Node.js, Express, MongoDB + Mongoose, JSON Web Tokens (jsonwebtoken), bcrypt para contraseñas, CORS configurado por variable de entorno.

## Cómo correrlo localmente

```
npm install
npm run dev
```

Requiere un archivo `.env` con: `MONGODB_URI`, `JWT_SECRET`, `CORS_ORIGIN`, `NODE_ENV`.

## Endpoints principales

```
POST   /api/auth/register
POST   /api/auth/login
GET    /api/products
GET    /api/products/:id
GET    /api/categories
GET    /api/cart
POST   /api/cart
PATCH  /api/cart/:productId
DELETE /api/cart/:productId
POST   /api/orders
```

## Documentación relacionada

Ver [POSTMORTEM.md](./POSTMORTEM.md) para una reflexión sobre los retos técnicos del proyecto y las lecciones aprendidas durante el desarrollo.
