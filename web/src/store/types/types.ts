import type { UserState } from "./user.type";
import type { ProviderState } from "./provider.type";
import type { AdminState } from "./admin.type";

// Redux store types
export interface RootState {
  user: UserState;
  provider: ProviderState;
  admin: AdminState;
}