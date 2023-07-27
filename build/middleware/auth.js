"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/middleware/auth.ts
var auth_exports = {};
__export(auth_exports, {
  AuthMiddleware: () => AuthMiddleware
});
module.exports = __toCommonJS(auth_exports);

// src/env/index.ts
var import_config = require("dotenv/config");
var import_zod = require("zod");
var envSchema = import_zod.z.object({
  NODE_ENV: import_zod.z.enum(["dev", "test", "production"]).default("dev"),
  PORT: import_zod.z.coerce.number().default(3333),
  TOKEN_KEY: import_zod.z.coerce.string()
});
var _env = envSchema.safeParse(process.env);
if (_env.success === false) {
  console.error("Invalid environment variable", _env.error.format());
  throw new Error("Invalid environment variable");
}
var env = _env.data;

// src/middleware/auth.ts
var import_jsonwebtoken = require("jsonwebtoken");
function AuthMiddleware(req, res, next) {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: "Token not provided " });
  }
  const [, token] = authorization.split(" ");
  try {
    const decoded = (0, import_jsonwebtoken.verify)(token, env.TOKEN_KEY);
    const { id } = decoded;
    req.userId = id;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Token not provided " });
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AuthMiddleware
});
