package scryfall

import (
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"net/http"
	"net/url"
	"strings"
)

func SearchMagicCardByName(name string, language string) (*Cards, error) {
	url := fmt.Sprintf("https://api.scryfall.com/cards/search?&unique=prints&q=%s+lang%%3A%s", url.QueryEscape(name), strings.ToLower(language))
	resp, err := http.Get(url)

	if err != nil {
		return nil, errors.New("failed during search from scryfall")
	}

	if resp.StatusCode != 200 {
		body, _ := io.ReadAll(resp.Body)
		return nil, errors.New("Error searching card " + string(body))
	}

	var cards Cards
	err = json.NewDecoder(resp.Body).Decode(&cards)
	if err != nil {
		return nil, errors.New("invalid JSON payload")
	}

	if cards.TotalCards == 0 {
		return nil, errors.New("No cards found")
	}

	return &cards, nil

}
