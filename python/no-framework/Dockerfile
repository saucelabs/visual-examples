FROM python:3.10-slim-bookworm

COPY requirements.txt requirements.txt

RUN pip install -r requirements.txt

COPY . .

RUN --mount=type=secret,id=dotenv,target=/workspace/.env env $(cat /workspace/.env | xargs) python test.py
RUN --mount=type=secret,id=dotenv,target=/workspace/.env env $(cat /workspace/.env | xargs) VISUAL_CHECK=1 python test.py
