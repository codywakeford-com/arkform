import { FSWatcher } from 'chokidar';
import { EventEmitter } from 'node:events';
import tmp from 'tmp-promise';

declare const getAPIToken: () => Promise<string | undefined>;

declare const shouldBase64Encode: (contentType: string) => boolean;

interface DevEvent {
    name: string;
}
type DevEventHandler = (event: DevEvent) => void;

declare const headers: {
    BlobsInfo: string;
};
declare const toMultiValueHeaders: (headers: Headers) => Record<string, string[]>;

type ConfigStoreOptions<T extends Record<string, any>> = {
    defaults?: T | undefined;
};
declare class GlobalConfigStore<T extends Record<string, any> = Record<string, any>> {
    #private;
    constructor(options?: ConfigStoreOptions<T>);
    get all(): T;
    set(key: string, value: unknown): void;
    get(key: string): T[typeof key];
    private getConfig;
    private writeConfig;
}
declare const getGlobalConfigStore: () => Promise<GlobalConfigStore>;

declare const resetConfigCache: () => void;

type globalConfig_GlobalConfigStore<T extends Record<string, any> = Record<string, any>> = GlobalConfigStore<T>;
declare const globalConfig_GlobalConfigStore: typeof GlobalConfigStore;
declare const globalConfig_resetConfigCache: typeof resetConfigCache;
declare namespace globalConfig {
  export {
    globalConfig_GlobalConfigStore as GlobalConfigStore,
    getGlobalConfigStore as default,
    globalConfig_resetConfigCache as resetConfigCache,
  };
}

type Handler = (request: Request) => Promise<Response>;

declare class LocalState {
    private path;
    constructor(cwd: string);
    get all(): any;
    set all(val: any);
    get size(): number;
    get(key: any): string | undefined;
    set(...args: any[]): void;
    has(key: any): boolean;
    delete(key: any): void;
    clear(): void;
}

interface CacheEntry<T> {
    enqueued?: boolean;
    task: Promise<T>;
    timestamp: number;
}
type MemoizeCache<T> = Record<string, CacheEntry<T> | undefined>;
interface MemoizeOptions<T> {
    cache: MemoizeCache<T>;
    cacheKey: string;
    command: () => Promise<T>;
}
declare const memoize: <T>({ cache, cacheKey, command }: MemoizeOptions<T>) => Promise<T>;

/**
 * A Node.js HTTP server with support for middleware.
 */
declare class HTTPServer {
    private handler;
    private nodeServer?;
    constructor(handler: Handler);
    start(port?: number): Promise<string>;
    stop(): Promise<void>;
}

interface WatchDebouncedOptions {
    depth?: number;
    ignored?: (string | RegExp)[];
    onAdd?: (paths: string[]) => void;
    onChange?: (paths: string[]) => void;
    onUnlink?: (paths: string[]) => void;
}
/**
 * Adds a file watcher to a path or set of paths and debounces the events.
 */
declare const watchDebounced: (target: string | string[], { depth, ignored, onAdd, onChange, onUnlink }: WatchDebouncedOptions) => Promise<FSWatcher>;

interface EventInspectorOptions {
    debug?: boolean;
}
declare class EventInspector extends EventEmitter {
    debug: boolean;
    events: DevEvent[];
    constructor({ debug }?: EventInspectorOptions);
    handleEvent(event: DevEvent): void;
    waitFor(filter: (event: DevEvent) => boolean, timeoutMs?: number): Promise<unknown>;
}

type BodyFunction = (req: BodyInit | null | undefined) => void;
interface ExpectedRequest {
    body?: string | BodyFunction;
    fulfilled: boolean;
    headers: Record<string, string>;
    method: string;
    response: Response | Error;
    url: string;
}
interface ExpectedRequestOptions {
    body?: string | BodyFunction;
    headers?: Record<string, string>;
    response: Response | Error;
    url: string;
}
declare class MockFetch {
    originalFetch: typeof globalThis.fetch;
    requests: ExpectedRequest[];
    constructor();
    private addExpectedRequest;
    delete(options: ExpectedRequestOptions): this;
    get(options: ExpectedRequestOptions): this;
    head(options: ExpectedRequestOptions): this;
    post(options: ExpectedRequestOptions): this;
    put(options: ExpectedRequestOptions): this;
    get fetch(): (input: string | Request | URL, init?: RequestInit | undefined) => Promise<Response>;
    get fulfilled(): boolean;
    restore(): void;
}

declare class Fixture {
    directory?: tmp.DirectoryResult;
    files: {
        contents: string;
        path: string;
    }[];
    constructor();
    create(): Promise<string>;
    deleteFile(path: string): Promise<void>;
    destroy(): Promise<void>;
    withFile(path: string, contents: string): this;
    writeFile(path: string, contents: string): Promise<void>;
}

export { DevEvent, DevEventHandler, EventInspector, Fixture, HTTPServer, Handler, LocalState, MemoizeCache, MockFetch, getAPIToken, globalConfig, headers, memoize, shouldBase64Encode, toMultiValueHeaders, watchDebounced };
