package utils

import "github.com/michelprogram/magic-scanner/api/vision"

func CardTitle(vision vision.VisionResult) string {

	blocks := vision.Responses[0].FullTextAnnotation.Pages[0].Blocks[0]
	title := ""

	for _, paragraph := range blocks.Paragraphs {
		for _, word := range paragraph.Words {
			for _, symbol := range word.Symbols {
				title += symbol.Text
			}
		}
	}

	return title
}
