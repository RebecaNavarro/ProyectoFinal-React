# 💸 Proyecto Final React - Subastas en línea 
## Descripción General
Este proyecto tiene como se trata de página web donde se puedan realizar subastas por tiempo a ciertos productos.

## Objetivo del proyecto
Implementar una plataforma web de subastas, facilitando este proceso y brindando la capacidad de hacerlo desde cualquier lugar.

## 🛠️ Tecnologías y Herramientas Utilizadas
### Frontend:
- React: Biblioteca principal para la construcción de interfaces de usuario.

- TypeScript: Tipado estático para mejorar la mantenibilidad y confiabilidad del código.

- Vite: Herramienta de desarrollo rápida para proyectos modernos de frontend.

- ESLint: Linter para asegurar buenas prácticas y calidad del código.

- React Hooks: Para manejo del estado y ciclo de vida de componentes.

### Desarrollo y Simulación de API:
- JSON Server: Simulación de una API RESTful para el manejo de usuarios y productos

## Páginas
La plataforma cuenta con las siguientes páginas y características:
### * Login
Esta página se encarga de la autenticación de los usuarios, donde se coloca el nombre y contraseña.
![Captura de pantalla 2025-06-30 121831](https://github.com/user-attachments/assets/be8329c0-7d00-4ad2-8247-ed5946b562b9)
### * Subastas
Esta página cuenta con todos los productos y están divididos por:
- Activos: Cuentan con su cronómetro con la duración de la subasta.
  ![image](https://github.com/user-attachments/assets/50bb6eda-137d-44e4-b4ee-b39d3e8e235f)
- Pasados: Son aquellos los cuales ya terminó su tiempo, es decir el cronómetro llegó a 0.
  ![image](https://github.com/user-attachments/assets/c67827fc-55a1-445a-bda4-a6e39a8a91cb)
- Próximos: Son aquellos que todavía no han sido subastados.
![image](https://github.com/user-attachments/assets/cf913ade-e828-4371-bb2d-643e8807f986) 
### * Gestión de Usuarios
Es una página con una tabla de todos los usuarios, con su nombre y rol, donde además se puede crear, editar y borrar usuarios.
![image](https://github.com/user-attachments/assets/b5b481a8-bfd8-4c2e-bdb0-ea0c2f7adaa1)
El crear y editar usuario tienen el siguiente formulario correspondiente:
![image](https://github.com/user-attachments/assets/42013603-fec6-4ac0-ad4b-1dea77cd5cf1)
![image](https://github.com/user-attachments/assets/f4244510-d86f-4edb-a90a-3843624f93e6)
### * Gestión de Usuarios
Es una página con una tabla de todos los productos, con su título, descripción, duración, precio y estado, donde además se puede crear, editar y borrar productos.
![image](https://github.com/user-attachments/assets/cc3b11a6-961e-4318-9d61-5444ad57d6da)
El crear y editar productos tienen el siguiente formulario correspondiente:
![image](https://github.com/user-attachments/assets/4cce54e9-0db0-4109-a57f-8e248db5efaa)
![image](https://github.com/user-attachments/assets/1c09617e-010d-4771-810e-8093449e50a6)

# Instalación
Para ejecutar el proyecto localmente se debe seguir los siguientes pasos:
## Paso 1: Clonar el repositorio de GitHub
En la terminal, navega a la carpeta en la cual deseas clonar el repositorio, por ejemplo:
```
cd proyectos-react
```
Luego clona el repositorio y navega hacia este:
```
git clone https://github.com/RebecaNavarro/ProyectoFinal-React.git
cd ProyectoFinal-React
```
## Paso 2: Instalar las dependencias
Primero debemos entrar a la subcarpeta subastas donde se encuentra el código:
```
cd subastas
```
Instala todas las dependencias usando npm:
```
npm install
```
## Paso 3: Levantar JsonServer
Instalar JsonServer
```
npm install json-server
```
Levanta el servidor usando el db.json:
```
npx json-server db.json
```
## Paso 4: Levantar el proyecto
Levantar el proyecto:
```
npm run dev
```
## Paso 5: Navegar al link correspondiente
Navega al siguiente link en tu navegador:
```
http://localhost:5173/
```
La aplicación y el servidor deben estar corriendo simultáneamente.

# Verificación
Para verificar que la aplicación está funcionando, hacemos login con las siguientes credenciales en l:

Para administrador:
- Nombre: beca
- Contraseña: 123456
  El administrador tendrá la posibilidad de ver las páginas de Subastas, donde se llevarán a cabo las subastas; y Gestión de Usuarios y Gestión de Productos.
![image](https://github.com/user-attachments/assets/551f36b7-f771-40d0-ac68-bcc6984dec0f)

Para usuario:
- Nombre: vale
- Contraseña: 123456
  Por su parte el usuario sólo podrá ver la página de Subastas.
  ![image](https://github.com/user-attachments/assets/fee73d51-7aa9-48d7-a3a5-f48d6a7d8da7)
