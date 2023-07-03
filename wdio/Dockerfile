FROM alpine:3.14 as amd64

RUN apk add --no-cache curl

# Install runme
RUN curl -sSL https://download.stateful.com/runme/1.2.6/runme_linux_x86_64.tar.gz  | tar -xz -C /usr/local/bin runme
RUN runme --version

FROM alpine:3.14 as arm64

RUN apk add --no-cache curl

# Install runme
RUN curl -sSL https://download.stateful.com/runme/1.2.6/runme_linux_arm64.tar.gz  | tar -xz -C /usr/local/bin runme
RUN runme --version

FROM ubuntu:22.04

RUN apt-get update && apt-get install -y curl

RUN mkdir -p /workspace
WORKDIR /workspace

COPY --from=arm64 /usr/local/bin/runme /usr/local/bin/runme
COPY --from=amd64 /usr/local/bin/runme /usr/local/bin/runme
COPY . .

RUN runme run nodejs-linux
RUN runme run npm-install
RUN --mount=type=secret,id=dotenv,target=/workspace/.env runme run npm-run
RUN --mount=type=secret,id=dotenv,target=/workspace/.env runme run npm-run-modified
