FROM ubuntu:22.04

RUN apt-get update  \
    && apt-get install -y curl  \
    && curl -SLO https://deb.nodesource.com/nsolid_setup_deb.sh \
    && chmod 500 nsolid_setup_deb.sh \
    && ./nsolid_setup_deb.sh 18 \
    && apt-get install nodejs -y

RUN mkdir -p /workspace
WORKDIR /workspace

COPY package*.json .

RUN npm install && npx playwright install --with-deps

COPY . .

ENV PLAYWRIGHT_HTML_OPEN='never'

# The playwright test-runner will exit with a non-zero code on a failed test. This is intended, but
# a positive response is required for docker builds
RUN --mount=type=secret,id=dotenv,target=/workspace/.env env $(cat /workspace/.env | xargs) npm run sauce-visual || true
RUN --mount=type=secret,id=dotenv,target=/workspace/.env env $(cat /workspace/.env | xargs) npm run sauce-visual-check || true
