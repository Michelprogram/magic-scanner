package vision

// Vision
type VisionPayload struct {
	Requests []Requests `json:"requests"`
}
type ImageV struct {
	Content string `json:"content"`
}
type Features struct {
	Type       string `json:"type"`
	MaxResults int    `json:"maxResults"`
}
type Requests struct {
	Image    ImageV     `json:"image"`
	Features []Features `json:"features"`
}

type VisionResult struct {
	Responses []Responses `json:"responses"`
}

type TextAnnotations struct {
	Locale      string `json:"locale,omitempty"`
	Description string `json:"description"`
}

type Responses struct {
	TextAnnotations []TextAnnotations `json:"textAnnotations"`
}
