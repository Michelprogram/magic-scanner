package utils

import (
	"log"
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
