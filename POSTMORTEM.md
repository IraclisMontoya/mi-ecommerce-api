# Postmortem — Café Origen (mi-ecommerce / mi-ecommerce-api)

## Resumen del proyecto

Café Origen es una tienda en línea de café completa: catálogo de productos, autenticación de usuarios con JWT, carrito persistente, checkout con dirección de envío y método de pago (simulado), y despliegue real en producción (Render + MongoDB Atlas). El proyecto se construyó en tres etapas: frontend con datos locales, backend con Node/Express/MongoDB, e integración fullstack completa con testing, entornos separados y despliegue.

## Qué funcionó bien

- Separar el proyecto en frontend (`mi-ecommerce`) y backend (`mi-ecommerce-api`) desde el inicio facilitó probar cada parte de forma aislada (Postman para el backend, la UI para el frontend) antes de conectarlos.
- Escribir pruebas con Vitest para la lógica de precios (`calculateOrderTotals`) sirvió como red de seguridad real: ese mismo cálculo tuvo un bug más adelante y las pruebas ayudaron a confirmar que la lógica pura estaba bien, aislando el problema al estado de React.
- Definir el modelo de datos (User, Category, Product, Cart, Order) antes de escribir rutas evitó tener que rediseñar la base de datos a medio camino.

## Incidentes y qué aprendí de cada uno

**1. `product.id` vs `product._id`.** Al conectar el frontend a datos reales de MongoDB, todos los links, keys de React y precios se rompieron silenciosamente porque el código asumía `id` (como en los datos locales de prueba) y MongoDB usa `_id`. Lección: cuando cambias de fuente de datos, hay que revisar los nombres de campo en *todos* los lugares que los consumen, no asumir que son iguales.

**2. Precios en `NaN` y botones del carrito que no respondían.** El backend devolvía el carrito sin `.populate('items.product')` en algunas rutas (agregar, quitar, actualizar cantidad), así que el frontend recibía solo el ID del producto, no sus datos. Lección: en Mongoose, `.populate()` no es "una vez y ya" — hay que aplicarlo en cada endpoint que devuelve ese documento.

**3. El bug de los "$99".** La pantalla de confirmación de orden mostraba un total incorrecto porque recalculaba el precio a partir del carrito *después* de vaciarlo. Lección: cualquier valor que deba mostrarse como una "foto fija" (un recibo) no debe depender de datos que cambian después — hay que guardar una copia (`snapshot`) antes de que el estado cambie.

**4. Instrucciones ambiguas rompieron código dos veces.** En dos ocasiones, una instrucción de "agrega esta línea junto a X" se interpretó de forma razonable pero incorrecta (código duplicado; un campo anidado donde debía ir al mismo nivel). Lección: en programación, la ubicación exacta importa tanto como el contenido — ante la duda, reemplazar el archivo completo es más seguro que editar "a ciegas".

**5. `Order validation failed: paymentMethod is required`.** Consecuencia directa del punto anterior: un campo quedó anidado dentro de `shippingAddress` en vez de ser un campo hermano en el modelo de Mongoose. Se diagnosticó rápido porque el mensaje de error de Mongoose es muy específico — leerlo completo ahorra tiempo.

**6. Variables de entorno y control de versiones.** `.env` nunca se sube a GitHub (por seguridad), lo que significa que desplegar en Render requiere copiar esas variables manualmente a la plataforma. La primera vez esto no es obvio, y olvidar una variable (o dejar `NODE_ENV=development` en producción) es un error fácil de cometer.

**7. MongoDB Atlas bloqueaba a Render.** Atlas solo aceptaba conexiones desde la IP local de desarrollo. Al desplegar el backend, las conexiones fallaban hasta abrir el acceso a `0.0.0.0/0` en la lista de IPs permitidas. Lección: una base de datos en la nube necesita saber explícitamente quién puede hablarle, y "mi computadora" y "mi servidor en producción" son direcciones distintas.

**8. Un archivo mal nombrado tumbó el sitio en local.** `useCart.js` se guardó como `use.Cart.js` por error de tipeo, y Vite falló con un error de importación. Lección: los mensajes de error de Vite/Node suelen decir *exactamente* qué archivo y qué línea fallan — vale la pena leerlos completos antes de asumir algo más complicado.

## Qué haría diferente la próxima vez

- Escribir pruebas automatizadas más temprano, no solo para la lógica de precios sino también para los endpoints del backend, hubiera detectado el bug de `.populate()` antes de probarlo manualmente en la UI.
- Confirmar el "contrato de datos" (qué campos existen y cómo se llaman) entre frontend y backend por escrito antes de conectar ambos, para evitar la clase de bugs de `id` vs `_id`.
- Configurar el manejo global de errores y los logs del backend desde el principio del proyecto, no hasta el último sprint — hubiera hecho más rápido diagnosticar varios de los bugs anteriores.

## Qué aprendí de programación en general (no solo de este proyecto)

Que la mayoría de los bugs graves no vienen de "no saber programar", sino de suposiciones silenciosas: nombres de campo que cambian, datos que ya no están donde se esperaba, o instrucciones que se pueden leer de más de una forma. Aprender a leer un mensaje de error completo, y a verificar el dato real en vez de asumir su forma, fue la habilidad más útil de todo el proyecto.

