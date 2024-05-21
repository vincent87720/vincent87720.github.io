import type { SiteConfig } from "./types/SiteConfigType";
import type { NavBarConfig } from "./types/NavBarConfigType";

export const siteConfig: SiteConfig = {
  title: "柴魚筆記",
  description: "程式・軟體・攝影",
  banner: "assets/images/demo-banner.png",
};

export const navConfig: NavBarConfig = {
  items: [
    {
        name: "Home",
        url: "/",
    },
    {
        name: "Author",
        url: "/author/katsuobushi",
    },
    {
        name: "Tags",
        url: "/tags",
    },
  ],
};
