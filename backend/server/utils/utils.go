package utils

import (
	"encoding/json"
	"log"
	"net/http"
	"strings"

	"github.com/michelprogram/magic-scanner/api/vision"
)

func CardTitle(vision vision.VisionResult) string {

	textAnnotations := vision.Responses[0].TextAnnotations

	if len(textAnnotations) == 0 {
		return ""
	}

	blocks := textAnnotations[0].Description

	cut := strings.Split(blocks, "\n")

	log.Printf("Card name : %s\n", cut[0])

	return cut[0]
}

func JSONError(w http.ResponseWriter, err HttpError) {
	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	w.Header().Set("X-Content-Type-Options", "nosniff")
	w.WriteHeader(err.Code)
	json.NewEncoder(w).Encode(err)
}

type HttpError struct {
	Message string `json:"message"`
	Code    int    `json:"code"`
}
