FROM node:22-alpine as build

# establecer el directorio de trabajo
WORKDIR /usr/src/app

# copiar los archivos necesarios de node
COPY package*.json ./

# Instalar dependencias que se necesitan 
RUN npm install

# Copiar el resto del codigo
COPY . .
## --------------------------------------------
RUN npm run build

# Configuracion Nginx para producción
FROM nginx:alpine

COPY --from=build /usr/src/app/dist /usr/share/nginx/html

# Exponer el puerto 
EXPOSE 80

# Comando para correr la aplicación
# CMD [ "npm", "run", "start" ]