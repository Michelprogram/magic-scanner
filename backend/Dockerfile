# Première étape : construire l'application
FROM golang:1.19-alpine AS builder

WORKDIR /app

COPY . .
RUN cd server && go mod download

RUN cd server && CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o app cmd/main.go

# Deuxième étape : créer une image légère
FROM alpine:latest

RUN apk --no-cache add ca-certificates

WORKDIR /root/

COPY --from=builder /app/server/app .

CMD ["./app"]