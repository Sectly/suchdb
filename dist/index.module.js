/**
* @sectly-studios/suchdb | 1.0.16 (Sun Dec 10 2023)
* An simple, dependency free, require &amp; go node.js and browser database
* Auhtor: Sectly (Sectly@sectly.online)
* Licence: MPL-2.0, This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. If a copy of the MPL was not distributed with this file, You can obtain one at https://mozilla.org/MPL/2.0/.
* NPM: https://www.npmjs.com/package/@sectly-studios/suchdb
*/
 
 
// Source:
!function(e){function t(e){var t=!1;return"undefined"==typeof window&&(t=!0),function(e,t){var n="V1.0.16",o={},a=[];function r(e,n){return t?n||null:e||null}function s(t,n){var o=t.name||!1,a=t.base||!1;return e&&"object"==typeof e&&Object.keys(e).length>0?a?("undefined"!==e[a]?e[a]:e[a]=null)?void 0!==e[a][o]?e[a][o]:e[a][o]=n:n:void 0!==e[o]?e[o]:e[o]=n:n}e=e||{},t=t||!1,o.options={master:s({name:"master",base:!1},r("suchdb_data","data")),autosave:s({name:"autosave",base:!1},r(!1,!0)),autoload:s({name:"autoload",base:!1},!1),encrypt:{enabled:s({name:"enabled",base:"encrypt"},r(!1,!0)),key:s({name:"key",base:"encrypt"},r("SuchDB","SuchDB_Key"))},autobackup:s({name:"autobackup",base:!1},!1),logging:s({name:"logging",base:!1},!1),logging_custom:s({name:"logging_custom",base:!1},function(){})},o.isNode=t||!1,o.generateSID=function(e){return Math.random().toString(36).substring(2,(e||8)+2)},o.isNode&&(o.nodeDriver={fs:require("fs")});var i={},c={encrypt:function(e,t){for(var n=[],o=t.length,a=0;a<e.length;a++){var r=a%o,s=e.charCodeAt(a)+t.charCodeAt(r);n.push(s)}return JSON.stringify(n)},decrypt:function(e,t){for(var n=[],o="",a=JSON.parse(e),r=t.length,s=0;s<a.length;s++){var i=a[s]-t.charCodeAt(s%r);n.push(i)}for(s=0;s<n.length;s++)o+=String.fromCharCode(n[s]);return o}};function u(e){try{a=a.filter(function(t){return""+t.id!=""+e})}catch(e){console.log(e)}}function p(e){try{a.forEach(function(t){if(t.event===e){try{e.callback()}catch(e){console.log(e)}t.once&&u(t.id)}})}catch(e){console.log(e)}}function l(e){try{o.options.logging&&(0!=o.options.logging_custom?o.options.logging_custom(e):console.log("[SuchDB "+n+" at "+(new Date).toTimeString()+"] "+e))}catch(e){console.log(e)}}function d(e){try{o.options.autobackup&&(e=e||JSON.stringify({error:"SuchDB Data Backup Error!"}),o.isNode?o.nodeDriver.fs.writeFileSync(o.options.master+".backup.suchdb",e):localStorage.setItem("backup_"+o.options.master,JSON.stringify(e))),l("Successfully backed up!")}catch(e){console.log(e)}}function f(){try{var e=i||JSON.stringify({error:"SuchDB Data Save Error!"});o.options.encrypt.enabled&&"string"==typeof o.options.encrypt.key&&(e=c.encrypt(JSON.stringify(e),o.options.encrypt.key)),o.isNode?o.nodeDriver.fs.writeFileSync(o.options.master+".suchdb",e):localStorage.setItem(o.options.master,JSON.stringify(e)),l("Successfully saved the database!"),d(e)}catch(e){console.log(e)}}function y(e){try{e=e||!1;var t="";o.isNode?(t=o.nodeDriver.fs.readFileSync(o.options.master+".suchdb")||"",o.options.encrypt.enabled&&"string"==typeof o.options.encrypt.key&&(t=c.decrypt(t,o.options.encrypt.key)),i=e?JSON.parse(t):Object.assign(i,JSON.parse(t))):(t=localStorage.getItem(o.options.master)||"",o.options.encrypt.enabled&&"string"==typeof o.options.encrypt.key&&(t=c.decrypt(t,o.options.encrypt.key)),i=e?JSON.parse(t):Object.assign(i,JSON.parse(t))),l("Successfully loaded the database!"),h()}catch(e){console.log(e)}}function h(){o.options.autosave&&f()}return o.set=function(e,t){"string"==typeof e&&t&&(i[e]=JSON.stringify(t),l("Updated "+e+" with "+t),p("set")),h()},o.get=function(e){if("string"==typeof e){var t=void 0!==i[e]?i[e]:i[e]=JSON.stringify("ERROR, Date Not Found!");return l("Fetching "+e+"..."),p("get"),JSON.parse(t)||{error:"Data Fetch Failed!"}}},o.remove=function(e){"string"==typeof e&&(delete i[e],l("Removed "+e+"."),p("remove")),h()},o.clear=function(){i={},l("Cleared "+key+"."),p("clear"),h()},o.keys=function(){return l("Fetching keys..."),p("keys"),Object.keys(i)},o.values=function(){return l("Fetching values..."),p("values"),Object.values(i)},o.entries=function(){return l("Fetching entries..."),p("entries"),Object.entries(i)},o.forEach=function(e){for(var t in l("Looping through the database..."),p("foreach"),i)i.hasOwnProperty(t)&&e(t,i[t])},o.size=function(){return l("The database size is "+Object.keys(i).length),p("size"),Object.keys(i).length},o.isEmpty=function(){return l("The database is empty: "+(0==Object.keys(i).length)),p("isempty"),0==Object.keys(i).length},o.has=function(e){return l("The database has data: "+Object.hasOwnProperty(i,e)),p("has"),Object.hasOwnProperty(i,e)},o.lookup=function(e){return l("Looking up "+e+"..."),p("lookup"),Object.values(i).includes(e)},o.sort=function(e,t){l("Sorting the database in "+e+" and in reverse: "+t),p("sort"),i=i.sort(function(n,o){return e?t?n[e]-o[e]:o[e]-n[e]:t?n-o:o-n}),h()},o.find=function(e){return void 0===e&&(e={name:"",value:""}),l("Finding an entry in the database with the query of "+e),p("find"),o.forEach(function(t,n){if(t[e.name]===e.value)return l("Found "+{key:t,value:n}),{key:t,value:n}}),null},o.findMultiple=function(e){void 0===e&&(e={name:"",value:""}),l("Finding multiple entries in the database with the query of "+e),p("findmultiple");var t=[];return o.forEach(function(n,o){n[e.name]===e.value&&(l("Found "+{key:n,value:o}),t.push({key:n,value:o}))}),l("Results: "+t),t},o.port=function(e,t){l("Porting database with "+e+" ovewrite: "+t),p("port"),i=t?JSON.parse(e):Object.assign(i,JSON.parse(e)),h()},o.save=function(){l("Saving the database..."),p("save"),f()},o.load=function(e){l("Loading the database..."),p("load"),y(e)},o.saveBackup=function(){l("Saving a backup of the database..."),p("savebackup"),d(i)},o.loadBackup=function(e){l("Loading a backup of the database overwrite: "+e),p("loadbackup"),function(e){try{if(o.options.autobackup){e=e||!1;var t="";t=o.isNode?o.nodeDriver.fs.readFileSync(o.options.master+".backup.suchdb")||"":localStorage.getItem("backup_"+o.options.master)||"",o.options.encrypt.enabled&&"string"==typeof o.options.encrypt.key&&(t=c.decrypt(t,o.options.encrypt.key)),i=e?JSON.parse(t):Object.assign(i,JSON.parse(t))}l("Successfully loaded a backup of the database!")}catch(e){console.log(e)}}(e)},o.snapshot=function(e){l("Creating a snapshot of the database..."),p("snapshot"),function(e){var t={master:e.master||"snapshot_"+(o.options.master||"suchdb"),decrypt:e.decrypt||!1,id:e.id||o.generateSID(48)};try{var n=i||{error:"SuchDB Data Snapshot Error!"};n.id=t.id||null,n=JSON.stringify(n)||"",!t.decrypt&&o.options.encrypt.enabled&&"string"==typeof o.options.encrypt.key&&(n=c.encrypt(n,o.options.encrypt.key)),o.isNode?o.nodeDriver.fs.writeFileSync(t.master+".snapshot.suchdb",n):localStorage.setItem("snapshot_"+t.master,JSON.stringify(n)),l("Successfully created snapshot!")}catch(e){console.log(e),p("error")}}(e)},o.loadSnapshot=function(e,t){l("Loading a snapshot to the database..."),p("loadsnapshot"),function(e,t){var n=e.master||"snapshot_"+(o.options.master||"suchdb"),a=e.decrypt||!1;e.id||o.generateSID(48);try{t=t||!1;var r="";r=o.isNode?o.nodeDriver.fs.readFileSync(n+".snapshot.suchdb")||"":localStorage.getItem("snapshot_"+n)||"",a&&o.options.encrypt.enabled&&"string"==typeof o.options.encrypt.key&&(r=c.decrypt(r,o.options.encrypt.key)),i=t?JSON.parse(r):Object.assign(i,JSON.parse(r))}catch(e){console.log(e),p("error")}}(e,t)},o.raw=function(){return l("Getting the database in a raw format (No encryption)"),p("raw"),i||{}},o.getEvents=function(){l("Fetching a list of events..."),(Object.keys(o)||{}).forEach(function(e){(""+e).toLowerCase()})},o.events=a,o.on=function(e,t){var n=(new Date).valueOf();return l("New on listener: "+n),a.push({event:""+e,id:""+n,callback:t,once:!1}),n},o.once=function(e,t){var n=(new Date).valueOf();return l("New once listener: "+n),a.push({event:""+e,id:""+n,callback:t,once:!0}),n},o.off=function(e){l("Removed listener: "+e),u(""+e)},l("Initializing..."),p("init"),o.options.autoload&&y(!0),o.set("SuchDB_Version",n),p("ready"),l("Initialized!"),o||null}(e,t)}var n=n||{};(e=e||{}).SuchDB=function(e){return t(e)},n.exports={SuchDB:t}}("undefined"==typeof exports?(void 0).SuchDB={}:exports);
//# sourceMappingURL=index.module.js.map
