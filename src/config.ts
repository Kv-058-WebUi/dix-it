import { resolve } from "path";
import { config } from "dotenv"

config({ path: resolve(__dirname, "../.env") })

export const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost';
export const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost';
export const BACKEND_PORT = parseInt(process.env.BACKEND_PORT || "5000");
export const FRONTEND_PORT = parseInt(process.env.FRONTEND_PORT || "3000");
export const SERVER_PORT = parseInt(process.env.PORT || "8000");
export const DB_PORT = parseInt(process.env.DB_PORT || "5432");
export const DB_USER = process.env.DB_USER || 'dixit';
export const DB_PASSWORD = process.env.DB_PASSWORD || 'dixit';
export const DB_HOST = process.env.DB_HOST || '127.0.0.1';
export const DB_NAME = process.env.DB_NAME || 'dixit';
export const EMAIL_USERNAME = process.env.EMAIL_USERNAME || "username";
export const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD || "password";
export const JWT_SECRET = process.env.JWT_SECRET || "jwt_secret";
export const JWT_EXPIRATION = process.env.JWT_EXPIRATION || '7d';
export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || '';
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || '';
