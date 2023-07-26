up:
	docker compose up -d --build

down:
	docker compose down

restart:
	docker compose restart

logs:
	docker compose logs -f

dev:
	npm install
	npm run dev

tunnel:
	$(MAKE) up
	ngrok http 6066
