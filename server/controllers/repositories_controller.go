package controllers

import (
	"encoding/json"
	"github.com/runatlantis/atlantis/server/core/db"
	"github.com/runatlantis/atlantis/server/logging"
	"net/http"
	"net/url"
)

type RepositoriesController struct {
	AtlantisVersion string
	AtlantisURL     *url.URL
	Logger          logging.SimpleLogging
	DB              *db.BoltDB
}

type Repo struct {
	RepoName string `json:"repoName"`
	Locks    int    `json:"locks"`
}

func (c *RepositoriesController) Get(writer http.ResponseWriter, request *http.Request) {
	repos := c.GetRepositories()
	reposPayload, _ := json.Marshal(repos)
	c.respond(writer, logging.Debug, 200, "Repository list %s", &reposPayload)
}

// GetRepositories returns repositories list TODO implement
func (c *RepositoriesController) GetRepositories() []Repo {
	return []Repo{{
		RepoName: "terraform-envs",
		Locks:    1,
	}, {
		RepoName: "data-envs",
		Locks:    4,
	}}
}

func (c *RepositoriesController) respond(w http.ResponseWriter, lvl logging.LogLevel, responseCode int, format string, args *[]byte) {
	w.Header()["Content-Type"] = []string{"application/json"}

	w.WriteHeader(responseCode)
	_, err := w.Write(*args)

	if err != nil {
		c.Logger.Err("Can't write repos response: %s", err)
	}
}
