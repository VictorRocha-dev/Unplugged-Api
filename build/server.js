"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/server.ts
var import_express2 = __toESM(require("express"));

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

// src/routes.ts
var import_express = require("express");

// src/utils/prisma.ts
var import_client = require("@prisma/client");
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

// src/controllers/AuthController.ts
var import_bcryptjs2 = require("bcryptjs");
var import_jsonwebtoken = require("jsonwebtoken");
var AuthController = class {
  async authenticate(req, res) {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({
      where: {
        email
      }
    });
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }
    const isValuePassword = await (0, import_bcryptjs2.compare)(password, user.password);
    if (!isValuePassword) {
      return res.status(401).json({ error: "Password invalid " });
    }
    const token = (0, import_jsonwebtoken.sign)({ id: user.id }, env.TOKEN_KEY, { expiresIn: "190d" });
    const { id } = user;
    return res.json({ user: { id, email }, token });
  }
};

// src/middleware/auth.ts
var import_jsonwebtoken2 = require("jsonwebtoken");
function AuthMiddleware(req, res, next) {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: "Token not provided " });
  }
  const [, token] = authorization.split(" ");
  try {
    const decoded = (0, import_jsonwebtoken2.verify)(token, env.TOKEN_KEY);
    const { id } = decoded;
    req.userId = id;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Token not provided " });
  }
}

// src/controllers/MeditationController.ts
var MeditationController = class {
  async listMeditation(req, res) {
    const meditations = await prisma.meditation.findMany({
      include: {
        meditation_category: {
          select: {
            name: true
          }
        }
      }
    });
    return res.json(meditations);
  }
  async listCategory(req, res) {
    const meditationsCategory = await prisma.meditationCategory.findMany({
      include: {
        meditation: {
          select: {
            id: true,
            meditation_name: true,
            meditation_sound: true,
            meditation_img: true,
            meditation_duration: true
          }
        }
      }
    });
    return res.json(meditationsCategory);
  }
  async createCategory(req, res) {
    const { name } = req.body;
    const create = await prisma.meditationCategory.create({
      data: {
        name
      }
    });
    return res.json(create);
  }
  async createMeditation(req, res) {
    const {
      meditation_name,
      meditation_sound,
      meditation_img,
      meditation_duration,
      meditationCategoryId
    } = req.body;
    const create = await prisma.meditation.create({
      data: {
        meditation_name,
        meditation_sound,
        meditation_img,
        meditation_duration,
        meditation_category: {
          connect: { id: meditationCategoryId }
        }
      }
    });
    return res.json(create);
  }
};

// src/controllers/BinauralController.ts
var BinauralController = class {
  async listBinaural(req, res) {
    const binaurals = await prisma.binaural.findMany({
      include: {
        binauralCategory: {
          select: {
            name: true
          }
        }
      }
    });
    return res.json(binaurals);
  }
  async listCategory(req, res) {
    const binauralCategory = await prisma.binauralCategory.findMany({
      include: {
        binaural: {
          select: {
            id: true,
            binaural_name: true,
            binaural_sound: true,
            binaural_img: true,
            binaural_duration: true
          }
        }
      }
    });
    return res.json(binauralCategory);
  }
  async createCategory(req, res) {
    const { name } = req.body;
    const create = await prisma.binauralCategory.create({
      data: {
        name
      }
    });
    return res.json(create);
  }
  async createBinaural(req, res) {
    const {
      binaural_name,
      binaural_sound,
      binaural_img,
      binaural_duration,
      binauralCategoryId
    } = req.body;
    const create = await prisma.binaural.create({
      data: {
        binaural_name,
        binaural_sound,
        binaural_img,
        binaural_duration,
        binauralCategory: {
          connect: { id: binauralCategoryId }
        }
      }
    });
    return res.json(create);
  }
};

// src/routes.ts
var userController = new UserController();
var authController = new AuthController();
var meditationController = new MeditationController();
var binauralController = new BinauralController();
var router = (0, import_express.Router)();
router.get("/users", AuthMiddleware, userController.index);
router.post("/create", userController.store);
router.post("/auth", authController.authenticate);
router.get("/meditations", meditationController.listMeditation);
router.get("/meditationsCategory", meditationController.listCategory);
router.post("/createMeditationCategory", meditationController.createCategory);
router.post("/createMeditation", meditationController.createMeditation);
router.get("/binaurals", binauralController.listBinaural);
router.get("/binauralCategory", binauralController.listCategory);
router.post("/createBinauralCategory", binauralController.createCategory);
router.post("/createBinaural", binauralController.createBinaural);

// src/server.ts
var app = (0, import_express2.default)();
app.use(import_express2.default.json());
app.use(router);
app.listen(env.PORT, () => console.log("Server onc at http://localhost:3333"));
