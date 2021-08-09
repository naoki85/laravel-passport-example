package main

import (
	"os"
	"sync"
)

type Config struct {
	Username string
	Password string
	Host     string
	Port     string
	Database string
}

var instance *Config
var once sync.Once

func InitDbConf() {
	once.Do(func() {
		instance = &Config{
			Username: os.Getenv("DB_USER"),
			Password: os.Getenv("DB_PASSWORD"),
			Host:     os.Getenv("DB_HOST"),
			Port:     os.Getenv("DB_PORT"),
			Database: os.Getenv("DB_NAME"),
		}
	})
}

func GetDbConf() *Config {
	return instance
}