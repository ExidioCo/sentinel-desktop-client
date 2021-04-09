PACKAGES := $(shell go list ./...)
VERSION := $(shell git rev-parse --short HEAD)

BUILD_TAGS := netgo
BUILD_TAGS := $(strip ${BUILD_TAGS})

LD_FLAGS := -s -w \
	-X github.com/sentinel-official/desktop-client/cli/types.Version=${VERSION}

BUILD_FLAGS := -tags "${BUILD_TAGS}" -ldflags "${LD_FLAGS}"

OUTPUT_FILE := ../bin/manager

all: mod_verify test benchmark install

install: mod_verify
	go build -mod=readonly ${BUILD_FLAGS} -o ${OUTPUT_FILE} main.go

test:
	@go test -mod=readonly -cover ${PACKAGES}

benchmark:
	@go test -mod=readonly -bench=. ${PACKAGES}

mod_verify:
	@echo "Ensure dependencies have not been modified"
	@go mod verify

.PHONY: all install test benchmark mod_verify
