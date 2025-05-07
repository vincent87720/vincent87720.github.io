import type { TagConfig } from "../types/TagConfigType";
export function removeTrailingSlash(str: string) {
  if (str === "/") return str;
  return str.replace(/\/+$/, "");
}

export function getTagURL(tagConfig: TagConfig, tag: string){
  return tagConfig[tag] == undefined ? tag : tagConfig[tag].url
}