import { bannerConfig } from "@/config";
import { removeTrailingSlash } from "@/lib/URLHelper";
import { getImage } from "astro:assets";

export const getBanner = async (url) => {
  const images = import.meta.glob<{ default: ImageMetadata }>(
    "/src/assets/Cover/**/*.{jpeg,jpg,JPG,png,gif,svg}"
  );
  const imagePath = bannerConfig[removeTrailingSlash(url)];
  if (!imagePath) return null;
  return await getImage({
    src: images[imagePath](),
    format: "webp",
    width: 3840,
  });
};


