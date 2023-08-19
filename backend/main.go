package main

import (
	"encoding/base64"
	"os"
)

func toBase64(b []byte) string {
	return base64.StdEncoding.EncodeToString(b)
}

func toPNG(imgb64 string) {

	decodedImage, _ := base64.StdEncoding.DecodeString(imgb64)

	err := os.WriteFile("output.png", decodedImage, 0644)

	if err != nil {
		panic(err)
	}

	println("Image successfully written to output.png")

}

func main() {

	data, _ := os.ReadFile("716083.jpg")

	toPNG(toBase64(data))

	/* 	client := gosseract.NewClient()
	   	defer client.Close()
	   	client.SetImage("716083.jpg")
	   	text, _ := client.Text()
	   	fmt.Println("Done :" + text) */
	// Hello, World!
}
