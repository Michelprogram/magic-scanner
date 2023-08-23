package main

import (
	"flag"
	"fmt"
	"net/http"
	"os"

	"github.com/michelprogram/magic-scanner/handlers"
	"github.com/rs/cors"
)

func main() {

	var port int
	flag.IntVar(&port, "p", 5, "port to run the server on")
	flag.Parse()

	token := os.Getenv("NOTION_TOKEN")

	if token == "" {
		fmt.Println("No token found")
		os.Exit(1)
	}

	token = os.Getenv("VISION_TOKEN")

	if token == "" {
		fmt.Println("No token found")
		os.Exit(1)
	}

	fmt.Printf("🚀 Lancement de l'api sur le port %d...", port)

	mux := http.NewServeMux()

	mux.HandleFunc("/scanner", handlers.Scanner)
	mux.HandleFunc("/add", handlers.Add)
	mux.HandleFunc("/hello", handlers.Hello)

	handler := cors.Default().Handler(mux)

	expose := fmt.Sprintf(":%d", port)

	err := http.ListenAndServe(expose, handler)

	if err != nil {
		fmt.Println("Can't run website")
	}
}
