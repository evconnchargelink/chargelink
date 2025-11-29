// api/auth.ts

// Dummy types
export type LoginResponse = {
    success: boolean;
    token?: string;
    message: string;
  };
  
  export type UserDetails = {
    id: string;
    name: string;
    email: string;
    role: "user" | "host";
  };
  
  // Dummy Login API
  export async function login(email: string, password: string): Promise<LoginResponse> {
    return {
      success: true,
      token: "dummy_jwt_token_123",
      message: "Login successful (dummy API)",
    };
  }
  
  // Dummy OTP Verify
  export async function verifyOTP(otp: string): Promise<boolean> {
    return otp === "1234"; // temporary logic
  }
  
  // Dummy Fetch User
  export async function getUser(): Promise<UserDetails> {
    return {
      id: "u123",
      name: "Demo User",
      email: "demo@user.com",
      role: "user",
    };
  }
  