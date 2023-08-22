package notion

import "time"

type Results struct {
	Object          string         `json:"object"`
	Results         []Row          `json:"results"`
	NextCursor      any            `json:"next_cursor"`
	HasMore         bool           `json:"has_more"`
	Type            string         `json:"type"`
	PageOrDatabase  PageOrDatabase `json:"page_or_database"`
	DeveloperSurvey string         `json:"developer_survey"`
}
type CreatedBy struct {
	Object string `json:"object"`
	ID     string `json:"id"`
}
type LastEditedBy struct {
	Object string `json:"object"`
	ID     string `json:"id"`
}
type Parent struct {
	Type       string `json:"type"`
	DatabaseID string `json:"database_id"`
}
type Price struct {
	ID     string `json:"id"`
	Type   string `json:"type"`
	Number any    `json:"number"`
}
type Type struct {
	ID     string `json:"id"`
	Type   string `json:"type"`
	Select any    `json:"select"`
}

type RichText struct {
	Type        string      `json:"type"`
	Text        Text        `json:"text"`
	Annotations Annotations `json:"annotations"`
	PlainText   string      `json:"plain_text"`
	Href        any         `json:"href"`
}
type ID struct {
	ID       string     `json:"id"`
	Type     string     `json:"type"`
	RichText []RichText `json:"rich_text"`
}
type Cardmarket struct {
	ID   string `json:"id"`
	Type string `json:"type"`
	URL  any    `json:"url"`
}
type Price0 struct {
	ID     string `json:"id"`
	Type   string `json:"type"`
	Number any    `json:"number"`
}
type Image struct {
	ID   string `json:"id"`
	Type string `json:"type"`
	URL  any    `json:"url"`
}
type Duplicate struct {
	ID     string `json:"id"`
	Type   string `json:"type"`
	Number int    `json:"number"`
}
type Text struct {
	Content string `json:"content"`
	Link    any    `json:"link"`
}
type Annotations struct {
	Bold          bool   `json:"bold"`
	Italic        bool   `json:"italic"`
	Strikethrough bool   `json:"strikethrough"`
	Underline     bool   `json:"underline"`
	Code          bool   `json:"code"`
	Color         string `json:"color"`
}
type Title struct {
	Type        string      `json:"type"`
	Text        Text        `json:"text"`
	Annotations Annotations `json:"annotations"`
	PlainText   string      `json:"plain_text"`
	Href        any         `json:"href"`
}
type Name struct {
	ID    string  `json:"id"`
	Type  string  `json:"type"`
	Title []Title `json:"title"`
}
type Properties struct {
	Price      Price      `json:"Price $"`
	Type       Type       `json:"Type"`
	Cardmarket Cardmarket `json:"Cardmarket"`
	Price0     Price0     `json:"Price €"`
	Image      Image      `json:"Image"`
	Duplicate  Duplicate  `json:"Duplicate"`
	Name       Name       `json:"Name"`
	Id         ID         `json:"id"`
}
type Row struct {
	Object         string       `json:"object"`
	ID             string       `json:"id"`
	CreatedTime    time.Time    `json:"created_time"`
	LastEditedTime time.Time    `json:"last_edited_time"`
	CreatedBy      CreatedBy    `json:"created_by"`
	LastEditedBy   LastEditedBy `json:"last_edited_by"`
	Cover          any          `json:"cover"`
	Icon           any          `json:"icon"`
	Parent         Parent       `json:"parent"`
	Archived       bool         `json:"archived"`
	Properties     Properties   `json:"properties"`
	URL            string       `json:"url"`
	PublicURL      any          `json:"public_url"`
}
type PageOrDatabase struct {
}
