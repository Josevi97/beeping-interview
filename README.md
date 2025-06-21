# INDEX

1. Introducción
2. Objetivos
3. Resolución
4. Puntos de mejora

## 1. Introducción

Prueba técnica para la empresa Beeping

La prueba consiste en hacer una petición a un servidor y mostrar los datos en una tabla virtualizada de shadcn/ui y con scroll infinito,
con los paquetes TanStack/Table, TankStack/Virtual y shadcn/ui

## 2. Objectivos

- Utilizar TanStack/Table
- Utilizar TanStack/Virtual
- Implementar scroll infinito
- Utilizar shadcn/ui

## 3. Resolución

1. Cree el proyecto y cree una tabla básica con datos mockeados
2. Instalé TanStack/Table y monté la tabla con el paquete
3. Metí TanStack/Virtual y virtualicé los datos
4. Instalé ReactQuery para hacer peticiones de scroll infinito
5. Refactoricé los components básicos en components de UI
6. Refactoricé la tabla en un componente InfiniteTable
7. Cambié los objetos que devolvían mis componentes de ui para que devolviese componentes de shadcn/ui
8. Utilicé tailwind para estilizar los componentes
9. Solucioné bugs causados por la virtualización
10. Implementé el sistema de sorting
11. Añadí documentación necesaria y el README

## 4. Puntos de mejora

- La tabla no ha quedado muy estilizada porque no eran requisitos de evaluación
- Los datos se quedan pegados a la derecha por el position: absolute que necesita la virtualización
- Hay un bug al hacer scroll hacia arriba, donde los datos no se ven porque no están cargados
- El height está hardcodeado. En este caso, habría creado un componente por encima de la tabla con un row con datos mockados.
  De esta forma podría calcular el height al cargar la página y proveerlo hacía la tabla, de forma que se montaría con un height
  dinámico. Esto haría que funcionase correctamente para el responsive, al hacer la letra más pequeña o grande, etc.
