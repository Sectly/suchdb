/**
* @sectly-studios/suchdb | 1.0.14 (Sun Oct 01 2023)
* An simple, dependency free, require &amp; go node.js and browser database
* Auhtor: Sectly (Sectly@sectly.online)
* Licence: MPL-2.0, This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. If a copy of the MPL was not distributed with this file, You can obtain one at https://mozilla.org/MPL/2.0/.
* NPM: https://www.npmjs.com/package/@sectly-studios/suchdb
*/


// Source:
(function (exports) {

  "use strict";

  function SuchDBMaster(options, isNode) {
    const version = "V1.0.14";
    let suchdb = {};
    let events = [];

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
      logging: getoption({ name: "logging", base: false }, nodeify(false, false)),
      logging_custom: getoption({ name: "logging_custom", base: false }, nodeify(false, false))
    };

    suchdb.isNode = isNode || false;

    if (suchdb.isNode) {
      suchdb.nodeDriver = {
        fs: require("fs"),
      }
    }

    var store = {};

    var SuchDBEncryption = {
      encrypt: function (content, key) {
        var result = [];
        var keyLen = key.length;
        for (var i = 0; i < content.length; i++) {
          var keyOffset = i % keyLen;
          var calAscii = (content.charCodeAt(i) + key.charCodeAt(keyOffset));
          result.push(calAscii);
        }
        return JSON.stringify(result);
      },

      decrypt: function (content, key) {
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

    function __removeEvent(id) {
      try {
        events = events.filter((element) => `${element.id}` !== `${id}`);
      } catch (error) {
        console.log(error);
      }
    }

    function __emit(event) {
      try {
        events.forEach(function (data) {
          if (data.event === event) {
            try {
              event.callback();
            } catch (error) {
              console.log(error);
            }

            if (data.once) {
              __removeEvent(data.id);
            }
          }
        });
      } catch (error) {
        console.log(error);
      }
    }

    function __log(message) {
      try {
        if (suchdb.options.logging) {
          if (suchdb.options.logging_custom != false) {
            suchdb.options.logging_custom(message);
          } else {
            console.log(`[SuchDB ${version} at ${new Date().toTimeString()}] ${message}`);
          }
        }
      } catch (error) {
        console.log(error);
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
        __log("Successfully backed up!");
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
        __log("Successfully loaded a backup of the database!");
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

        __log("Successfully saved the database!");

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

        __log("Successfully loaded the database!");

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
      __log("Initializing...");
      __emit("init");
      if (suchdb.options.autoload) {
        __load(true);
      }
      suchdb.set("SuchDB_Version", version);
      __emit("ready");
      __log("Initialized!");
    }

    // Base Functions:

    /**
    * Set/Add Data To The Database
    *
    * @param {string} key
    * @param {any} value
    */

    suchdb.set = function (key, value) {
      if (typeof key === 'string' && value) {
        store[key] = JSON.stringify(value);
        __log(`Updated ${key} with ${value}`);
        __emit("set");
      }
      _save();
    }

    /**
    * Get/Grab Data From The Database
    *
    * @param {string} key
    */

    suchdb.get = function (key) {
      if (typeof key === 'string') {
        let getdata = typeof store[key] !== "undefined" ? store[key] : (store[key] = JSON.stringify("ERROR, Date Not Found!"));
        __log(`Fetching ${key}...`);
        __emit("get");
        return JSON.parse(getdata) || { error: 'Data Fetch Failed!' };
      }
    }

    /**
    * Remove/Delete Data From The Database
    *
    * @param {string} key
    */

    suchdb.remove = function (key) {
      if (typeof key === 'string') {
        delete store[key];
        __log(`Removed ${key}.`);
        __emit("remove");
      }
      _save();
    }

    /**
    * Clear/Delete All Data In The Database
    */

    suchdb.clear = function () {
      store = {};
      __log(`Cleared ${key}.`);
      __emit("clear");
      _save();
    }

    /**
    * Get Database Keys
    */

    suchdb.keys = function () {
      __log(`Fetching keys...`);
      __emit("keys");
      return Object.keys(store);
    }

    /**
    * Get Database Values
    */

    suchdb.values = function () {
      __log(`Fetching values...`);
      __emit("values");
      return Object.values(store);
    }

    /**
    * Get Database Entries
    */

    suchdb.entries = function () {
      __log(`Fetching entries...`);
      __emit("entries");
      return Object.entries(store);
    }

    /**
    * Loop Through All Data In The Database
    *
    * @param {function} callback(key, value)
    */

    suchdb.forEach = function (callback) {
      __log(`Looping through the database...`);
      __emit("foreach");
      for (var key in store) {
        if (store.hasOwnProperty(key)) {
          callback(key, store[key]);
        }
      }
    }

    /**
    * Get Database Size
    */

    suchdb.size = function () {
      __log(`The database size is ${Object.keys(store).length}`);
      __emit("size");
      return Object.keys(store).length;
    }

    /**
    * Check If Database Is Empty
    */

    suchdb.isEmpty = function () {
      __log(`The database is empty: ${Object.keys(store).length == 0}`);
      __emit("isempty");
      return Object.keys(store).length == 0;
    }

    /**
    * Check If Database Has Data
    */

    suchdb.has = function (key) {
      __log(`The database has data: ${Object.hasOwnProperty(store, key)}`);
      __emit("has");
      return Object.hasOwnProperty(store, key);
    }

    /**
    * Lookup Data In The Database
    *
    * @param {any} value
    */

    suchdb.lookup = function (value) {
      __log(`Looking up ${value}...`);
      __emit("lookup");
      return Object.values(store).includes(value)
    }

    /**
    * Sort the database
    *
    * @param {string} key
    * @param {boolean} reverse
    */

    suchdb.sort = function (key, reverse) {
      __log(`Sorting the database in ${key} and in reverse: ${reverse}`);
      __emit("sort");
      store = store.sort(function (such, db) {
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
    * Find An Entry
    * @param {any} query
    */

    suchdb.find = function (query = { name: "", value: "" }) {
      __log(`Finding an entry in the database with the query of ${query}`);
      __emit("find");
      suchdb.forEach((key, value) => {
        if (key[query.name] === query.value) {
          __log(`Found ${{ key: key, value: value }}`);
          return { key: key, value: value };
        }
      });

      return null;
    }

    suchdb.findMultiple = function (query = { name: "", value: "" }) {
      __log(`Finding multiple entries in the database with the query of ${query}`);
      __emit("findmultiple");
      var results = [];
      suchdb.forEach((key, value) => {
        if (key[query.name] === query.value) {
          __log(`Found ${{ key: key, value: value }}`);
          results.push({ key: key, value: value });
        }
      });

      __log(`Results: ${results}`);

      return results;
    }

    /**
    * Port Json To The Database
    * @param {any} json
    * @param {boolean} overwrite
    */

    suchdb.port = function (json, overwrite) {
      __log(`Porting database with ${json} ovewrite: ${overwrite}`);
      __emit("port");
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

    suchdb.save = function () {
      __log("Saving the database...");
      __emit("save");
      __save();
    }

    /**
    * Load Database From:
    * > localStorage
    * > node-fs
    */

    suchdb.load = function (overwrite) {
      __log("Loading the database...");
      __emit("load");
      __load(overwrite);
    }

    /**
    * Backup Database To:
    * > localStorage
    * > node-fs
    */

    suchdb.saveBackup = function () {
      __log("Saving a backup of the database...");
      __emit("savebackup");
      __backup(store);
    }

    /**
    * Backup Database From:
    * > localStorage
    * > node-fs
    */

    suchdb.loadBackup = function (overwrite) {
      __log(`Loading a backup of the database overwrite: ${overwrite}`);
      __emit("loadbackup");
      __loadBackup(overwrite);
    }

    /**
    * Get Raw Database Data
    */

    suchdb.raw = function () {
      __log("Getting the database in a raw format (No encryption)");
      __emit("raw");
      return store || {};
    }

    /**
    * Get A List Of Database Events
    */

    suchdb.getEvents = function () {
      __log(`Fetching a list of events...`);

      let eventList = []
      let suchdbKeys = Object.keys(suchdb) || {};

      suchdbKeys.forEach(function(key) {
        let eventName = `${key}`.toLowerCase();

        eventList.push(eventName);
      })
    }

    /**
    * Get Database Events
    */

    suchdb.events = events;

    /**
    * Create an new on event listener
    */

    suchdb.on = function (event, callback) {
      let id = new Date().valueOf();

      __log(`New on listener: ${id}`);

      events.push({ event: `${event}`, id: `${id}`, callback: callback, once: false });

      return id;
    }

    /**
    * Create an new once event listener
    */

    suchdb.once = function (event, callback) {
      let id = new Date().valueOf();

      __log(`New once listener: ${id}`);

      events.push({ event: `${event}`, id: `${id}`, callback: callback, once: true });

      return id;
    }

    /**
    * Delete an on/once event listener
    */

    suchdb.off = function (id) {
      __log(`Removed listener: ${id}`);
      __removeEvent(`${id}`);
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
