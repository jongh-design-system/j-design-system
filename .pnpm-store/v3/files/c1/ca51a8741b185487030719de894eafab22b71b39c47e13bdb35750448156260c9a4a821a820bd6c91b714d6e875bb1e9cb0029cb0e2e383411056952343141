// Copyright (c) roydukkey. All rights reserved.
// Licensed under the MIT. See LICENSE file in the project root for full license information.
interface JsonDocument {
    [key: string]: JsonValue;
}
type JsonValue = string | number | boolean | null | JsonValue[] | {
    [key: string]: JsonValue;
};
interface Config {
    /**
     * The names of shareable configuration packages which these options will extend.
     */
    extends?: string[];
    /**
     * The location and filename to which the `package.json` will be backed up.
     */
    backupPath?: string;
    /**
     * The indentation that is used to format the cleaned `package.json`.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#Parameters | JSON.stringify} JSON.stringify for more information on the space parameter.
     */
    indent?: string | number;
    /**
     * The keys to be removed from the cleaned `package.json`.
     *
     * Deeper keys can be accessed using a dot (e.g., `'key.keyInsideKey'`). Likewise, arrays are accessible using brackets (e.g., `'key.arrKey[0]'`).
     */
    remove?: string[] | RemoveFunction;
    /**
     * The keys to be replaced in the cleaned `package.json`.
     *
     * Deeper keys can be accessed using a dot (e.g., `'key.keyInsideKey'`). Likewise, arrays are accessible using brackets (e.g., `'key.arrKey[0]'`).
     */
    replace?: ReplaceMap | ReplaceFunction;
    /**
     * A callback to notify after the `package.json` has been cleaned, supplied with an indication as to whether there were changes and the compiled configuration.
     */
    onClean?: (hasChanged: boolean, config: CompiledConfig) => void;
    /**
     * A callback to notify after the `package.json` has been restored, supplied with an indication as to whether there were changes and the compiled configuration.
     */
    onRestore?: (hasChanged: boolean, config: CompiledConfig) => void;
}
type CompiledConfig = Required<Pick<CliOptions, "sourcePath"> & Omit<Config, "extends" | MutationSets | LifecycleEvents> & NonCallableMutationSets> & Pick<Config, LifecycleEvents>;
type LifecycleEvents = "onClean" | "onRestore";
type MutationSets = "remove" | "replace";
interface NonCallableMutationSets {
    remove: Exclude<Config["remove"], RemoveFunction | undefined>;
    replace: Exclude<Config["replace"], ReplaceFunction | undefined>;
}
interface ReplaceMap {
    [key: string]: JsonValue;
}
interface RemoveFunction {
    (keys: string[]): string[];
}
interface ReplaceFunction {
    (pairs: ReplaceMap): ReplaceMap;
}
interface CliOptions extends Config {
    /**
     * The location and filename to additional configuration, overriding `./package.json` and `./clean-package.config.{js,json}` inherited configuration options if present.
     */
    config?: string;
    /**
     * The location and filename to the `package.json` file to clean up or restore.
     */
    sourcePath?: string;
    /**
     * The keys to be removed from the cleaned `package.json`, which will be added into the inherited configuration.
     */
    removeAdd?: string[];
    remove?: string[];
    /**
     * The keys to be replace from the cleaned `package.json`, which will be added into the inherited configuration.
     */
    replaceAdd?: CliReplaceMap;
    replace?: CliReplaceMap;
}
interface CliReplaceMap {
    [key: string]: string | number | boolean | null;
}
/**
 * Returns the loaded JSON document and compiled configuration specifying how it should be cleaned.
 *
 * @param sourcePath - The path to the source JSON document.
 * @param config - The configuration that extends any configuration defined in the JSON document or other configuration files.
 */
declare const load: (sourcePath?: string, config?: string | Config) => [
    JsonDocument,
    CompiledConfig
];
/**
 * Backs up and cleans the given JSON document using the specified configuration.
 *
 * @param source - The JSON document which should be backed up and cleaned.
 * @param config - The configuration that specifies how the JSON document should be backed up and cleaned.
 */
declare const clean: (source: JsonDocument, config: CompiledConfig) => void;
/**
 * Restores the backed up file.
 *
 * @param config - The configuration that specifies how the JSON document should be restored.
 */
declare const restore: (config: CompiledConfig) => void;
/**
 * Returns the version of `clean-package`.
 */
declare const version: () => string;
export { load, clean, restore, version };
