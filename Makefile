.DEFAULT_GOAL := all
SHELL := bash
FRONTEND_PATH := frontend

exec:
	cd $(FRONTEND_PATH) && npm install
	cd $(FRONTEND_PATH) && npm run build

Metropulse.log.txt:
	git log > Metropulse.log.txt

clean: 
	rm -f *.tmp

docker_run_frontend:
	docker run -dp 3000:3000 frontend_docker

docker_run_backend:
	docker run --rm -it -p 5000:5000 backend_docker

docker_build_frontend:
	docker build -t frontend_docker frontend/

docker_build_backend:
	docker build -t backend_docker backend/

unit_tests:
	echo "Running unit tests"
	python3 backend/unit_tests.py

status:
	make clean
	@echo
	git branch
	git remote -v
	git status

pull:
	make clean
	@echo
	git pull
	git status

all:
