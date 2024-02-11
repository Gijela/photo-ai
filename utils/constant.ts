import { Uploader } from "uploader";
import NSFWPredictor from "./nsfwCheck";
import { UploadWidgetConfig } from "@bytescale/upload-widget";

export const uploaderConfig = Uploader({
  apiKey: !!process.env.NEXT_PUBLIC_UPLOAD_API_KEY
    ? process.env.NEXT_PUBLIC_UPLOAD_API_KEY
    : "free",
});

export const uploaderOptions = {
  maxFileCount: 1,
  mimeTypes: ["image/jpeg", "image/png", "image/jpg", "image/webp"],
  editor: { images: { crop: false } },
  onValidate: async (file: File): Promise<undefined | string> => {
    let isSafe = await NSFWPredictor.isSafeImg(file);
    return isSafe ? undefined : "文件安全检验未通过";
  },
};

export const reactWidgetConfig: UploadWidgetConfig = {
  apiKey: !!process.env.NEXT_PUBLIC_UPLOAD_API_KEY
    ? process.env.NEXT_PUBLIC_UPLOAD_API_KEY
    : "free",
  maxFileCount: 1,
  mimeTypes: ["image/jpeg", "image/png", "image/jpg", "image/webp"],
  editor: { images: { crop: false } },
  // styles: {
  //   colors: {
  //     primary: "#2563EB", // Primary buttons & links
  //     error: "#d23f4d", // Error messages
  //     shade100: "#fff", // Standard text
  //     shade200: "#fffe", // Secondary button text
  //     shade300: "#fffd", // Secondary button text (hover)
  //     shade400: "#fffc", // Welcome text
  //     shade500: "#fff9", // Modal close button
  //     shade600: "#fff7", // Border
  //     shade700: "#fff2", // Progress indicator background
  //     shade800: "#fff1", // File item background
  //     shade900: "#ffff", // Various (draggable crop buttons, etc.)
  //   },
  // },
};

export const navbarConfig = [
  {
    name: "AI 图片修复",
    route: "/photoRestore",
  },
  {
    name: "AI 室内设计师",
    route: "/roomRedesign",
  },
];
