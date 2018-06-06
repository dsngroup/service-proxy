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

const request = require('request');

class Service {

  constructor(inventory, period) {
    this._inventory = inventory;
    this._period = period;

    this._timer = setInterval(() => {
      this._fire();
    }, this._period);
  }

  _fire() {
    // TODO: The protocol://uri format is correct?
    request(`${this._inventory.protocol}://${this._inventory.uri}`, (err, res, body) => {
      if (!err) {
        // TODO: Report to waterfall logging api.
        // TODO: the response content should be the user-defined schema with raw event validation...
        console.log(`Service [${this._inventory.name}] got status code : ${res.statusCode}`);
      }
    })
  }

  drop() {
    clearInterval(this._timer);
  }

  get inventory() {
    return this._inventory;
  }
}

module.exports = Service;