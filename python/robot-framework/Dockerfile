FROM python:3.11-slim-bookworm

COPY requirements.txt requirements.txt

RUN pip install -r requirements.txt

COPY . .

RUN --mount=type=secret,id=dotenv,target=/workspace/.env env $(cat /workspace/.env | xargs) robot tests
RUN --mount=type=secret,id=dotenv,target=/workspace/.env env $(cat /workspace/.env | xargs) VISUAL_CHECK=1 robot tests
