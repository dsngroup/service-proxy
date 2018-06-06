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

const fs = require('fs');
const sqlite = require('sqlite3').verbose();

const schema = '\
CREATE TABLE IF NOT EXISTS Inventory (\
  name TEXT NOT NULL,\
  protocol CHAR(10) NOT NULL,\
  uri TEXT NOT NULL\
)';

class InventoryStore {

  constructor(dbpath) {
    this._dbpath = dbpath || "./inventory.db";
    this._checkDBExists(this._dbpath);
    this._db = new sqlite.Database(this._dbpath)
    this._db.serialize(() => {
      this._db.run(schema);
    });
  }

  _checkDBExists(path) {
    let exists = fs.existsSync(path);
    if (!exists) {
      // Create (open) a new one and close it immediately
      fs.closeSync(fs.openSync(path, 'w'));
    }
  }

  /**
   * Insert an inventory into inventory store.
   * @param {!Inventory} inventory 
   */
  insert(inventory) {
    let stmt = this._db.prepare("INSERT INTO Inventory VALUES (?, ?, ?);");
    stmt.run(inventory.name, inventory.protocol, inventory.uri);
    stmt.finalize();
  }

  async queryAll() {
    let selectAll = "SELECT * FROM Inventory;";
    return new Promise((resolve, reject) => {
      this._db.all(selectAll, (err, row) => {
        if (err) reject('Wrong on executing sql select all');
        // Will returning an object.
        resolve(row);
      });
    });
  }
}

module.exports = (dbpath) => { return new InventoryStore(dbpath); };