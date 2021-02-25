import { DialogService } from "@shared/services/dialog.service";
import { TestService } from "./test.service";

export const services : any[] = [
    DialogService,
    TestService
];

export * from "@shared/services/dialog.service";
export * from "@shared/services/test.service";