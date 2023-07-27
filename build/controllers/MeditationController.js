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

// src/controllers/MeditationController.ts
var MeditationController_exports = {};
__export(MeditationController_exports, {
  MeditationController: () => MeditationController
});
module.exports = __toCommonJS(MeditationController_exports);

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MeditationController
});
