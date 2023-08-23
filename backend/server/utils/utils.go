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

	log.Println(textAnnotations[0].Description)

	blocks := textAnnotations[0].Description

	cut := strings.Split(blocks, "\n")

	log.Printf("Size %d\n", len(cut))

	return cut[0]
}
