import { bannerConfig } from "@/config";
import { getImage } from "astro:assets";

export const getBanner = async (url) => {
  const images = import.meta.glob<{ default: ImageMetadata }>(
    "/src/assets/Cover/**/*.{jpeg,jpg,png,gif,svg}"
  );
  const imagePath = bannerConfig[removeTrailingSlash(url)];
  if (!imagePath) return null;
  return await getImage({
    src: images[imagePath](),
    format: "webp",
    width: 3840,
  });
};

function removeTrailingSlash(str: string) {
  if(str === "/") return str;
  return str.replace(/\/+$/, '');
}
