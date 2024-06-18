import type { SiteConfig } from "./types/SiteConfigType";
import type { NavBarConfig } from "./types/NavBarConfigType";

export const siteConfig: SiteConfig = {
  title: "柴魚筆記",
  description: "程式・軟體・攝影",
  banner: "assets/images/demo-banner.png",
  author: "Katsuobushi",
};

export const navConfig: NavBarConfig = {
  items: [
    {
      name: "Home",
      url: "/",
    },
    {
      name: "Author",
      url: "/author/Katsuobushi",
    },
    {
      name: "Tags",
      url: "/tags",
    },
  ],
};

export const subNavConfig: NavBarConfig = {
  items: [
    {
      name: "Github",
      url: "https://github.com/vincent87720",
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/vincent87720",
    },
  ],
};

export const tagConfig = {
  "ASP.NET Core": {
    name: "ASP.NET Core",
    url: "asp-net-core",
  },
  "C#": {
    name: "C#",
    url: "csharp",
  },
  "Golang": {
    name: "Golang",
    url: "golang",
  },
};

export const bannerConfig = {
  "/": "/src/assets/Cover/MainCover/IMG_2313.jpg",
  "/author/Katsuobushi": "/src/assets/Cover/MainCover/INSTAIMG_0049.jpg",
  "/tags": "/src/assets/Cover/MainCover/IMG_8174.jpg",
  "/tag/uploaded": "/src/assets/Cover/MainCover/IMG_8174.jpg",
  "/ghost-github-webpage": "/src/assets/Cover/PostCover/GhostBlog.svg",
}