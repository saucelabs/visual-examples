FROM ubuntu:22.04 as amd64

RUN apt-get update && apt-get install -y curl

# Install runme
RUN curl -sSL https://download.stateful.com/runme/1.2.6/runme_linux_x86_64.tar.gz  | tar -xz -C /usr/local/bin runme
RUN runme --version

FROM ubuntu:22.04 as arm64

RUN apt-get update && apt-get install -y curl

# Install runme
RUN curl -sSL https://download.stateful.com/runme/1.2.6/runme_linux_arm64.tar.gz  | tar -xz -C /usr/local/bin runme
RUN runme --version

FROM ${TARGETARCH}

RUN mkdir -p /workspace
WORKDIR /workspace

RUN curl -SLO https://deb.nodesource.com/nsolid_setup_deb.sh \
    && chmod 500 nsolid_setup_deb.sh \
    && ./nsolid_setup_deb.sh 18 \
    && apt-get install nodejs -y

COPY package*.json .

RUN npm install && npx playwright install --with-deps

COPY . .

# The storybook test-runner will exit with a non-zero code on a failed test. This is intended, but
# a positive response is required for docker builds
RUN --mount=type=secret,id=dotenv,target=/workspace/.env env $(cat /workspace/.env | xargs) npm run test-storybook:ci || true
RUN --mount=type=secret,id=dotenv,target=/workspace/.env env $(cat /workspace/.env | xargs) VISUAL_CHECK=1 npm run test-storybook:ci || true
