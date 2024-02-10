import { Uploader } from "uploader";
import NSFWPredictor from "../../utils/nsfwCheck";

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
