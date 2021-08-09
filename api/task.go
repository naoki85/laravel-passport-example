package main

type Task struct {
	Id uint32 `json:"id"`
	UserId uint32 `json:"userId"`
	Title string `json:"title"`
	CreatedAt string `json:"createdAt"`
	UpdatedAt string `json:"updatedAt"`
}

type Tasks []Task
