# syntax=docker/dockerfile:1

FROM eclipse-temurin:8u432-b06-jdk-jammy AS runner

# Install curl
RUN apt-get update && apt-get install -y curl
# Install runme
RUN curl -sSL https://download.stateful.com/runme/3.9.2/runme_linux_x86_64.tar.gz  | tar -xz -C /usr/local/bin runme

FROM runner
RUN mkdir -p /workspace
WORKDIR /workspace
COPY . .

ARG APP_FILEID

RUN --mount=type=secret,id=SAUCE_USERNAME,env=SAUCE_USERNAME \
    --mount=type=secret,id=SAUCE_ACCESS_KEY,env=SAUCE_ACCESS_KEY \
    runme run mvn-run-ios-test

RUN --mount=type=secret,id=SAUCE_USERNAME,env=SAUCE_USERNAME \
    --mount=type=secret,id=SAUCE_ACCESS_KEY,env=SAUCE_ACCESS_KEY \
    runme run mvn-run-ios-test-modified