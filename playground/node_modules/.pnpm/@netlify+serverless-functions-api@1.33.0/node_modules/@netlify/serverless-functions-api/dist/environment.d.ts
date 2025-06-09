import { LambdaContext } from './lambda/context.js';
import { LambdaEvent } from './lambda/event.js';
export declare const setupEnvironment: (headers: Headers, event: LambdaEvent, lambdaContext?: LambdaContext) => void;
