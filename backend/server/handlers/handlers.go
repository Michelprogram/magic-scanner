package handlers

import (
	"encoding/json"
	"fmt"
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
	Image    string `json:"image"`
	Language string `json:"language"`
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
		utils.JSONError(w, utils.HttpError{Message: "Only POST requests are allowed", Code: http.StatusMethodNotAllowed})
		return
	}

	var payload ImagePayload
	err := json.NewDecoder(r.Body).Decode(&payload)
	if err != nil {
		utils.JSONError(w, utils.HttpError{Message: "Invalid JSON payload", Code: http.StatusBadRequest})
		return
	}

	vision := vision.NewVision(VISION_TOKEN)

	VisionResult, err := vision.OCR(payload.Image)

	if err != nil {
		utils.JSONError(w, utils.HttpError{Message: "Vison OCR error " + err.Error(), Code: http.StatusBadRequest})
		return
	}

	title := utils.CardTitle(*VisionResult)

	if title == "" {

		utils.JSONError(w, utils.HttpError{Message: "No card title found", Code: http.StatusBadRequest})
		return
	}

	cards, err := scryfall.SearchMagicCardByName(title, payload.Language)

	if err != nil {
		utils.JSONError(w, utils.HttpError{Message: err.Error(), Code: http.StatusBadRequest})
		return
	}

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
		utils.JSONError(w, utils.HttpError{Message: "Invalid JSON payload", Code: http.StatusBadRequest})
		return
	}

	response, ok := storage.Load(payload.Id)

	if !ok {
		utils.JSONError(w, utils.HttpError{Message: "Invalid ID", Code: http.StatusBadRequest})
		return
	}

	card := response.(*Response).Cards.Data[payload.Index]

	notion := notion.NewNotion(NOTION_TOKEN, "7ed3432e626d439597fac0810734b5dd")

	err = notion.AddCard(card)

	if err != nil {
		utils.JSONError(w, utils.HttpError{Message: "Error while adding to notion", Code: http.StatusBadRequest})
		return
	}

	storage.Delete(payload.Id)

	fmt.Fprintf(w, "Added")
}
