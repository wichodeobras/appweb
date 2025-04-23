# Usa una imagen base ligera con python
FROM python:3.11-slim

# Instala dependencias necesarias para LibreOffice
RUN apt-get update && apt-get install -y \
    libreoffice \
    fonts-dejavu-core \
    fonts-liberation \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de tu proyecto
COPY . .

# Instala dependencias del proyecto
RUN pip install --upgrade pip && pip install -r requirements.txt

# Expón el puerto para Render
EXPOSE 8000

# Comando para ejecutar migraciones y arrancar gunicorn
CMD ["bash", "-c", "python manage.py migrate --noinput && gunicorn mybackend.wsgi:application --bind 0.0.0.0:8000"]
