FROM eclipse-temurin:11-jdk-alpine as runner

# Install curl
RUN apk add --no-cache curl
# Install runme
RUN curl -sSL https://download.stateful.com/runme/1.2.6/runme_linux_x86_64.tar.gz  | tar -xz -C /usr/local/bin runme

FROM runner
RUN mkdir -p /workspace
WORKDIR /workspace
COPY . .

RUN ls

RUN --mount=type=secret,id=dotenv,target=/workspace/.env runme run run-test
RUN --mount=type=secret,id=dotenv,target=/workspace/.env runme run run-test-modified
