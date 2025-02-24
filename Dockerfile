FROM python:3.9-slim

WORKDIR /app
COPY app/ /app/
COPY config.json /app/

RUN pip install -r /app/requirements.txt

CMD ["python", "/app/parse_fixed_width.py"]
