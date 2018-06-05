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

const uuid = require('uuid/v1');

class Inventory {
  /**
   * Inventory constructor, for identify the service endpoint.
   * @param {String} name 
   * @param {String} protocol
   * @param {String} uri
   */
  constructor(name, protocol, uri) {
    this._name = name;
    this._protocol = protocol;
    this._uri = uri;
    this._serviceId = uuid();
    this._longServiceName = this._name + this._uri;
  }

  get longServiceName() {
    return this._longServiceName;
  }

  static validInventoryObject(obj) {
    if (obj && obj.name && obj.protocol && obj.uri) {
      return new Inventory(obj.name, obj.protocol, obj.uri)
    } else {
      // TODO: only return null currently.
      return null;
    }
  }
}

module.exports = Inventory;