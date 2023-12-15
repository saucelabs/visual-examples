FROM eclipse-temurin:8-jdk-alpine as runner

# Install curl
RUN apk add --no-cache curl
# Install runme
RUN curl -sSL https://download.stateful.com/runme/2.0.6/runme_darwin_x86_64.tar.gz  | tar -xz -C /usr/local/bin runme

FROM runner
RUN mkdir -p /workspace
WORKDIR /workspace
COPY . .

RUN --mount=type=secret,id=dotenv,target=/workspace/src/test/resources/.env runme run mvn-run-test
RUN --mount=type=secret,id=dotenv,target=/workspace/src/test/resources/.env runme run mvn-run-test-modified
