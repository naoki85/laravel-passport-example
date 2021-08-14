package main

type User struct {
	Id uint32 `json:"sub"`
	Username string `json:"username"`
	Active bool `json:"active"`
}
