# SuchDB: An simple, dependency free, require & go node.js and browser database

### Install: `npm i @sectly-studios/suchdb` | (https://www.npmjs.com/package/@sectly-studios/suchdb)

## Quick Start:

```js
let SuchDB = require("@sectly-studios/suchdb");

let database = new SuchDB.SuchDB({}); // Make an new database instance

database.set("foo", "bar") // Lets add some data

database.get("foo") // Lets grab the data, It should return: bar

database.set("foo", { bar: [1, 2, 3, 4], baz: { name: "SuchDB" } }) // SuchDB Supports: Strings, Numbers, Objects And Arrays As Values

database.get("foo") // { bar: [1, 2, 3, 4], baz: { name: "SuchDB" } })

database.get("foo").bar // [1, 2, 3, 4]

database.get("foo").bar[0] // 1

database.get("foo").baz // { name: "SuchDB" }

database.get("foo").baz["name"] // SuchDB
```

## Docs:

### Table of Contents

*   [exports][1]
*   [set][2]
    *   [Parameters][3]
*   [get][4]
    *   [Parameters][5]
*   [remove][6]
    *   [Parameters][7]
*   [clear][8]
*   [keys][9]
*   [values][10]
*   [entries][11]
*   [forEach][12]
    *   [Parameters][13]
*   [size][14]
*   [isEmpty][15]
*   [has][16]
    *   [Parameters][17]
*   [lookup][18]
    *   [Parameters][19]
*   [sort][20]
    *   [Parameters][21]
*   [save][22]
*   [load][23]
*   [raw][24]
*   [Boot][25]
    *   [Parameters][26]

## exports

Browser:

Load in file with:
```html
<script src="path/to/suchdb"></script>
```

```js
let database = SuchDB.SuchDB();
```

Node.js:

```js
let SuchDB = require("@sectly-studios/suchdb");

let database = new SuchDB.SuchDB();
```

## set

Set/Add Data To The Database

### Parameters

*   `key` **[string][30]**&#x20;
*   `value` **any**&#x20;

```js
database.get(key, value)
```

## get

Get/Grab Data From The Database

### Parameters

*   `key` **[string][30]**&#x20;

```js
database.get(key) // Returns data
```

## remove

Remove/Delete Data From The Database

### Parameters

*   `key` **[string][30]**&#x20;

```js
database.remove(key)
```

## clear

Clear/Delete All Data In The Database

```js
database.clear()
```

## keys

Get Database Keys

```js
database.keys() // Returns keys
```

## values

Get Database Values

```js
database.values() // Returns values
```

## entries

Get Database Entries

```js
database.entries() // Returns object
```

## forEach

Loop Through All Data In The Database

### Parameters

*   `callback` **[function][31]** (key, value)

```js
database.forEach(function(key, value) {
    // Retuns key and value
})
```

## size

Get Database Size

```js
database.size() // Returns number
```

## isEmpty

Check If Database Is Empty

```js
database.isEmpty() // Returns boolean
```

## has

Check If Database Has Data

### Parameters

*   `key` &#x20;

```js
database.has(key) // Returns boolean
```

## lookup

Lookup Data In The Database

### Parameters

*   `value` **any**&#x20;

```js
database.lookup(value) // Returns data
```

## sort

Sort the database

### Parameters

*   `key` **[string][30]**&#x20;
*   `reverse` **[boolean][32]**&#x20;

```js
database.sort(key, reverse)
```

## save

Save Database To:

> localStorage
> node-fs

```js
database.save()
```

## load

Load Database From:

> localStorage
> node-fs

```js
let overwrite = false;

database.load(overwrite)
```

## raw

Get Raw Database Data

```js
database.raw() // Returns object
```

## Boot

SuchDB

```js
let options = {
  master: "data",
  autosave: true,
  autoload: false,
  encrypt: {
    enabled: true,
    key: "SuchDB_Key",
  },
};

let database = new SuchDB.SuchDB(options);

let SuchDB = require("@sectly-studios/suchdb");
```

### Parameters

*   `options` **[Object][33]**&#x20;
*

```js 
var options = {
   master: "data",
   autosave: true,
   autoload: false,
   encrypt: {
     enabled: true,
     key: "SuchDB_Key",
   },
};
```

[1]: #exports

[2]: #set

[3]: #parameters

[4]: #get

[5]: #parameters-1

[6]: #remove

[7]: #parameters-2

[8]: #clear

[9]: #keys

[10]: #values

[11]: #entries

[12]: #foreach

[13]: #parameters-3

[14]: #size

[15]: #isempty

[16]: #has

[17]: #parameters-4

[18]: #lookup

[19]: #parameters-5

[20]: #sort

[21]: #parameters-6

[22]: #save

[23]: #load

[24]: #raw

[25]: #boot

[26]: #parameters-7

[27]: mailto:Sectly@sectly.online

[28]: https://www.mozilla.org/en-US/MPL/2.0/

[29]: https://www.mozilla.org/en-US/MPL/2.0/FAQ

[30]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String

[31]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function

[32]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean

[33]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object
