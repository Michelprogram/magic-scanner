package handlers

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"sync"

	"github.com/google/uuid"
	"github.com/michelprogram/magic-scanner/api/notion"
	"github.com/michelprogram/magic-scanner/api/scryfall"
	"github.com/michelprogram/magic-scanner/api/vision"
	"github.com/michelprogram/magic-scanner/utils"
)

var storage = sync.Map{}

var NOTION_TOKEN = os.Getenv("NOTION_TOKEN")
var VISION_TOKEN = os.Getenv("VISION_TOKEN")

type ImagePayload struct {
	Image string `json:"image"`
}

type AddPayload struct {
	Id    string `json:"id"`
	Index int    `json:"index"`
}

type Response struct {
	Id    string          `json:"id"`
	Cards *scryfall.Cards `json:"cards"`
}

func Hello(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Hello World!")
}

func Scanner(w http.ResponseWriter, r *http.Request) {

	w.Header().Set("Content-Type", "application/json")

	if r.Method != http.MethodPost {
		http.Error(w, "Only POST requests are allowed", http.StatusMethodNotAllowed)
		return
	}

	log.Println("Passed post")

	var payload ImagePayload
	err := json.NewDecoder(r.Body).Decode(&payload)
	if err != nil {
		http.Error(w, "Invalid JSON payload", http.StatusBadRequest)
		return
	}

	vision := vision.NewVision(VISION_TOKEN)

	VisionResult, err := vision.OCR(payload.Image)

	if err != nil {
		http.Error(w, "Vison OCR error "+err.Error(), http.StatusBadRequest)
		return
	}

	//Mock
	/* 	jsonFile, _ := os.Open("data.json")
	   	defer jsonFile.Close()

	   	bytes, _ := io.ReadAll(jsonFile)

	   	var VisionResult vision.VisionResult

	   	json.Unmarshal(bytes, &VisionResult)
	*/

	title := utils.CardTitle(*VisionResult)

	log.Printf("Title : %s\n", title)

	cards, _ := scryfall.SearchMagicCardByName(title)

	id := uuid.New().String()

	response := Response{
		Id:    id,
		Cards: cards,
	}

	storage.Store(id, &response)

	js, _ := json.Marshal(response)

	fmt.Fprintf(w, "%s", js)

}

func Add(w http.ResponseWriter, r *http.Request) {

	var payload AddPayload
	err := json.NewDecoder(r.Body).Decode(&payload)
	if err != nil {
		http.Error(w, "Invalid JSON payload", http.StatusBadRequest)
		return
	}

	response, ok := storage.Load(payload.Id)

	if !ok {
		http.Error(w, "Invalid ID", http.StatusBadRequest)
		return
	}

	card := response.(Response).Cards.Data[payload.Index]

	notion := notion.NewNotion(NOTION_TOKEN, "7ed3432e626d439597fac0810734b5dd")

	err = notion.AddCard(card)

	if err != nil {
		http.Error(w, "Error while adding to notion", http.StatusBadRequest)
		return
	}

	storage.Delete(payload.Id)

	fmt.Fprintf(w, "Added")

}
