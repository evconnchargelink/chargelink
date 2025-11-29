import type { UserState } from "./user.type";
import type { ToastState } from "./toast.type";

// Redux store types
export interface RootState {
  user: UserState;
  toast: ToastState;
}