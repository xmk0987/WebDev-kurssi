import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import { Db } from "./db/db.mjs";
import { getCurrentUser } from "./middleware/auth.mjs";
import { setupRoutes } from "./router.mjs";

const currentDir = dirname(fileURLToPath(import.meta.url));
const publicDir = resolve(`${currentDir}`, "public");
const app = express();

// Initialize database connection
const dbFile = "db.json";
const dbDir = resolve(`${currentDir}`, "db");
const dbPath = resolve(dbDir, dbFile);
const dbAdapter = Db.getJsonAdapter(dbPath);
const db = Db.getInstance(dbAdapter);

// save db to app
app.set("db", db);

const staticFileOptions = {
  dotfiles: "ignore",
  etag: true,
  fallthrough: true,
  index: "index.html",
  lastModified: true,
  maxAge: "1m",
};

const cookieOptions = {
  httpOnly: true,
  maxAge: 3600000, // one hour
  path: "/",
  sameSite: "strict",
  secure: false,
};

const corsOptions = {
  origin: "http://localhost:3000", // replace with the origin of your client app
  credentials: true,
};

// FIXME: Unsafe! Save inside environment variable
const cookieSecret = "2nGxLWSL0#nVKCsV#QSLlQ7JMaV&djLT";

app.set("cookieOptions", cookieOptions);
app.set("cookieSecret", cookieSecret);

// middleware
if (process.env?.NODE_ENV === "development") app.use(morgan("dev"));

app.use(cors(corsOptions));
app.use(express.static(publicDir, staticFileOptions));
app.use(cookieParser(cookieSecret, cookieOptions));
app.use(getCurrentUser);
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
app.use(express.json());
setupRoutes(app);

// default 404 handler
app.use((req, res, next) => res.sendStatus(404));

export default app;
