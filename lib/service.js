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
  }

  _fire() {
    request('http://www.google.com', (err, res, body) => {
      if (!err) {
        console.log(`Result : ${res.statusCode}`);
      }
    })
  }

  spawn() {
    setInterval(() => {
      this._fire();
    }, this._period);
  }
}

module.exports = Service;