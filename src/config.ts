import type { SiteConfig } from "./types/SiteConfigType";
import type { NavBarConfig } from "./types/NavBarConfigType";

export const siteConfig: SiteConfig = {
  title: "柴魚筆記",
  description: "程式・軟體・攝影",
  metaDescription:
    "Vincent 的個人部落格，用於紀錄時常忘記的事物和自己走過的路，分享網頁後端、資料庫及系統架構等各式各樣的技術議題。",
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
    {
      name: "Series",
      url: "/series",
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
  // "ASP.NET Core": {
  //   name: "ASP.NET Core",
  //   url: "asp-net-core",
  // },
  // "C#": {
  //   name: "csharp",
  //   url: "csharp",
  // },
};

const mainCoverPath = "/src/assets/Cover/MainCover";
const postCoverPath = "/src/assets/Cover/PostCover";

export const bannerConfig = {
  "/": `${mainCoverPath}/IMG_2313.jpg`,
  "/author/Katsuobushi": `${mainCoverPath}/INSTAIMG_0049.jpg`,
  "/tags": `${mainCoverPath}/IMG_8174.jpg`,
  "/series": `${mainCoverPath}/IMG_7313.jpg`,
  "/tag/uploaded": `${mainCoverPath}/IMG_8174.jpg`,

  "/tag/csharp": `${postCoverPath}/VisualStudioGray.png`,
  "/tag/asp-net-core": `${postCoverPath}/VisualStudioGray.png`,
  "/tag/Golang": `${postCoverPath}/Gopher.jpeg`,
  "/tag/Database": `${postCoverPath}/BrownWoodenDrawer_JanAntoninKolar_unsplash.jpeg`,
  "/tag/OperatingSystem": `${postCoverPath}/BinaryCode_kalhh_pxhere.jpg`,
  "/tag/Python": `${postCoverPath}/Python_wallpaperflare.jpg`,
  "/tag/Vue": `${postCoverPath}/Vue_wallpaperflare.jpg`,
  "/tag/Network": `${postCoverPath}/Communication.jpg`,
  "/tag/JavaScript": `${postCoverPath}/Javascript.png`,
  "/tag/Pattern": `${postCoverPath}/ABlackAndWhitePhotoOfAWall_Shapelined_unsplash.jpg`,
  "/tag/SQLServer": `${postCoverPath}/BrownWoodenDrawer_JanAntoninKolar_unsplash.jpeg`,
  "/tag/Tools": `${postCoverPath}/Tools_ErikMclean_unsplash.jpg`,
  "/tag/Webpack": `${postCoverPath}/Webpack.png`,
  "/tag/API": `${postCoverPath}/Doors_MorenHsu_unsplash.jpg`,
  "/tag/C++": `${postCoverPath}/C++.jpg`,
  "/tag/Clover": `${postCoverPath}/Clover.png`,
  "/tag/Concurrency": `${postCoverPath}/Rail_BrunoKelzer_unsplash.jpg`,
  "/tag/Crawler": `${postCoverPath}/Search_DanielLerman_unsplash.jpeg`,
  "/tag/Docker": `${postCoverPath}/Docker.jpg`,
  "/tag/Elasticsearch": `${postCoverPath}/Search_DanielLerman_unsplash.jpeg`,
  "/tag/ESP8266": `${postCoverPath}/CircuitBoard_Skitterphoto_pexels.jpg`,
  "/tag/ExchangeProgram": `${postCoverPath}/MuroranIT_Vincent.jpg`,
  "/tag/Ghost": `${postCoverPath}/GhostBlog.svg`,
  "/tag/HTTP": `${postCoverPath}/Communication.jpg`,
  "/tag/Japan": `${postCoverPath}/MuroranIT_Vincent.jpg`,
  "/tag/LINQ": `${postCoverPath}/Link_MoritzMentges_unsplash.jpg`,
  "/tag/MQTT": `${postCoverPath}/MQTT.png`,
  "/tag/MuroranIT": `${postCoverPath}/MuroranIT_Vincent.jpg`,
  "/tag/MySQL": `${postCoverPath}/BrownWoodenDrawer_JanAntoninKolar_unsplash.jpeg`,
  "/tag/PostgreSQL": `${postCoverPath}/BrownWoodenDrawer_JanAntoninKolar_unsplash.jpeg`,
  "/tag/Qt": `${postCoverPath}/DarkCyan.jpg`,
  "/tag/Quasar": `${postCoverPath}/Quasar.png`,
  "/tag/SOLID": `${postCoverPath}/ABlackAndWhitePhotoOfAWall_Shapelined_unsplash.jpg`,
  "/tag/SQL": `${postCoverPath}/BrownWoodenDrawer_JanAntoninKolar_unsplash.jpeg`,
  "/tag/Streaming": `${postCoverPath}/Waterfall_JonatanLewczuk_unsplash.jpg`,
  "/tag/TCP": `${postCoverPath}/Communication.jpg`,
  "/tag/VisualStudioCode": `${postCoverPath}/VisualStudioGray.png`,
  "/series/asp-net-core": `${postCoverPath}/VisualStudioGray.png`,

  "/ghost-github-webpage": `${postCoverPath}/GhostBlog.svg`,
  "/wildcard-mask": `${postCoverPath}/BinaryCode_kalhh_pxhere.jpg`,
  "/golang-function": `${postCoverPath}/Gopher.jpeg`,
  "/golang-kill-goroutine": `${postCoverPath}/Gopher.jpeg`,
  "/python-web-crawler": `${postCoverPath}/Python_wallpaperflare.jpg`,
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
  "/vue-vuetify-init": `${postCoverPath}/Vue_wallpaperflare.jpg`,
  "/vue-vuerouter-init": `${postCoverPath}/Vue_wallpaperflare.jpg`,
  "/mqtt-mosquitto-server-init": `${postCoverPath}/MQTT.png`,
  "/ide-vscode-terminal-using-msys": `${postCoverPath}/VisualStudioGray.png`,
  "/flash-firmware-on-esp01": `${postCoverPath}/CircuitBoard_Skitterphoto_pexels.jpg`,
  "/zsh-ubuntu-init": `${postCoverPath}/Zsh.png`,
  "/golang-mysql-error-1040": `${postCoverPath}/Gopher.jpeg`,
  "/pattern-rest-api-design": `${postCoverPath}/ABlackAndWhitePhotoOfAWall_Shapelined_unsplash.jpg`,
  "/tcp-three-way-handshake": `${postCoverPath}/Communication.jpg`,
  "/python-pyinstaller-django-runserver-does-not-exist-error": `${postCoverPath}/Python_wallpaperflare.jpg`,
  "/module-not-found-error-in-django-pyinstaller": `${postCoverPath}/Python_wallpaperflare.jpg`,
  "/postgresql-write-timestamp-on-update": `${postCoverPath}/BrownWoodenDrawer_JanAntoninKolar_unsplash.jpeg`,
  "/elasticsearch-intro": `${postCoverPath}/Search_DanielLerman_unsplash.jpeg`,
  "/memory-management": `${postCoverPath}/Memory_RonDyar_unsplash.jpeg`,
  "/interprocess-communication": `${postCoverPath}/Communication.jpg`,
  "/pipe": `${postCoverPath}/Pipe_Diana_unsplash.jpeg`,
  "/python-get-binary-path": `${postCoverPath}/Python_wallpaperflare.jpg`,
  "/quasar-scroll-to-field-on-validation-error": `${postCoverPath}/Quasar.png`,
  "/muroran-exchange-program-application": `${postCoverPath}/MuroranIT_Vincent.jpg`,
  "/docker-buildx": `${postCoverPath}/Docker.jpg`,
  "/difference-between-assign-and-replace-in-javascript": `${postCoverPath}/Javascript.png`,
  "/exception-handling-with-middleware-in-aspnet-core": `${postCoverPath}/VisualStudioGray.png`,
  "/vue3-webpack-import-vue-esm-bundler": `${postCoverPath}/Vue_wallpaperflare.jpg`,
  "/webpack-multiple-entry-and-output": `${postCoverPath}/Webpack.png`,
  "/clustered-and-nonclustered-indexes": `${postCoverPath}/BrownWoodenDrawer_JanAntoninKolar_unsplash.jpeg`,
  "/aspnet-core-render-section": `${postCoverPath}/VisualStudioGray.png`,
  "/aspnet-core-dependency-injection": `${postCoverPath}/ABlackAndWhitePhotoOfAWall_Shapelined_unsplash.jpg`,
  "/http-header-content-disposition": `${postCoverPath}/Communication.jpg`,
  "/model-binding-in-asp-net-core": `${postCoverPath}/VisualStudioGray.png`,
  "/validation-attributes-in-asp-net-core": `${postCoverPath}/Vault_JasonDent_unsplash.jpg`,
  "/promise-in-javascript": `${postCoverPath}/Javascript.png`,
  "/build-media-streaming-in-asp-net-core-using-hls": `${postCoverPath}/Waterfall_JonatanLewczuk_unsplash.jpg`,
  "/difference-between-ienumerable-iqueryable-linq": `${postCoverPath}/VisualStudioGray.png`,
  "/queued-background-tasks-in-asp-net-core": `${postCoverPath}/Queue_WillTruettner_unsplash.jpg`,
  "/race-condition-intro": `${postCoverPath}/Rail_BrunoKelzer_unsplash.jpg`,
  "/upload-file-using-csharp": `${postCoverPath}/VisualStudioGray.png`,
  "/csharp-validation-attribute-of-guid": `${postCoverPath}/Vault_JasonDent_unsplash.jpg`,
  "/csharp-virtual": `${postCoverPath}/VisualStudioGray.png`,
  "/sql-having-clause": `${postCoverPath}/BrownWoodenDrawer_JanAntoninKolar_unsplash.jpeg`,
  "/csharp-delegates": `${postCoverPath}/VisualStudioGray.png`,
  "/solid-srp": `${postCoverPath}/ABlackAndWhitePhotoOfAWall_Shapelined_unsplash.jpg`,
  "/generic-delegates": `${postCoverPath}/VisualStudioGray.png`,
  "/database-scan-seek-lookup": `${postCoverPath}/BrownWoodenDrawer_JanAntoninKolar_unsplash.jpeg`,
  "/csharp-base": `${postCoverPath}/VisualStudioGray.png`,
  "/asp-net-core-basic": `${postCoverPath}/VisualStudioGray.png`,
  "/middleware-in-asp-net-core": `${postCoverPath}/VisualStudioGray.png`,
  "/route-in-asp-net-core": `${postCoverPath}/VisualStudioGray.png`,
  "/hello-deadlock": `${postCoverPath}/DiningPhilosophers'Problem_David Solis.png`,
  "/index-fragmentation": `${postCoverPath}/AGroupOfAbstractShapesFloatingInTheAir_SteveJohnson_unsplash.jpg`,
  "/asp-net-core-authentication": `${postCoverPath}/VisualStudioGray.png`,
  "/asp-net-core-custom-authentication-scheme": `${postCoverPath}/VisualStudioGray.png`,
};

export const seriesConfig = [
  {
    name: "ASP.NET Core 系列文章",
    slug: "asp-net-core",
    posts: [
      "/asp-net-core-basic",
      "/middleware-in-asp-net-core",
      "/aspnet-core-dependency-injection",
      "/route-in-asp-net-core",
    ],
  },
];
