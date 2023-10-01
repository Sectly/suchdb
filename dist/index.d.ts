/// <reference types="node" />
export function SuchDB(options: any): {
    options: {
        master: any;
        autosave: any;
        autoload: any;
        encrypt: {
            enabled: any;
            key: any;
        };
        autobackup: any;
        logging: any;
        logging_custom: any;
    };
    isNode: any;
    nodeDriver: {
        fs: typeof import("fs");
    };
    /**
    * Set/Add Data To The Database
    *
    * @param {string} key
    * @param {any} value
    */
    set(key: string, value: any): void;
    /**
    * Get/Grab Data From The Database
    *
    * @param {string} key
    */
    get(key: string): any;
    /**
    * Remove/Delete Data From The Database
    *
    * @param {string} key
    */
    remove(key: string): void;
    /**
    * Clear/Delete All Data In The Database
    */
    clear(): void;
    /**
    * Get Database Keys
    */
    keys(): string[];
    /**
    * Get Database Values
    */
    values(): any[];
    /**
    * Get Database Entries
    */
    entries(): [string, any][];
    /**
    * Loop Through All Data In The Database
    *
    * @param {function} callback(key, value)
    */
    forEach(callback: Function): void;
    /**
    * Get Database Size
    */
    size(): number;
    /**
    * Check If Database Is Empty
    */
    isEmpty(): boolean;
    /**
    * Check If Database Has Data
    */
    has(key: any): boolean;
    /**
    * Lookup Data In The Database
    *
    * @param {any} value
    */
    lookup(value: any): boolean;
    /**
    * Sort the database
    *
    * @param {string} key
    * @param {boolean} reverse
    */
    sort(key: string, reverse: boolean): void;
    /**
    * Find An Entry
    * @param {any} query
    */
    find(query?: any): any;
    findMultiple(query?: {
        name: string;
        value: string;
    }): any[];
    /**
    * Port Json To The Database
    * @param {any} json
    * @param {boolean} overwrite
    */
    port(json: any, overwrite: boolean): void;
    /**
    * Save Database To:
    * > localStorage
    * > node-fs
    */
    save(): void;
    /**
    * Load Database From:
    * > localStorage
    * > node-fs
    */
    load(overwrite: any): void;
    /**
    * Backup Database To:
    * > localStorage
    * > node-fs
    */
    saveBackup(): void;
    /**
    * Backup Database From:
    * > localStorage
    * > node-fs
    */
    loadBackup(overwrite: any): void;
    /**
    * Get Raw Database Data
    */
    raw(): {};
    /**
    * Get A List Of Database Events
    */
    getEvents(): void;
    /**
    * Get Database Events
    */
    events: any[];
    /**
    * Create an new on event listener
    */
    on(event: any, callback: any): number;
    /**
    * Create an new once event listener
    */
    once(event: any, callback: any): number;
    /**
    * Delete an on/once event listener
    */
    off(id: any): void;
};
/**
* SuchDB
*
* @param {Object} options
*/
declare function Boot(options: any): {
    options: {
        master: any;
        autosave: any;
        autoload: any;
        encrypt: {
            enabled: any;
            key: any;
        };
        autobackup: any;
        logging: any;
        logging_custom: any;
    };
    isNode: any;
    nodeDriver: {
        fs: typeof import("fs");
    };
    /**
    * Set/Add Data To The Database
    *
    * @param {string} key
    * @param {any} value
    */
    set(key: string, value: any): void;
    /**
    * Get/Grab Data From The Database
    *
    * @param {string} key
    */
    get(key: string): any;
    /**
    * Remove/Delete Data From The Database
    *
    * @param {string} key
    */
    remove(key: string): void;
    /**
    * Clear/Delete All Data In The Database
    */
    clear(): void;
    /**
    * Get Database Keys
    */
    keys(): string[];
    /**
    * Get Database Values
    */
    values(): any[];
    /**
    * Get Database Entries
    */
    entries(): [string, any][];
    /**
    * Loop Through All Data In The Database
    *
    * @param {function} callback(key, value)
    */
    forEach(callback: Function): void;
    /**
    * Get Database Size
    */
    size(): number;
    /**
    * Check If Database Is Empty
    */
    isEmpty(): boolean;
    /**
    * Check If Database Has Data
    */
    has(key: any): boolean;
    /**
    * Lookup Data In The Database
    *
    * @param {any} value
    */
    lookup(value: any): boolean;
    /**
    * Sort the database
    *
    * @param {string} key
    * @param {boolean} reverse
    */
    sort(key: string, reverse: boolean): void;
    /**
    * Find An Entry
    * @param {any} query
    */
    find(query?: any): any;
    findMultiple(query?: {
        name: string;
        value: string;
    }): any[];
    /**
    * Port Json To The Database
    * @param {any} json
    * @param {boolean} overwrite
    */
    port(json: any, overwrite: boolean): void;
    /**
    * Save Database To:
    * > localStorage
    * > node-fs
    */
    save(): void;
    /**
    * Load Database From:
    * > localStorage
    * > node-fs
    */
    load(overwrite: any): void;
    /**
    * Backup Database To:
    * > localStorage
    * > node-fs
    */
    saveBackup(): void;
    /**
    * Backup Database From:
    * > localStorage
    * > node-fs
    */
    loadBackup(overwrite: any): void;
    /**
    * Get Raw Database Data
    */
    raw(): {};
    /**
    * Get A List Of Database Events
    */
    getEvents(): void;
    /**
    * Get Database Events
    */
    events: any[];
    /**
    * Create an new on event listener
    */
    on(event: any, callback: any): number;
    /**
    * Create an new once event listener
    */
    once(event: any, callback: any): number;
    /**
    * Delete an on/once event listener
    */
    off(id: any): void;
};
export { Boot as SuchDB };
