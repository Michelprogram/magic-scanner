package notion

import (
	"bytes"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"net/http"
	"strconv"

	"github.com/michelprogram/magic-scanner/api/scryfall"
)

type Notion struct {
	Token      string
	DatabaseId string

	Version string
}

func NewNotion(token, databaseid string) *Notion {
	return &Notion{Token: token, DatabaseId: databaseid, Version: "2022-06-28"}
}

func (n Notion) IsCardExist(id string) (*Row, error) {
	url := fmt.Sprintf("https://api.notion.com/v1/databases/%s/query", n.DatabaseId)

	payload := map[string]map[string]interface{}{
		"filter": {
			"property": "id",
			"rich_text": map[string]string{
				"equals": id,
			},
		},
	}

	body, _ := json.Marshal(payload)
	request, err := http.NewRequest("POST", url, bytes.NewBuffer(body))

	if err != nil {
		return nil, err
	}

	request.Header.Set("Authorization", "Bearer "+n.Token)
	request.Header.Add("Content-Type", "application/json")
	request.Header.Add("Notion-Version", n.Version)

	client := &http.Client{}
	res, err := client.Do(request)
	if err != nil {
		return nil, err
	}
	defer res.Body.Close()

	if res.StatusCode != 200 {
		body, _ = io.ReadAll(res.Body)
		return nil, errors.New("Error check if card already exists" + string(body))
	}

	var result Results
	err = json.NewDecoder(res.Body).Decode(&result)
	if err != nil {
		return nil, err
	}

	if len(result.Results) == 0 {
		return nil, nil
	}

	return &result.Results[0], nil
}

func (n Notion) UpdateDuplicateProperty(row Row) error {

	url := fmt.Sprintf("https://api.notion.com/v1/pages/%s", row.ID)

	payload := map[string]map[string]interface{}{
		"properties": {
			"Duplicate": map[string]int{
				"number": row.Properties.Duplicate.Number + 1,
			},
		},
	}

	body, _ := json.Marshal(payload)
	request, err := http.NewRequest("PATCH", url, bytes.NewBuffer(body))

	if err != nil {
		return err
	}

	request.Header.Set("Authorization", "Bearer "+n.Token)
	request.Header.Add("Content-Type", "application/json")
	request.Header.Add("Notion-Version", n.Version)

	client := &http.Client{}
	res, err := client.Do(request)
	if err != nil {
		return err
	}
	defer res.Body.Close()

	if res.StatusCode != 200 {
		body, _ = io.ReadAll(res.Body)
		return errors.New("Error update duplicate property : " + string(body))
	}

	return nil
}

func (n Notion) AddRow(card scryfall.Card) error {

	url := "https://api.notion.com/v1/pages/"

	eur, _ := strconv.ParseFloat(card.Prices.Eur, 32)
	usd, _ := strconv.ParseFloat(card.Prices.Usd, 32)

	titleText := map[string]interface{}{
		"text": map[string]string{
			"content": card.Name,
		},
	}

	payload := map[string]interface{}{
		"cover": map[string]interface{}{
			"type": "external",
			"external": map[string]string{
				"url": card.ImageUris.Normal,
			},
		},
		"parent": map[string]interface{}{
			"database_id": n.DatabaseId,
		},
		"properties": map[string]interface{}{
			"Price $": map[string]interface{}{
				"type":   "number",
				"number": usd,
			},
			"Type": map[string]interface{}{
				"type": "select",
				"select": map[string]string{
					"name": card.TypeLine,
				},
			},
			"id": map[string]interface{}{
				"type": "rich_text",
				"rich_text": []map[string]interface{}{
					{
						"text": map[string]string{
							"content": card.ID,
						},
					},
				},
			},
			"Cardmarket": map[string]interface{}{
				"type": "url",
				"url":  card.PurchaseUris.Cardmarket,
			},
			"Price €": map[string]interface{}{
				"type":   "number",
				"number": eur,
			},
			"Image": map[string]interface{}{
				"type": "url",
				"url":  card.ImageUris.Normal,
			},
			"Duplicate": map[string]interface{}{
				"type":   "number",
				"number": 1,
			},
			"Name": map[string]interface{}{
				"title": []interface{}{titleText},
			},
		},
	}

	body, _ := json.Marshal(payload)
	request, err := http.NewRequest("POST", url, bytes.NewBuffer(body))

	if err != nil {
		return err
	}

	request.Header.Set("Authorization", "Bearer "+n.Token)
	request.Header.Add("Content-Type", "application/json")
	request.Header.Add("Notion-Version", n.Version)

	client := &http.Client{}
	res, err := client.Do(request)
	if err != nil {
		return err
	}
	defer res.Body.Close()

	if res.StatusCode != 200 {
		body, _ = io.ReadAll(res.Body)
		return errors.New("Error adding card to Notion: " + string(body))
	}

	return nil
}

func (n Notion) AddCard(card scryfall.Card) error {

	result, error := n.IsCardExist(card.ID)

	if error != nil {
		return error
	}

	if result != nil {
		println("Already exist")
		n.UpdateDuplicateProperty(*result)
		return nil
	}

	return n.AddRow(card)
}
