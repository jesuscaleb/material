import { LocalStorageService } from './local-storage.service';
import { AuthService } from './auth.service';

export const services: any[] = [
    AuthService,
    LocalStorageService
];

export * from './auth.service';
export * from './local-storage.service';
