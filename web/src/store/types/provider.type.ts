export interface ProviderState {
  isAuthenticated: boolean;
  user: Provider | null;
  loading: boolean;
  error: string | null;
}

export interface Provider {
  id: string;
  email: string;
  name: string;
  // Add other user properties as needed
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