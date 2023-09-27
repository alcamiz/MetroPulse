.DEFAULT_GOAL := all
SHELL := bash

exec:
	cd frontend
	npm install
	npm run build
