/*
 * Copyright 2018 Dependable Distributed System and Network Lab, National Taiwan University.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Inventory = require('./lib/inventory');
const inventoryStore = require('./lib/inventory-store')('./inventory.db');
const jsonParser = bodyParser.json();
const Service = require('./lib/service');

let serviceStore = require('./lib/service-store')();

app.get('/', (req, res) => {
  res.send('welcome to registration service.');
});

app.post('/inventory', jsonParser, (req, res) => {
  let obj = req.body;
  let inventory = Inventory.validInventoryObject(obj);
  if (inventory) {
    inventoryStore.insert(inventory);
    res.send('Sucessfully register an inventory');
  } else {
    res.send('Not an valid inventory object.');
  }
});

app.get('/inventory', async (req, res) => {
  let result = await inventoryStore.queryAll();
  res.send(JSON.stringify(result));
});

app.get('/start', async (req, res) => {
  // Spawn all services here with owned inventories.
  // TODO: should move this to somewhere else.
  let inventories = await inventoryStore.queryAll();
  for (let inventoryObj of inventories) {
    let inventory = Inventory.validInventoryObject(inventoryObj);
    // TODO: remove hard-coded time.
    let service = new Service(inventory, 1000);
    // For future modification indexing.
    serviceStore.insert(service);
  }
  res.send('Ok');
});

app.listen(3000, () => console.log('Registration service listening on http://localhost:3000'));