# service-proxy
Registration, logging and reporting service's status.

## Execution
```bash
npm run start
```

## Current functionalities
* `GET  /`: welcome message.
* `GET  /inventory`: query all stored inventories.
* `POST /inventory`: post an inventory description.
* `POST /startAll`: start all services' logging.
* `POST /start/:id`: dynamic route for start only one service, id = `name+protocol+uri`. 

Example post inventory description:
```bash
curl -X POST http://localhost:3000/inventory -d @test-resource/sample-inventory.json --header "Content-Type: application/json"
```

Example start:
```bash
curl -X POST http://localhost:3000/start
```

See `test-resource/sample-inventory.json` for json schema definition.

## Project layout

* `index.js`: entry point of node http server and db related tooling.
* `inventory.js`: model of inventory, a.k.a service-related metadata.
* `inventory-store.js`: adapt with sqlite for storing inventory data.
* `service.js`: abstraction of a service.
* `service-store.js`: in-memory store for enabled services.