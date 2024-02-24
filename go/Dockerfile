FROM golang:1.21.6 as Builder

WORKDIR /cli
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -a -o demyst-code-kata .

FROM alpine
COPY --from=Builder /cli/demyst-code-kata demyst-code-kata
ENTRYPOINT ["/demyst-code-kata"]
