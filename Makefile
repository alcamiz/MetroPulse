.DEFAULT_GOAL := all
SHELL := bash
FRONTEND_PATH := frontend

exec:
    cd $(FRONTEND_PATH) && npm install
    cd $(FRONTEND_PATH) && npm run build
