package main

import (
	"fmt"
	"net/http"

	"github.com/michelprogram/magic-scanner/handlers"
	"github.com/rs/cors"
)

func main() {

	fmt.Println("🚀 Lancement de l'api sur le port 3333...")

	mux := http.NewServeMux()

	mux.HandleFunc("/scanner", handlers.Scanner)
	mux.HandleFunc("/add", handlers.Add)
	mux.HandleFunc("/hello", handlers.Hello)

	handler := cors.Default().Handler(mux)

	err := http.ListenAndServe(":3333", handler)

	if err != nil {
		fmt.Println("Can't run website")
	}
}
