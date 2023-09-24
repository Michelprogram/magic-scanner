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

	fmt.Printf("🚀 Lancement de l'api sur le port %d...\n", port)

	mux := http.NewServeMux()

	mux.HandleFunc("/v1/scanner", handlers.Scanner)
	mux.HandleFunc("/v1/add", handlers.Add)
	mux.HandleFunc("/v1/hello", handlers.Hello)

	handler := cors.Default().Handler(mux)

	expose := fmt.Sprintf(":%d", port)

	err := http.ListenAndServe(expose, handler)

	if err != nil {
		fmt.Printf("Can't run api : %s\n", err.Error())
	}
}
