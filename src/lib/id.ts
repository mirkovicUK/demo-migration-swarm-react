// src/lib/id.js — id generation (HOT ⭐), backed by the real `nanoid` dependency.
// Imported by the todos reducer and the hook; a second, human-readable short
// ref is derived from the same generator so consumers never reach for a global.
import { nanoid, customAlphabet } from "nanoid";

const shortRef = customAlphabet("ABCDEFGHJKMNPQRSTUVWXYZ23456789", 6);

export function newId(): string {
  return nanoid();
}

export function newShortRef(): string {
  return `T-${shortRef()}`;
}