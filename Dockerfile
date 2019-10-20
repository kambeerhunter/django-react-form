FROM python:3.6

ENV PIP_CACHE_DIR=/app/pip-cache

COPY ./ /app/src/
WORKDIR /app/src/

RUN pip install -r requirements.pip