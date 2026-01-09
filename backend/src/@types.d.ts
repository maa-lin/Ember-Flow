// Tell TypeScript about modules for .mts
declare module "express";
declare module "cors";
declare module "mongoose";
declare module "dotenv";

// Fix `process.env` type errors
declare var process: {
  env: {
    PORT?: string;
    MONGO_URL?: string;
    [key: string]: string | undefined;
  };
};