"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto = __importStar(require("crypto"));
const fs = __importStar(require("fs"));
const cache = __importStar(require("@actions/cache"));
const core = __importStar(require("@actions/core"));
async function run() {
    const CACHE_DIR = "/tmp/work";
    const CACHE_KEY = crypto.createHash("sha256").update("abc").digest("hex");
    core.info(`CACHE_DIR=${CACHE_DIR}`);
    core.info(`CACHE_KEY=${CACHE_KEY}`);
    const CACHE_PATHS = [CACHE_DIR];
    const found_cache_key = await cache.restoreCache(CACHE_PATHS, CACHE_KEY);
    core.info(`found_cache_key=${found_cache_key}`);
    if (!found_cache_key) {
        core.info("No match found in cache");
        fs.mkdirSync(CACHE_DIR);
        fs.writeFileSync(`${CACHE_DIR}/text`, "hello!");
        core.info(`Caching ${CACHE_PATHS}.`);
        await cache.saveCache(CACHE_PATHS, CACHE_KEY);
    }
}
run();
