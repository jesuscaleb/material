import { AuthErrorInterceptor } from "./auth-error.interceptor";
import { AuthInterceptor } from "./auth.interceptor";

export const interceptors : any = [
    AuthInterceptor,
    AuthErrorInterceptor
];

export * from "./auth.interceptor";
export * from "./auth-error.interceptor";