module github.com/michelprogram/magic-scanner

go 1.19

require (
	github.com/google/uuid v1.3.0
	github.com/rs/cors v1.9.0
	github.com/michelprogram/magic-scanner/api v1.0.0
)

replace github.com/michelprogram/magic-scanner/api => ../api
