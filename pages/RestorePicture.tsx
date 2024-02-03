import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { UploadDropzone } from "react-uploader";
import { Uploader } from "uploader";
import LoadingDots from "../components/LoadingDots";
import ResizablePanel from "../components/ResizablePanel";
import appendNewToName from "../utils/appendNewToName";
import downloadPhoto from "../utils/downloadPhoto";
import NSFWPredictor from "../utils/nsfwCheck";
import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from "react-compare-slider";

type OriginalFile = {
  originalFileName: string;
  fileUrl: string;
};

type FileInfo = {
  originalFile: OriginalFile;
};

const uploaderConfig = Uploader({
  apiKey: !!process.env.NEXT_PUBLIC_UPLOAD_API_KEY
    ? process.env.NEXT_PUBLIC_UPLOAD_API_KEY
    : "free",
});

const uploaderOptions = {
  maxFileCount: 1,
  mimeTypes: ["image/jpeg", "image/png", "image/jpg", "image/webp"],
  editor: { images: { crop: false } },
  onValidate: async (file: File): Promise<undefined | string> => {
    let isSafe = await NSFWPredictor.isSafeImg(file);
    return isSafe ? undefined : "文件安全检验未通过";
  },
};

export default function RestorePicture() {
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  const [fixedUrl, setFixedUrl] = useState<string | null>(null);
  const [photoName, setPhotoName] = useState<string | null>(null);

  async function generatePhoto(fileUrl: string) {
    await new Promise((resolve) => setTimeout(resolve, 500)); // 等待时间，模拟延时效果
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ imageUrl: fileUrl }),
    });

    let newPhoto = await res.json();
    if (res.status === 200) setFixedUrl(newPhoto);
  }

  const uploadFile = (uploadedFile: FileInfo[]) => {
    if (!uploadedFile.length) return;

    const file = uploadedFile[0].originalFile;
    setPhotoName(file.originalFileName);
    setOriginalUrl(file.fileUrl.replace("raw", "thumbnail"));
    generatePhoto(file.fileUrl.replace("raw", "thumbnail"));
  };

  return (
    <div className="w-full flex-1 flex flex-col items-center box-border pt-12">
      <ResizablePanel>
        <AnimatePresence mode="wait">
          <motion.div className="w-full flex flex-col justify-between items-center">
            {/* 按钮区域 */}
            <div className="flex space-x-2 justify-center mb-5">
              {originalUrl && (
                <button
                  onClick={() => {
                    setOriginalUrl(null);
                    setFixedUrl(null);
                  }}
                  className="bg-black rounded-full text-white font-medium px-4 py-2 hover:bg-black/80 transition"
                >
                  上传新图片
                </button>
              )}
              {fixedUrl && (
                <button
                  onClick={() => {
                    downloadPhoto(fixedUrl, appendNewToName(photoName!));
                  }}
                  className="bg-white rounded-full text-black border font-medium px-4 py-2 hover:bg-gray-100 transition"
                >
                  下载图片
                </button>
              )}
            </div>

            {/*
              1）没有原始图片就显示上传控件，
              2）有原始图片但没有修复后的图片，显示原始图片 + 蒙层 + loading
              3) 二则都有，显示前后图片对比
            */}
            {!originalUrl ? (
              <UploadDropzone
                uploader={uploaderConfig}
                options={uploaderOptions}
                onUpdate={(uploadedFile: FileInfo[]) =>
                  uploadFile(uploadedFile)
                }
                width="670px"
                height="250px"
              />
            ) : !fixedUrl ? (
              <div className="relative">
                <Image
                  src={originalUrl}
                  className="rounded-2xl"
                  alt="original photo"
                  width={475}
                  height={475}
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center rounded-2xl">
                  <span className="text-white font-medium">
                    修复中
                    <LoadingDots color="white" style="large" />
                  </span>
                </div>
              </div>
            ) : (
              <ReactCompareSlider
                itemOne={<ReactCompareSliderImage src={originalUrl!} />}
                itemTwo={<ReactCompareSliderImage src={fixedUrl} />}
                className="flex w-[475px]"
              />
            )}
          </motion.div>
        </AnimatePresence>
      </ResizablePanel>
    </div>
  );
}
