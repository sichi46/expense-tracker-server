// Environment Variables
export const PORT = process.env.PORT || 3000;
export const NODE_ENV = process.env.NODE_ENV || "development";

// JWT Config
export const JWT_SECRET = process.env || "your-secret-key-change-in-production";
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1h";
