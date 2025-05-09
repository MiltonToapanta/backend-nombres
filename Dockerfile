FROM node:18-slim

# Actualizar e instalar dependencias necesarias para reducir vulnerabilidades
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar los archivos package.json y package-lock.json (si existe) y luego instalar dependencias
COPY package*.json ./
RUN npm install --production

# Copiar el resto de los archivos del proyecto
COPY . .

# Exponer el puerto que va a escuchar el servidor
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["node", "index.js"]
