"use strict"
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value)
          })
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value))
        } catch (e) {
          reject(e)
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value))
        } catch (e) {
          reject(e)
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected)
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next())
    })
  }
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : {default: mod}
  }
Object.defineProperty(exports, "__esModule", {value: true})
exports.resizeImage = void 0
const fs_1 = __importDefault(require("fs"))
const sharp_1 = __importDefault(require("sharp"))
const projectPath = process.cwd()
function resizeImage(width, height, name) {
  return __awaiter(this, void 0, void 0, function* () {
    yield (0, sharp_1.default)(`images/${name}`)
      .resize({
        width: parseInt(width),
        height: parseInt(height)
      })
      .toFile(projectPath + `/src/resized/${width}_${height}_${name}`)
  })
}
exports.resizeImage = resizeImage
function imageProcessing(req, res, next) {
  return __awaiter(this, void 0, void 0, function* () {
    try {
      const {name, width, height} = req.query
      const resizedImagePath = projectPath + `/src/resized/${width}_${height}_${name}`
      if (!fs_1.default.existsSync(resizedImagePath.toString()))
        yield resizeImage(width, height, name)
      res.sendFile(projectPath + `/src/resized/${width}_${height}_${name}`)
    } catch (error) {
      console.log(error)
      res.sendFile(projectPath + `/src/error.json`)
    }
    next()
  })
}
exports.default = imageProcessing
