FROM ubuntu:22.04 as amd64

RUN apt-get update && apt-get install -y curl dotnet6

# Install runme
RUN curl -sSL https://download.stateful.com/runme/1.2.6/runme_linux_x86_64.tar.gz  | tar -xz -C /usr/local/bin runme
RUN runme --version

FROM ubuntu:22.04 as arm64

RUN apt-get update && apt-get install -y curl dotnet6

# Install runme
RUN curl -sSL https://download.stateful.com/runme/1.2.6/runme_linux_arm64.tar.gz  | tar -xz -C /usr/local/bin runme
RUN runme --version

FROM ${TARGETARCH}

RUN mkdir -p /workspace
WORKDIR /workspace

COPY . .

RUN runme run dotnet-install
RUN --mount=type=secret,id=dotenv,target=/workspace/.env env $(cat /workspace/.env | xargs) runme run dotnet-test
RUN --mount=type=secret,id=dotenv,target=/workspace/.env env $(cat /workspace/.env | xargs) runme run npm-run-modified
