export interface ToastState {
  text: string;
  isOpen: boolean;
  severity: "error" | "info" | "success" | "warning";
}