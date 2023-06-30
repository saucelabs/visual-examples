FROM ubuntu:22.04

# Dependencies
RUN apt-get update && apt-get install -y curl bash

ARG BUILDARCH

# Install runme
RUN curl -sSL https://download.stateful.com/runme/1.2.6/runme_linux_${BUILDARCH}.tar.gz  | tar -xz -C /usr/local/bin runme
RUN runme --version

RUN mkdir -p /workspace
WORKDIR /workspace

COPY . .

RUN runme run ls
RUN runme run nodejs-linux
RUN runme run npm-install
RUN --mount=type=secret,id=dotenv,target=/workspace/.env runme run npm-run
RUN --mount=type=secret,id=dotenv,target=/workspace/.env runme run npm-run-modified
