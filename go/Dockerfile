# Iniciando uma imagem base golang:alpine
FROM golang:alpine AS builder

# criando diretório de trabalho
WORKDIR /app

# Copiando o app
COPY . .

# Compilando o binário removendo informações de debug
RUN go build -ldflags '-s -w' main.go

# Iniciando com scratch
FROM scratch

# diretório de trabalho
WORKDIR /

# copiando o binário
COPY --from=builder /app / 

# executando 
CMD ["./main"]

