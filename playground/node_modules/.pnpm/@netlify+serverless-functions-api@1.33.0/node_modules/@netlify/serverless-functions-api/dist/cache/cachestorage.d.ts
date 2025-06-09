import type { TokenFactory } from './environment.js';
interface NetlifyCacheStorageOptions {
    getToken: TokenFactory;
    url: string;
}
export declare class NetlifyCacheStorage {
    #private;
    constructor({ getToken, url }: NetlifyCacheStorageOptions);
    open(name: string): Promise<Cache>;
    has(name: string): Promise<boolean>;
    delete(name: string): Promise<boolean>;
    keys(): Promise<string[]>;
    match(request: RequestInfo, options?: MultiCacheQueryOptions): Promise<Response | undefined>;
}
export {};
