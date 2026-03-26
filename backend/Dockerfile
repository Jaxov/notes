FROM python:3.13-slim

# Рабочая директория внутри контейнера
WORKDIR /app

# Копируем requirements.txt
COPY requirements.txt .

# Устанавливаем зависимости
RUN pip install --no-cache-dir -r requirements.txt

# Копируем весь код backend внутрь контейнера
COPY . .

# Чтобы импорты работали без "backend."
ENV PYTHONPATH=/app/

# Запускаем Uvicorn
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
