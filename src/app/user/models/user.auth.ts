import { UserPermissions } from "./user.permissions";
// TODO: Remover isAuthenticated y hacer la autenticacion con el metodo de Fernando Herrera
export class UserAuth {
  username: string = "";
  accessToken: string = "";
  permissions: UserPermissions[] = [];
  publicKey: string = "";
}