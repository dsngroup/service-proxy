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

Example post:
```bash
curl -X POST http://localhost:3000/inventory -d @test-resource/sample-inventory.json --header "Content-Type: application/json"
```

See `test-resource/sample-inventory.json` for json schema definition.

## Project layout

* `index.js`: entry point of node http server and db related tooling.
* `inventory.js`: model of inventory, a.k.a service-related metadata.
* `inventory-store.js`: adapt with sqlite for storing inventory data.