import type { TokenFactory } from './environment.js';
interface NetlifyCacheOptions {
    getToken: TokenFactory;
    name: string;
    url: string;
}
export declare class NetlifyCache implements Cache {
    #private;
    constructor({ getToken, name, url }: NetlifyCacheOptions);
    add(request: RequestInfo): Promise<void>;
    addAll(requests: RequestInfo[]): Promise<void>;
    matchAll(request?: RequestInfo, _options?: CacheQueryOptions): Promise<readonly Response[]>;
    put(request: RequestInfo | URL | string, response: Response): Promise<void>;
    match(request: RequestInfo): Promise<Response | undefined>;
    delete(_request: Request): Promise<boolean>;
    keys(_request?: Request): Promise<never[]>;
}
export {};
