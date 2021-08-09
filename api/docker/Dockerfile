FROM golang:1.13-alpine

RUN mkdir /api
WORKDIR /api

COPY ./go.mod .
COPY ./go.sum .

RUN go mod download
RUN go get -u github.com/cosmtrek/air

COPY . .

EXPOSE 8000
CMD ["air", "-c", ".air.toml"]
