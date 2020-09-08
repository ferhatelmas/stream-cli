SHELL := bash
.ONESHELL:
.SHELLFLAGS := -eu -o pipefail -c
.DELETE_ON_ERROR:
MAKEFLAGS += --warn-undefined-variables
MAKEFLAGS += --no-builtin-rules

GOLANGCI_VERSION = 1.31.0
GOLANGCI = .bin/golangci/$(GOLANGCI_VERSION)/golangci-lint

.PHONY: test
test:
	go test -race ./...

.PHONY: cover
cover:
	go test -race -cover -coverpkg=./... -covermode=atomic -coverprofile=coverage.out ./... && bash <(curl -s https://codecov.io/bash) -t fadb841d-f755-49c7-b901-e89bd722bb41

.PHONY: lint
lint: $(GOLANGCI)
	$(GOLANGCI) run ./...

.PHONY: tidy
tidy:
	go mod tidy && git diff --no-patch --exit-code

$(GOLANGCI):
	curl -sSfL https://raw.githubusercontent.com/golangci/golangci-lint/master/install.sh | sh -s -- -b $(dir $(GOLANGCI)) v$(GOLANGCI_VERSION)
