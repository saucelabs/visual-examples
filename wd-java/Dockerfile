FROM ubuntu:22.04 as runner

# Install curl, wget & sudo
RUN apt-get update && apt-get install -y curl wget sudo
# Install runme
RUN curl -sSL https://download.stateful.com/runme/1.2.6/runme_linux_x86_64.tar.gz  | tar -xz -C /usr/local/bin runme

FROM runner
RUN mkdir -p /workspace
WORKDIR /workspace
COPY . .

RUN runme run java-ubuntu
RUN --mount=type=secret,id=dotenv,target=/workspace/src/test/resources/.env runme run mvn-run-test
RUN --mount=type=secret,id=dotenv,target=/workspace/src/test/resources/.env runme run mvn-run-test-modified
