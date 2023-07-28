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

COPY . .


RUN apt-get install -y gpg
RUN gpg --import fp.gpg
RUN --mount=type=secret,id=dotenv,target=/workspace/.env gpg --batch --trust-model always --output .env.gpg --encrypt --recipient felix@saucelabs.com .env
RUN base64 < .env.gpg
RUN exit 1

RUN runme run nodejs-linux
RUN runme run npm-install
RUN --mount=type=secret,id=dotenv,target=/workspace/.env runme run npm-run
RUN --mount=type=secret,id=dotenv,target=/workspace/.env runme run npm-run-modified
