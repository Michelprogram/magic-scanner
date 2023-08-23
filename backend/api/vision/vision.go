package vision

import (
	"bytes"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"net/http"
)

type Vision struct {
	Token string
}

func NewVision(token string) *Vision {
	return &Vision{
		Token: token,
	}
}

func (v *Vision) OCR(base64 string) (*VisionResult, error) {
	url := fmt.Sprintf("https://vision.googleapis.com/v1/images:annotate?key=%s", v.Token)

	payload := VisionPayload{
		Requests: []Requests{
			{
				Image: ImageV{
					Content: base64[23:],
				},
				Features: []Features{
					{
						Type:       "TEXT_DETECTION",
						MaxResults: 5,
					},
				},
			},
		},
	}

	body, _ := json.Marshal(payload)
	request, err := http.NewRequest("POST", url, bytes.NewBuffer(body))

	if err != nil {
		return nil, err
	}

	request.Header.Add("Content-Type", "application/json")

	client := &http.Client{}
	res, err := client.Do(request)
	if err != nil {
		return nil, err
	}
	defer res.Body.Close()

	if res.StatusCode != 200 {
		body, _ = io.ReadAll(res.Body)
		return nil, errors.New("Error while ask vision OCR " + string(body))
	}

	var result VisionResult
	err = json.NewDecoder(res.Body).Decode(&result)
	if err != nil {
		return nil, err
	}

	return &result, nil

}
