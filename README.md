# Gestor de gastos personales

Trabajo Práctico de Programación Móvil — Opción 1.
Aplicación móvil desarrollada con **React Native + Expo** que permite registrar y consultar gastos personales.

## Funcionalidades

- Agregar un gasto (descripción, monto y categoría) con validación de datos.
- Mostrar los gastos en una lista (descripción, monto y categoría).
- Calcular y mostrar el total gastado (se actualiza al agregar o eliminar).
- Eliminar un gasto de la lista.
- Categorías: Alimentación, Transporte, Entretenimiento, Salud y Otros.

### Funcionalidades opcionales incluidas

- Total gastado por categoría.
- Filtro de gastos por categoría.
- Gasto más alto.
- Cantidad total de gastos.

## Tecnologías y conceptos aplicados

- React Native y Expo.
- `useState`, `TextInput`, `Button`, `Pressable`.
- `map()`, `filter()` y `reduce()` para listas, filtros y cálculos.
- Condicionales, eventos, funciones, arrays y objetos.
- Datos manejados localmente (sin base de datos, backend ni API externa).

## Estructura del proyecto

```
App.js
src/
├── models/
│   └── Gasto.js               # Clase Gasto, categorías y formato de montos
├── repositories/
│   └── GastosRepository.js    # Almacena los gastos en un array en memoria
├── controllers/
│   └── GastosController.js    # Validaciones y cálculos (total, filtros, etc.)
├── components/
│   ├── FormularioGasto.js     # Formulario para agregar gastos
│   ├── ListaGastos.js         # Lista de gastos
│   └── TarjetaGasto.js        # Un gasto individual con botón eliminar
└── screens/
    └── GastosScreen.js        # Pantalla principal
```

## Cómo ejecutar

   ```bash
npx expo install @react-native-async-storage/async-storage   
   ```

1. Instalar dependencias:
   ```bash
   npm install
   
   ```
```bash
npx expo install expo@^58.0.0
   
   ```

```bash
npx expo install expo@^58.0.0 --fix

```
2. Iniciar el servidor de desarrollo:
   ```bash
   npx expo start
   ```
3. Escanear el código QR con la app **Expo Go** (Android/iOS) o abrirlo en un emulador.


## Uso

1. Completá la descripción y el monto, elegí una categoría y presioná **Agregar gasto**.
2. Consultá el total, la cantidad de gastos, el gasto más alto y el resumen por categoría en la parte superior.
3. Usá los filtros de categoría para ver solo los gastos que te interesen.
4. Presioná **Eliminar** en un gasto para quitarlo; el total se actualiza solo.

La aplicación arranca con tres gastos de ejemplo (Supermercado, Nafta y Café).

## Integrantes

- _Completar con los nombres del grupo_
