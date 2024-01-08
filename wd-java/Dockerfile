FROM eclipse-temurin:8u392-b08-jdk-jammy as runner

# Install curl
RUN apt-get update && apt-get install -y curl
# Install runme
RUN curl -sSL https://download.stateful.com/runme/2.0.6/runme_linux_x86_64.tar.gz  | tar -xz -C /usr/local/bin runme

FROM runner
RUN mkdir -p /workspace
WORKDIR /workspace
COPY . .

RUN --mount=type=secret,id=dotenv,target=/workspace/src/test/resources/.env runme run mvn-run-test
RUN --mount=type=secret,id=dotenv,target=/workspace/src/test/resources/.env runme run mvn-run-test-modified
