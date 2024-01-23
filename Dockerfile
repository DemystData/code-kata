
# Using alipne for light docker image
FROM ruby:3.0.0-alpine

WORKDIR /app

COPY . .

# Specify an entrypoint 
ENTRYPOINT ["./main"]

# Default CMD arguments (can be overridden when running the container)
CMD ["-n", "20"]