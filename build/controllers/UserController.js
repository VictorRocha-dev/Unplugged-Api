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

// src/controllers/UserController.ts
var UserController_exports = {};
__export(UserController_exports, {
  UserController: () => UserController
});
module.exports = __toCommonJS(UserController_exports);

// src/utils/prisma.ts
var import_client = require("@prisma/client");

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

// src/utils/prisma.ts
var prisma = new import_client.PrismaClient({
  log: env.NODE_ENV == "dev" ? ["query"] : []
});

// src/controllers/UserController.ts
var import_bcryptjs = require("bcryptjs");
var UserController = class {
  async index(req, res) {
    const users = await prisma.user.findMany();
    return res.json({ users });
  }
  async store(req, res) {
    const {
      name,
      email,
      password,
      nickname,
      img_user,
      street,
      number,
      city,
      state,
      zip_code,
      reference
    } = req.body;
    const hashPassword = await (0, import_bcryptjs.hash)(password, 8);
    const emailAlreadyExist = await prisma.user.findUnique({
      where: {
        email
      }
    });
    if (emailAlreadyExist) {
      return res.status(409).json("this email already exist");
    }
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashPassword,
        nickname,
        img_user,
        street,
        number,
        city,
        state,
        zip_code,
        reference
      }
    });
    return res.json({ user });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  UserController
});
