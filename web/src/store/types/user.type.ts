export interface User {
  id: string;
  email: string;
  name: string;
  role: "driver" | "host" | "admin";
  profileImgURL?: string;
}

export interface UserState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials {
  name: string;
  email: string;
  password: string;
}
