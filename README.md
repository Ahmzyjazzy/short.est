# SHORT.EST NODE API

## Prerequisites
* The application depends on Redis for in-memory caching
* Install Docker Desktop if you currently don't have on your PC
* Start the Docker Desktop application

## How to run the application in DEVELOPMENT MODE

* Start the Docker Desktop application to ensure docker is running on local

* Navigate to the project root

* Startup the redis container with the command below

```
docker compose up -f docker-compose-redis-only.yml
```

* Finally use the command below to startup the application in dev mode

```
npm run dev
```

* Then visit http://localhost:3000 on your Rest client e.g PostMan to access API

