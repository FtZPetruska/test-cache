import * as crypto from "crypto";
import * as fs from "fs";

import * as cache from "@actions/cache";
import * as core from "@actions/core";

async function run() {
  const CACHE_DIR = "/tmp/work";
  const CACHE_KEY = crypto
    .createHash("sha256")
    .update("abc")
    .digest("hex")
    .substring(0, 16);

  core.info(`CACHE_DIR=${CACHE_DIR}`);
  core.info(`CACHE_KEY=${CACHE_KEY}`);

  const CACHE_PATHS = [CACHE_DIR];

  const found_cache_key = await cache.restoreCache(CACHE_PATHS, CACHE_KEY);
  core.info(`found_cache_key=${found_cache_key}`);

  if (found_cache_key) {
    core.info("Found match => do nothing");
  } else {
    core.info("No match found in cache");

    fs.mkdirSync(CACHE_DIR);
    fs.writeFileSync(`${CACHE_DIR}/text`, "hello!");

    core.info(`Caching ${CACHE_PATHS}.`);
    const saved_cache = await cache.saveCache(CACHE_PATHS, CACHE_KEY);
    core.info(`saved_cache=${saved_cache}`);
  }
}

run();
