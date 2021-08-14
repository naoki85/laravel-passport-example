package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"net/url"
	"strings"
)

func checkToken(accessToken string) (user User, err error) {
	requestUrl := "http://nginx/oauth/introspect"

	args := url.Values{}
	args.Add("token", accessToken)

	req, err := http.NewRequest(
		"POST",
		requestUrl,
		strings.NewReader(args.Encode()),
	)
	if err != nil {
		return
	}

	req.Header.Set("Authorization", fmt.Sprintf("Bearer %s", accessToken))
	req.Header.Set("Content-Type", "application/x-www-form-urlencoded")
	req.Header.Set("Accept", "application/json")

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return
	}
	defer resp.Body.Close()

	byteArray, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return
	}

	fmt.Printf("%s\n", byteArray)

	if err := json.Unmarshal(byteArray, &user); err != nil {
		return user, err
	}

	return
}
