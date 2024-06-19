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

const mainCoverPath = "/src/assets/Cover/MainCover";
const postCoverPath = "/src/assets/Cover/PostCover";

export const bannerConfig = {
  "/": `${mainCoverPath}/IMG_2313.jpg`,
  "/author/Katsuobushi": `${mainCoverPath}/INSTAIMG_0049.jpg`,
  "/tags": `${mainCoverPath}/IMG_8174.jpg`,
  "/tag/uploaded": `${mainCoverPath}/IMG_8174.jpg`,

  "/ghost-github-webpage": `${postCoverPath}/GhostBlog.svg`,
  "/wildcard-mask": `${postCoverPath}/BinaryCode_kalhh_pxhere.jpg`,
  "/golang-function": `${postCoverPath}/Gopher.jpeg`,
  "/golang-kill-goroutine": `${postCoverPath}/Gopher.jpeg`,
  "/python-web-crawler": `${postCoverPath}/Python.jpg`,
  "/clock-and-bandwidth": `${postCoverPath}/BinaryCode_kalhh_pxhere.jpg`,
  "/golang-package-excelize": `${postCoverPath}/Gopher.jpeg`,
  "/golang-channel": `${postCoverPath}/Gopher.jpeg`,
  "/clover-package-err": `${postCoverPath}/Clover.png`,
  "/cpp-array-pointer-address": `${postCoverPath}/C++.jpg`,
  "/golang-package-goversioninfo": `${postCoverPath}/Gopher.jpeg`,
  "/qt-key-mouse-press-event": `${postCoverPath}/DarkCyan.jpg`,
  "/golang-package-walk": `${postCoverPath}/Gopher.jpeg`,
  "/golang-sort-traditionalchinese": `${postCoverPath}/Gopher.jpeg`,
  "/csharp-connect-to-postgresql": `${postCoverPath}/VisualStudioGray.png`,
  "/vue-vuecli-init": `${postCoverPath}/Vue_wallpaperflare.jpg`,
}