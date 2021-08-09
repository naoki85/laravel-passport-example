package main

import (
	"encoding/json"
	"fmt"
	"github.com/julienschmidt/httprouter"
	"net/http"
	"strings"
)

func main() {
	router := httprouter.New()

	router.GET("/tasks", requireLogin(TasksHandler))

	http.ListenAndServe(":8000", router)
}

func TasksHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	sqlHandler, err := NewSqlHandler()
	if err != nil {
		fail(w, err.Error(), http.StatusInternalServerError)
		return
	}

	taskRepository := TaskRepository{sqlHandler}
	tasks, err := taskRepository.findAll(1)
	if err != nil {
		fail(w, err.Error(), http.StatusInternalServerError)
		return
	}

	data := struct {
		Tasks `json:"tasks"`
	}{tasks}
	ok(w, data)
}

func requireLogin(next http.HandlerFunc) httprouter.Handle {
	return func(w http.ResponseWriter, r *http.Request, p httprouter.Params) {
		authorizationHeader := r.Header["Authorization"]
		if len(authorizationHeader) == 0 {
			fail(w, "Bad Request", http.StatusBadRequest)
			return
		}

		bearerToken := authorizationHeader[0]
		separated := strings.Split(bearerToken, " ")
		if len(separated) < 2 {
			fail(w, "Bad Request", http.StatusBadRequest)
			return
		}

		user, err := checkToken(separated[1])
		if err != nil {
			fail(w, err.Error(), http.StatusInternalServerError)
			return
		}

		if user.Id == 0 || user.Active == false {
			fail(w, "Unauthorized", http.StatusUnauthorized)
			return
		}

		fmt.Printf("%v\n", user)
		next.ServeHTTP(w, r)
	}
}

func fail(w http.ResponseWriter, msg string, status int) {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	data := struct {
		Error string
	}{Error: msg}

	resp, _ := json.Marshal(data)
	w.WriteHeader(status)
	w.Write(resp)
}

func ok(w http.ResponseWriter, data interface{}) {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	resp, err := json.Marshal(data)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		fail(w, "oops something evil has happened", 500)
		return
	}
	w.Write(resp)
}