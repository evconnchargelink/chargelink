import dotenv from 'dotenv';

if (dotenv.config().error) {
  console.error("Error loading .env file");
  throw new Error("Error loading .env file");
}


// add your environment variables here
export const config = {
  PORT: process.env.PORT || 8000,
  ENV: process.env.NODE_ENV || 'development',
  FRONTEND_URL: process.env.FRONTEND_URL || "http://localhost:5173",
  MONGO_URI: process.env.MONGO_URI,
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
  RESEND: process.env.RESEND,
  GCP_PROJECT_ID: process.env.GCP_PROJECT_ID,
  GCP_CLIENT_EMAIL: process.env.GCP_CLIENT_EMAIL,
  GCP_PRIVATE_KEY: process.env.GCP_PRIVATE_KEY,
  GCS_BUCKET_NAME: process.env.GCS_BUCKET_NAME,
  AWS_REGION: process.env.AWS_REGION,
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
  AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME,
  GEMINI_API_KEY: process.env.GEMINI_API_KEY,
};
