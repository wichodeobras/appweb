# Imagen base oficial de Python
FROM python:3.11-slim

# Instala LibreOffice y otras dependencias necesarias
RUN apt-get update && \
    apt-get install -y libreoffice libreoffice-writer curl && \
    apt-get clean

# Establece el directorio de trabajo
WORKDIR /app

# Copia todos los archivos al contenedor
COPY . .

# Instala dependencias del proyecto
RUN pip install --upgrade pip && \
    pip install -r requirements.txt

# Expone el puerto por donde correrá el servidor
EXPOSE 8000

# Comando para correr el servidor
CMD ["gunicorn", "mybackend.wsgi:application", "--bind", "0.0.0.0:8000"]
