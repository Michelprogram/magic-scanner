package scryfall

import (
	"encoding/json"
	"errors"
	"fmt"
	"net/http"
	"net/url"
)

func SearchMagicCardByName(name string) (*Cards, error) {
	url := fmt.Sprintf("https://api.scryfall.com/cards/search?q=%s&lang=en&unique=prints", url.QueryEscape(name))
	resp, err := http.Get(url)

	if err != nil {
		return nil, errors.New("failed during search from scryfall")
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
