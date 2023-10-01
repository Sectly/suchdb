/**
* @sectly-studios/suchdb | 1.0.14 (Sun Oct 01 2023)
* An simple, dependency free, require &amp; go node.js and browser database
* Auhtor: Sectly (Sectly@sectly.online)
* Licence: MPL-2.0, This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. If a copy of the MPL was not distributed with this file, You can obtain one at https://mozilla.org/MPL/2.0/.
* NPM: https://www.npmjs.com/package/@sectly-studios/suchdb
*/
 
 
// Source:
!function(e){"function"==typeof define&&define.amd?define(e):e()}(function(){!function(e){function t(e){var t=!1;return"undefined"==typeof window&&(t=!0),function(e,t){var n="V1.0.14",o={},a=[];function r(e,n){return t?n||null:e||null}function i(t,n){var o=t.name||!1,a=t.base||!1;return e&&"object"==typeof e&&Object.keys(e).length>0?a?("undefined"!==e[a]?e[a]:e[a]=null)?void 0!==e[a][o]?e[a][o]:e[a][o]=n:n:void 0!==e[o]?e[o]:e[o]=n:n}e=e||{},t=t||!1,o.options={master:i({name:"master",base:!1},r("suchdb_data","data")),autosave:i({name:"autosave",base:!1},r(!1,!0)),autoload:i({name:"autoload",base:!1},r(!1,!1)),encrypt:{enabled:i({name:"enabled",base:"encrypt"},r(!1,!0)),key:i({name:"key",base:"encrypt"},r("SuchDB","SuchDB_Key"))},autobackup:i({name:"autobackup",base:!1},r(!1,!1)),logging:i({name:"logging",base:!1},r(!1,!1)),logging_custom:i({name:"logging_custom",base:!1},r(!1,!1))},o.isNode=t||!1,o.isNode&&(o.nodeDriver={fs:require("fs")});var s={},c={encrypt:function(e,t){for(var n=[],o=t.length,a=0;a<e.length;a++){var r=a%o,i=e.charCodeAt(a)+t.charCodeAt(r);n.push(i)}return JSON.stringify(n)},decrypt:function(e,t){for(var n=[],o="",a=JSON.parse(e),r=t.length,i=0;i<a.length;i++){var s=a[i]-t.charCodeAt(i%r);n.push(s)}for(i=0;i<n.length;i++)o+=String.fromCharCode(n[i]);return o}};function u(e){try{a=a.filter(function(t){return""+t.id!=""+e})}catch(e){console.log(e)}}function l(e){try{a.forEach(function(t){if(t.event===e){try{e.callback()}catch(e){console.log(e)}t.once&&u(t.id)}})}catch(e){console.log(e)}}function f(e){try{o.options.logging&&(0!=o.options.logging_custom?o.options.logging_custom(e):console.log("[SuchDB "+n+" at "+(new Date).toTimeString()+"] "+e))}catch(e){console.log(e)}}function p(e){try{o.options.autobackup&&(e=e||JSON.stringify({error:"SuchDB Data Backup Error!"}),o.isNode?o.nodeDriver.fs.writeFileSync(o.options.master+".backup.suchdb",e):localStorage.setItem("backup_"+o.options.master,JSON.stringify(e))),f("Successfully backed up!")}catch(e){console.log(e)}}function d(){try{var e=s||JSON.stringify({error:"SuchDB Data Save Error!"});o.options.encrypt.enabled&&"string"==typeof o.options.encrypt.key&&(e=c.encrypt(JSON.stringify(e),o.options.encrypt.key)),o.isNode?o.nodeDriver.fs.writeFileSync(o.options.master+".suchdb",e):localStorage.setItem(o.options.master,JSON.stringify(e)),f("Successfully saved the database!"),p(e)}catch(e){console.log(e)}}function y(e){try{e=e||!1;var t="";o.isNode?(t=o.nodeDriver.fs.readFileSync(o.options.master+".suchdb")||"",o.options.encrypt.enabled&&"string"==typeof o.options.encrypt.key&&(t=c.decrypt(t,o.options.encrypt.key)),s=e?JSON.parse(t):Object.assign(s,JSON.parse(t))):(t=localStorage.getItem(o.options.master)||"",o.options.encrypt.enabled&&"string"==typeof o.options.encrypt.key&&(t=c.decrypt(t,o.options.encrypt.key)),s=e?JSON.parse(t):Object.assign(s,JSON.parse(t))),f("Successfully loaded the database!"),g()}catch(e){console.log(e)}}function g(){o.options.autosave&&d()}return o.set=function(e,t){"string"==typeof e&&t&&(s[e]=JSON.stringify(t),f("Updated "+e+" with "+t),l("set")),g()},o.get=function(e){if("string"==typeof e){var t=void 0!==s[e]?s[e]:s[e]=JSON.stringify("ERROR, Date Not Found!");return f("Fetching "+e+"..."),l("get"),JSON.parse(t)||{error:"Data Fetch Failed!"}}},o.remove=function(e){"string"==typeof e&&(delete s[e],f("Removed "+e+"."),l("remove")),g()},o.clear=function(){s={},f("Cleared "+key+"."),l("clear"),g()},o.keys=function(){return f("Fetching keys..."),l("keys"),Object.keys(s)},o.values=function(){return f("Fetching values..."),l("values"),Object.values(s)},o.entries=function(){return f("Fetching entries..."),l("entries"),Object.entries(s)},o.forEach=function(e){for(var t in f("Looping through the database..."),l("foreach"),s)s.hasOwnProperty(t)&&e(t,s[t])},o.size=function(){return f("The database size is "+Object.keys(s).length),l("size"),Object.keys(s).length},o.isEmpty=function(){return f("The database is empty: "+(0==Object.keys(s).length)),l("isempty"),0==Object.keys(s).length},o.has=function(e){return f("The database has data: "+Object.hasOwnProperty(s,e)),l("has"),Object.hasOwnProperty(s,e)},o.lookup=function(e){return f("Looking up "+e+"..."),l("lookup"),Object.values(s).includes(e)},o.sort=function(e,t){f("Sorting the database in "+e+" and in reverse: "+t),l("sort"),s=s.sort(function(n,o){return e?t?n[e]-o[e]:o[e]-n[e]:t?n-o:o-n}),g()},o.find=function(e){return void 0===e&&(e={name:"",value:""}),f("Finding an entry in the database with the query of "+e),l("find"),o.forEach(function(t,n){if(t[e.name]===e.value)return f("Found "+{key:t,value:n}),{key:t,value:n}}),null},o.findMultiple=function(e){void 0===e&&(e={name:"",value:""}),f("Finding multiple entries in the database with the query of "+e),l("findmultiple");var t=[];return o.forEach(function(n,o){n[e.name]===e.value&&(f("Found "+{key:n,value:o}),t.push({key:n,value:o}))}),f("Results: "+t),t},o.port=function(e,t){f("Porting database with "+e+" ovewrite: "+t),l("port"),s=t?JSON.parse(e):Object.assign(s,JSON.parse(e)),g()},o.save=function(){f("Saving the database..."),l("save"),d()},o.load=function(e){f("Loading the database..."),l("load"),y(e)},o.saveBackup=function(){f("Saving a backup of the database..."),l("savebackup"),p(s)},o.loadBackup=function(e){f("Loading a backup of the database overwrite: "+e),l("loadbackup"),function(e){try{if(o.options.autobackup){e=e||!1;var t="";t=o.isNode?o.nodeDriver.fs.readFileSync(o.options.master+".backup.suchdb")||"":localStorage.getItem("backup_"+o.options.master)||"",o.options.encrypt.enabled&&"string"==typeof o.options.encrypt.key&&(t=c.decrypt(t,o.options.encrypt.key)),s=e?JSON.parse(t):Object.assign(s,JSON.parse(t))}f("Successfully loaded a backup of the database!")}catch(e){console.log(e)}}(e)},o.raw=function(){return f("Getting the database in a raw format (No encryption)"),l("raw"),s||{}},o.getEvents=function(){f("Fetching a list of events..."),(Object.keys(o)||{}).forEach(function(e){(""+e).toLowerCase()})},o.events=a,o.on=function(e,t){var n=(new Date).valueOf();return f("New on listener: "+n),a.push({event:""+e,id:""+n,callback:t,once:!1}),n},o.once=function(e,t){var n=(new Date).valueOf();return f("New once listener: "+n),a.push({event:""+e,id:""+n,callback:t,once:!0}),n},o.off=function(e){f("Removed listener: "+e),u(""+e)},f("Initializing..."),l("init"),o.options.autoload&&y(!0),o.set("SuchDB_Version",n),l("ready"),f("Initialized!"),o||null}(e,t)}var n=n||{};(e=e||{}).SuchDB=function(e){return t(e)},n.exports={SuchDB:t}}("undefined"==typeof exports?(void 0).SuchDB={}:exports)});
//# sourceMappingURL=index.umd.js.map
