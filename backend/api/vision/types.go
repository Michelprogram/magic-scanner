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
type Vertices struct {
	X int `json:"x"`
	Y int `json:"y"`
}
type BoundingPoly struct {
	Vertices []Vertices `json:"vertices"`
}
type TextAnnotations struct {
	Locale       string       `json:"locale,omitempty"`
	Description  string       `json:"description"`
	BoundingPoly BoundingPoly `json:"boundingPoly"`
}
type DetectedLanguages struct {
	LanguageCode string  `json:"languageCode"`
	Confidence   float64 `json:"confidence"`
}
type Property struct {
	DetectedLanguages []DetectedLanguages `json:"detectedLanguages"`
}
type BoundingBox struct {
	Vertices []Vertices `json:"vertices"`
}
type Symbols struct {
	BoundingBox BoundingBox `json:"boundingBox"`
	Text        string      `json:"text"`
}
type Words struct {
	Property    Property    `json:"property"`
	BoundingBox BoundingBox `json:"boundingBox"`
	Symbols     []Symbols   `json:"symbols"`
}
type Paragraphs struct {
	BoundingBox BoundingBox `json:"boundingBox"`
	Words       []Words     `json:"words"`
}
type Blocks struct {
	BoundingBox BoundingBox  `json:"boundingBox"`
	Paragraphs  []Paragraphs `json:"paragraphs"`
	BlockType   string       `json:"blockType"`
}
type Pages struct {
	Property Property `json:"property"`
	Width    int      `json:"width"`
	Height   int      `json:"height"`
	Blocks   []Blocks `json:"blocks"`
}
type FullTextAnnotation struct {
	Pages []Pages `json:"pages"`
	Text  string  `json:"text"`
}
type Responses struct {
	TextAnnotations    []TextAnnotations  `json:"textAnnotations"`
	FullTextAnnotation FullTextAnnotation `json:"fullTextAnnotation"`
}
