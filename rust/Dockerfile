FROM rust:1.76.0-alpine as Builder

WORKDIR /cli

COPY . .
RUN apk update && apk add pkgconfig openssl openssl-dev musl-dev
RUN rustup target add aarch64-unknown-linux-musl
RUN rustup toolchain install stable-aarch64-unknown-linux-musl
RUN cargo build --target aarch64-unknown-linux-musl --release

FROM alpine
COPY --from=Builder /cli/target/aarch64-unknown-linux-musl/release/demyst-code-kata demyst-code-kata
ENTRYPOINT ["/demyst-code-kata"]
