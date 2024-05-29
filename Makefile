.PHONY: all
all: image/build-and-push

.ONESHELL:
SHELL := /bin/bash
.SHELLFLAGS = -ec

ENVIRONMENT ?= dev
VALID_ENVIRONMENTS := dev stg prd

# Set SERVEOPTS="-a 0.0.0.0:3001" or somesuch to serve at port 3001 on all interfaces.

# Check if the ENVIRONMENT variable is in the list of valid environments
ifeq ($(filter $(ENVIRONMENT),$(VALID_ENVIRONMENTS)),)
$(error Invalid value for ENVIRONMENT. Valid values are dev, stg, or prd.)
endif


HERE=$(shell pwd)

VERSION=$(shell cat $(HERE)/VERSION)
export VERSION

.PHONY: autogen dev1 dev2 assemble build run-image push-dev-image image/build-and-push
zq2/docs/mkdocs.yml autogen:
	(cd $(HERE)/docgen && cargo run $(HERE))

dev1:
	(cd zq1 && DOC_SOURCE=$(HERE)/zq1/docs mkdocs serve $(SERVEOPTS))

dev2: zq2/docs/mkdocs.yml
	(cd zq2 && DOC_SOURCE=$(HERE)/zq2/docs mkdocs serve $(SERVEOPTS))

BINDIR=$(HERE)/obj
HERE_FILES=Dockerfile requirements.txt

# Sadly necessary because we need the docs from .., and using that as the dockerfile context
# would be a whole world of pain.
.PHONY: assemble build
assemble:
	rm -rf $(BINDIR)
	mkdir -p $(BINDIR)
	cp -r $(HERE_FILES) $(BINDIR)
	cp -r $(HERE)/zq1 $(BINDIR)
	cp -r $(HERE)/zq2 $(BINDIR)

IMAGE_TAG ?= developer-portal:latest

build:
	docker buildx build --build-arg VERSION="${VERSION}" . -t $(IMAGE_TAG)

run-image: build
	docker run --rm -p 8080:80 "$(IMAGE_TAG)"

STG_TAG=asia-docker.pkg.dev/prj-d-dev-apps-n3p4o97j/zilliqa/developer-portal
## Push to the dev repo so you can check that the docker container actually works .. 
push-dev-image: build
	docker tag "${IMAGE_TAG}" "${STG_TAG}"
	docker push "${STG_TAG}"
	echo Now restart the pod ..

## Build and push the Docker image
image/build-and-push: build
	docker push "$(IMAGE_TAG)"
