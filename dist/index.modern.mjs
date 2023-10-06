/**
* @sectly-studios/suchdb | 1.0.15 (Fri Oct 06 2023)
* An simple, dependency free, require &amp; go node.js and browser database
* Auhtor: Sectly (Sectly@sectly.online)
* Licence: MPL-2.0, This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. If a copy of the MPL was not distributed with this file, You can obtain one at https://mozilla.org/MPL/2.0/.
* NPM: https://www.npmjs.com/package/@sectly-studios/suchdb
*/
 
 
// Source:
!function(e){function t(e){let t=!1;return"undefined"==typeof window&&(t=!0),function(e,t){const n="V1.0.15",o={};let a=[];function s(e,n){return t?n||null:e||null}function i(t,n){const o=t.name||!1,a=t.base||!1;return e&&"object"==typeof e&&Object.keys(e).length>0?a?("undefined"!==e[a]?e[a]:e[a]=null)?void 0!==e[a][o]?e[a][o]:e[a][o]=n:n:void 0!==e[o]?e[o]:e[o]=n:n}e=e||{},t=t||!1,o.options={master:i({name:"master",base:!1},s("suchdb_data","data")),autosave:i({name:"autosave",base:!1},s(!1,!0)),autoload:i({name:"autoload",base:!1},s(!1,!1)),encrypt:{enabled:i({name:"enabled",base:"encrypt"},s(!1,!0)),key:i({name:"key",base:"encrypt"},s("SuchDB","SuchDB_Key"))},autobackup:i({name:"autobackup",base:!1},s(!1,!1)),logging:i({name:"logging",base:!1},s(!1,!1)),logging_custom:i({name:"logging_custom",base:!1},s(!1,!1))},o.isNode=t||!1,o.isNode&&(o.nodeDriver={fs:require("fs")});let r={};const c={encrypt:function(e,t){const n=[],o=t.length;for(let a=0;a<e.length;a++){const s=a%o,i=e.charCodeAt(a)+t.charCodeAt(s);n.push(i)}return JSON.stringify(n)},decrypt:function(e,t){const n=[];let o="";const a=JSON.parse(e),s=t.length;for(var i=0;i<a.length;i++){const e=a[i]-t.charCodeAt(i%s);n.push(e)}for(i=0;i<n.length;i++)o+=String.fromCharCode(n[i]);return o}};function u(e){try{a=a.filter(t=>`${t.id}`!=`${e}`)}catch(e){console.log(e)}}function l(e){try{a.forEach(function(t){if(t.event===e){try{e.callback()}catch(e){console.log(e)}t.once&&u(t.id)}})}catch(e){console.log(e)}}function p(e){try{o.options.logging&&(0!=o.options.logging_custom?o.options.logging_custom(e):console.log(`[SuchDB ${n} at ${(new Date).toTimeString()}] ${e}`))}catch(e){console.log(e)}}function f(e){try{o.options.autobackup&&(e=e||JSON.stringify({error:"SuchDB Data Backup Error!"}),o.isNode?o.nodeDriver.fs.writeFileSync(`${o.options.master}.backup.suchdb`,e):localStorage.setItem(`backup_${o.options.master}`,JSON.stringify(e))),p("Successfully backed up!")}catch(e){console.log(e)}}function d(){try{let e=r||JSON.stringify({error:"SuchDB Data Save Error!"});o.options.encrypt.enabled&&"string"==typeof o.options.encrypt.key&&(e=c.encrypt(JSON.stringify(e),o.options.encrypt.key)),o.isNode?o.nodeDriver.fs.writeFileSync(`${o.options.master}.suchdb`,e):localStorage.setItem(o.options.master,JSON.stringify(e)),p("Successfully saved the database!"),f(e)}catch(e){console.log(e)}}function y(e){try{e=e||!1;let t="";o.isNode?(t=o.nodeDriver.fs.readFileSync(`${o.options.master}.suchdb`)||"",o.options.encrypt.enabled&&"string"==typeof o.options.encrypt.key&&(t=c.decrypt(t,o.options.encrypt.key)),r=e?JSON.parse(t):Object.assign(r,JSON.parse(t))):(t=localStorage.getItem(o.options.master)||"",o.options.encrypt.enabled&&"string"==typeof o.options.encrypt.key&&(t=c.decrypt(t,o.options.encrypt.key)),r=e?JSON.parse(t):Object.assign(r,JSON.parse(t))),p("Successfully loaded the database!"),g()}catch(e){console.log(e)}}function g(){o.options.autosave&&d()}return o.set=function(e,t){"string"==typeof e&&t&&(r[e]=JSON.stringify(t),p(`Updated ${e} with ${t}`),l("set")),g()},o.get=function(e){if("string"==typeof e){const t=void 0!==r[e]?r[e]:r[e]=JSON.stringify("ERROR, Date Not Found!");return p(`Fetching ${e}...`),l("get"),JSON.parse(t)||{error:"Data Fetch Failed!"}}},o.remove=function(e){"string"==typeof e&&(delete r[e],p(`Removed ${e}.`),l("remove")),g()},o.clear=function(){r={},p(`Cleared ${key}.`),l("clear"),g()},o.keys=function(){return p("Fetching keys..."),l("keys"),Object.keys(r)},o.values=function(){return p("Fetching values..."),l("values"),Object.values(r)},o.entries=function(){return p("Fetching entries..."),l("entries"),Object.entries(r)},o.forEach=function(e){p("Looping through the database..."),l("foreach");for(const t in r)r.hasOwnProperty(t)&&e(t,r[t])},o.size=function(){return p(`The database size is ${Object.keys(r).length}`),l("size"),Object.keys(r).length},o.isEmpty=function(){return p(`The database is empty: ${0==Object.keys(r).length}`),l("isempty"),0==Object.keys(r).length},o.has=function(e){return p(`The database has data: ${Object.hasOwnProperty(r,e)}`),l("has"),Object.hasOwnProperty(r,e)},o.lookup=function(e){return p(`Looking up ${e}...`),l("lookup"),Object.values(r).includes(e)},o.sort=function(e,t){p(`Sorting the database in ${e} and in reverse: ${t}`),l("sort"),r=r.sort(function(n,o){return e?t?n[e]-o[e]:o[e]-n[e]:t?n-o:o-n}),g()},o.find=function(e={name:"",value:""}){return p(`Finding an entry in the database with the query of ${e}`),l("find"),o.forEach((t,n)=>{if(t[e.name]===e.value)return p(`Found ${{key:t,value:n}}`),{key:t,value:n}}),null},o.findMultiple=function(e={name:"",value:""}){p(`Finding multiple entries in the database with the query of ${e}`),l("findmultiple");const t=[];return o.forEach((n,o)=>{n[e.name]===e.value&&(p(`Found ${{key:n,value:o}}`),t.push({key:n,value:o}))}),p(`Results: ${t}`),t},o.port=function(e,t){p(`Porting database with ${e} ovewrite: ${t}`),l("port"),r=t?JSON.parse(e):Object.assign(r,JSON.parse(e)),g()},o.save=function(){p("Saving the database..."),l("save"),d()},o.load=function(e){p("Loading the database..."),l("load"),y(e)},o.saveBackup=function(){p("Saving a backup of the database..."),l("savebackup"),f(r)},o.loadBackup=function(e){p(`Loading a backup of the database overwrite: ${e}`),l("loadbackup"),function(e){try{if(o.options.autobackup){e=e||!1;let t="";t=o.isNode?o.nodeDriver.fs.readFileSync(`${o.options.master}.backup.suchdb`)||"":localStorage.getItem(`backup_${o.options.master}`)||"",o.options.encrypt.enabled&&"string"==typeof o.options.encrypt.key&&(t=c.decrypt(t,o.options.encrypt.key)),r=e?JSON.parse(t):Object.assign(r,JSON.parse(t))}p("Successfully loaded a backup of the database!")}catch(e){console.log(e)}}(e)},o.raw=function(){return p("Getting the database in a raw format (No encryption)"),l("raw"),r||{}},o.getEvents=function(){p("Fetching a list of events..."),(Object.keys(o)||{}).forEach(function(e){})},o.events=a,o.on=function(e,t){const n=(new Date).valueOf();return p(`New on listener: ${n}`),a.push({event:`${e}`,id:`${n}`,callback:t,once:!1}),n},o.once=function(e,t){const n=(new Date).valueOf();return p(`New once listener: ${n}`),a.push({event:`${e}`,id:`${n}`,callback:t,once:!0}),n},o.off=function(e){p(`Removed listener: ${e}`),u(`${e}`)},p("Initializing..."),l("init"),o.options.autoload&&y(!0),o.set("SuchDB_Version",n),l("ready"),p("Initialized!"),o||null}(e,t)}var n=n||{};(e=e||{}).SuchDB=function(e){return t(e)},n.exports={SuchDB:t}}("undefined"==typeof exports?(void 0).SuchDB={}:exports);
//# sourceMappingURL=index.modern.mjs.map
