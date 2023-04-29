/**
* SuchDB V1.0.8
* An simple, dependency free, require & go node.js and browser database
* Auhtor: Sectly (Sectly@sectly.online)
* Licence: MPL-2.0, This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. If a copy of the MPL was not distributed with this file, You can obtain one at https://mozilla.org/MPL/2.0/.
* NPM: https://www.npmjs.com/package/@sectly-studios/suchdb
*/

(function(exports) {

  "use strict";

  function SuchDBMaster(options, isNode) {
    var suchdb = {};

    options = options || {};
    isNode = isNode || false;

    // Core Functions:

    function nodeify(defaultvalue, nodevalue) {
      if (isNode) {
        return nodevalue || null;
      } else {
        return defaultvalue || null;
      }
    }

    function getoption(data, defaultvalue) {
      let name = data["name"] || false;
      let base = data["base"] || false;

      if (options && typeof options === "object" && Object.keys(options).length > 0) {
        if (base) {
          let checkbase = options[base] !== "undefined" ? options[base] : (options[base] = null);

          if (checkbase) {
            return typeof options[base][name] !== "undefined" ? options[base][name] : (options[base][name] = defaultvalue);
          } else {
            return defaultvalue;
          }
        } else {
          return typeof options[name] !== "undefined" ? options[name] : (options[name] = defaultvalue);
        }
      } else {
        return defaultvalue;
      }
    }

    suchdb.options = {
      master: getoption({ name: "master", base: false }, nodeify("suchdb_data", "data")),
      autosave: getoption({ name: "autosave", base: false }, nodeify(false, true)),
      autoload: getoption({ name: "autoload", base: false }, nodeify(false, false)),
      encrypt: {
        enabled: getoption({ name: "enabled", base: "encrypt" }, nodeify(false, true)),
        key: getoption({ name: "key", base: "encrypt" }, nodeify("SuchDB", "SuchDB_Key")),
      },
      autobackup: getoption({ name: "autobackup", base: false }, nodeify(false, false)),
    };

    suchdb.isNode = isNode || false;

    if (suchdb.isNode) {
      suchdb.nodeDriver = {
        fs: require("fs"),
      }
    }

    var store = {};

    var SuchDBEncryption = {
      encrypt: function(content, key) {
        var result = [];
        var keyLen = key.length;
        for (var i = 0; i < content.length; i++) {
          var keyOffset = i % keyLen;
          var calAscii = (content.charCodeAt(i) + key.charCodeAt(keyOffset));
          result.push(calAscii);
        }
        return JSON.stringify(result);
      },

      decrypt: function(content, key) {
        var result = [];
        var str = '';
        var codesArr = JSON.parse(content);
        var keyLen = key.length;
        for (var i = 0; i < codesArr.length; i++) {
          var keyOffset = i % keyLen;
          var calAscii = (codesArr[i] - key.charCodeAt(keyOffset));
          result.push(calAscii);
        }
        for (var i = 0; i < result.length; i++) {
          var ch = String.fromCharCode(result[i]); str += ch;
        }
        return str;
      }
    }

    function __backup(dataToBackup) {
      try {
        if (suchdb.options.autobackup) {
          dataToBackup = dataToBackup || JSON.stringify({ error: 'SuchDB Data Backup Error!' });

          if (suchdb.isNode) {
            suchdb.nodeDriver.fs.writeFileSync(`${suchdb.options.master}.backup.suchdb`, dataToBackup);
          } else {
            localStorage.setItem(`backup_${suchdb.options.master}`, JSON.stringify(dataToBackup));
          }
        }
      } catch (error) {
        console.log(error);
      }
    }

    function __loadBackup(overwrite) {
      try {
        if (suchdb.options.autobackup) {
          overwrite = overwrite || false;

          let dataFromBackup = "";

          if (suchdb.isNode) {
            dataFromBackup = suchdb.nodeDriver.fs.readFileSync(`${suchdb.options.master}.backup.suchdb`) || "";
          } else {
            dataFromBackup = localStorage.getItem(`backup_${suchdb.options.master}`) || "";
          }

          if (suchdb.options.encrypt.enabled && typeof suchdb.options.encrypt.key == 'string') {
            dataFromBackup = SuchDBEncryption.decrypt(dataFromBackup, suchdb.options.encrypt.key);
          }

          if (overwrite) {
            store = JSON.parse(dataFromBackup);
          } else {
            store = Object.assign(store, JSON.parse(dataFromBackup));
          }
        }
      } catch (error) {
        console.log(error);
      }
    }

    function __save() {
      try {
        let dataToSave = store || JSON.stringify({ error: 'SuchDB Data Save Error!' });

        if (suchdb.options.encrypt.enabled && typeof suchdb.options.encrypt.key == 'string') {
          dataToSave = SuchDBEncryption.encrypt(JSON.stringify(dataToSave), suchdb.options.encrypt.key);
        }

        if (suchdb.isNode) {
          suchdb.nodeDriver.fs.writeFileSync(`${suchdb.options.master}.suchdb`, dataToSave);
        } else {
          localStorage.setItem(suchdb.options.master, JSON.stringify(dataToSave));
        }

        __backup(dataToSave);
      } catch (error) {
        console.log(error);
      }
    }

    function __load(overwrite) {
      try {
        overwrite = overwrite || false;

        let dataToLoad = "";

        if (suchdb.isNode) {
          dataToLoad = suchdb.nodeDriver.fs.readFileSync(`${suchdb.options.master}.suchdb`) || "";

          if (suchdb.options.encrypt.enabled && typeof suchdb.options.encrypt.key == 'string') {
            dataToLoad = SuchDBEncryption.decrypt(dataToLoad, suchdb.options.encrypt.key);
          }

          if (overwrite) {
            store = JSON.parse(dataToLoad);
          } else {
            store = Object.assign(store, JSON.parse(dataToLoad));
          }
        } else {
          dataToLoad = localStorage.getItem(suchdb.options.master) || "";

          if (suchdb.options.encrypt.enabled && typeof suchdb.options.encrypt.key == 'string') {
            dataToLoad = SuchDBEncryption.decrypt(dataToLoad, suchdb.options.encrypt.key);
          }

          if (overwrite) {
            store = JSON.parse(dataToLoad);
          } else {
            store = Object.assign(store, JSON.parse(dataToLoad));
          }
        }

        _save();
      } catch (error) {
        console.log(error);
      }
    }

    function _save() {
      if (suchdb.options.autosave) {
        __save();
      }
    }

    function Init() {
      if (suchdb.options.autoload) {
        __load(true);
      }
    }

    // Base Functions:

    /**
    * Set/Add Data To The Database
    *
    * @param {string} key
    * @param {any} value
    */

    suchdb.set = function(key, value) {
      if (typeof key === 'string' && value) {
        store[key] = JSON.stringify(value);
      }
      _save();
    }

    /**
    * Get/Grab Data From The Database
    *
    * @param {string} key
    */

    suchdb.get = function(key) {
      if (typeof key === 'string') {
        let getdata = typeof store[key] !== "undefined" ? store[key] : (store[key] = JSON.stringify("ERROR, Date Not Found!"));
        return JSON.parse(getdata) || { error: 'Data Fetch Failed!' };
      }
    }

    /**
    * Remove/Delete Data From The Database
    *
    * @param {string} key
    */

    suchdb.remove = function(key) {
      if (typeof key === 'string') {
        delete store[key];
      }
      _save();
    }

    /**
    * Clear/Delete All Data In The Database
    */

    suchdb.clear = function() {
      store = {};
      _save();
    }

    /**
    * Get Database Keys
    */

    suchdb.keys = function() {
      return Object.keys(store);
    }

    /**
    * Get Database Values
    */

    suchdb.values = function() {
      return Object.values(store);
    }

    /**
    * Get Database Entries
    */

    suchdb.entries = function() {
      return Object.entries(store);
    }

    /**
    * Loop Through All Data In The Database
    *
    * @param {function} callback(key, value)
    */

    suchdb.forEach = function(callback) {
      for (var key in store) {
        if (store.hasOwnProperty(key)) {
          callback(key, store[key]);
        }
      }
    }

    /**
    * Get Database Size
    */

    suchdb.size = function() {
      return Object.keys(store).length;
    }

    /**
    * Check If Database Is Empty
    */

    suchdb.isEmpty = function() {
      return Object.keys(store).length == 0;
    }

    /**
    * Check If Database Has Data
    */

    suchdb.has = function(key) {
      return Object.hasOwnProperty(store, key);
    }

    /**
    * Lookup Data In The Database
    *
    * @param {any} value
    */

    suchdb.lookup = function(value) {
      return Object.values(store).includes(value)
    }

    /**
    * Sort the database
    *
    * @param {string} key
    * @param {boolean} reverse
    */

    suchdb.sort = function(key, reverse) {
      store = store.sort(function(such, db) {
        if (key) {
          if (reverse) {
            return such[key] - db[key];
          } else {
            return db[key] - such[key];
          }
        } else {
          if (reverse) {
            return such - db;
          } else {
            return db - such;
          }
        }
      });
      _save();
    }

    /**
    * Port Json To The Database
    * @param {any} json
    * @param {boolean} overwrite
    */

    suchdb.port = function(json, overwrite) {
      if (overwrite) {
        store = JSON.parse(json);
      } else {
        store = Object.assign(store, JSON.parse(json));
      }
      _save();
    }

    /**
    * Save Database To:
    * > localStorage
    * > node-fs
    */

    suchdb.save = function() {
      __save();
    }

    /**
    * Load Database From:
    * > localStorage
    * > node-fs
    */

    suchdb.load = function(overwrite) {
      __load(overwrite);
    }

    /**
    * Backup Database To:
    * > localStorage
    * > node-fs
    */

    suchdb.saveBackup = function() {
      __backup(store);
    }

    /**
    * Backup Database From:
    * > localStorage
    * > node-fs
    */

    suchdb.loadBackup = function(overwrite) {
      __loadBackup(overwrite);
    }

    /**
    * Get Raw Database Data
    */

    suchdb.raw = function() {
      return store || {};
    }

    /**
    * Find an entry
    */

    suchdb.find = function(query = {name : "", value : ""}) {
      suchdb.forEach((key, value) => {
        if(key[query.name] == query.value) return key;
      });

      return null;
    }

    // Main Functions:

    Init();

    return suchdb || null;
  }

  /**
  * SuchDB
  *
  * @param {Object} options
  */

  function Boot(options) {
    let isNode = false;

    if (typeof window === 'undefined') {
      isNode = true;
    }

    return SuchDBMaster(options, isNode);
  }

  var exports = exports || {};
  var module = module || {};

  exports.SuchDB = function SuchDB(options) {
    return Boot(options);
  };

  module.exports = {
    SuchDB: Boot
  };

})(typeof exports === 'undefined' ? this.SuchDB = {} : exports);

// SuchDB, Auhtor: Sectly (Sectly@sectly.online) | MPL-2.0 Licence.
