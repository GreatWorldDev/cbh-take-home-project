const crypto = require("crypto");

const MAX_PARTITION_KEY_LENGTH = 256;
const TRIVIAL_PARTITION_KEY = "0";

function getHash(data) {
  return crypto.createHash("sha3-512").update(data).digest("hex");
}

function getStringifiedCandidate(candidate) {
  if (typeof candidate === "string") {
    return candidate;
  }
  return JSON.stringify(candidate);
}

function getPartitionKey(event) {
  let candidate = TRIVIAL_PARTITION_KEY;
  if (event) {
    candidate = event.partitionKey || getHash(JSON.stringify(event));
  }
  candidate = getStringifiedCandidate(candidate);
  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    candidate = getHash(candidate);
  }
  return candidate;
}

exports.deterministicPartitionKey = getPartitionKey;