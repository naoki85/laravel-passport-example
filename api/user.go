package main

type User struct {
	Id uint32 `json:"sub"`
	Active bool `json:"active"`
}
