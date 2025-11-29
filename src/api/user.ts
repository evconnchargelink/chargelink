// api/user.ts

export type UserProfile = {
    id: string;
    name: string;
    email: string;
    phone: string;
    role: "user";
  };
  
  export async function fetchUserProfile(): Promise<UserProfile> {
    return {
      id: "u123",
      name: "Demo User",
      email: "demo@user.com",
      phone: "+91 9876543210",
      role: "user",
    };
  }
  
  export async function updateUserProfile(data: Partial<UserProfile>) {
    return { success: true, updated: data }; // frontend test only
  }
  