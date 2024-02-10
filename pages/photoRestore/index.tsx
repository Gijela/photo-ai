import React from "react";
import Image from "next/image";
import { NextPage } from "next";
import { useState } from "react";
import { Button, Col, Row } from "antd";
import { UploadDropzone } from "react-uploader";
import { UploadWidgetResult } from "uploader";
import { AnimatePresence, motion } from "framer-motion";
import LoadingDots from "../../components/LoadingDots";
import ResizablePanel from "../../components/ResizablePanel";
import PhotoCompareSlider from "../../components/PhotoCompareSlider";
import NumberOverview from "../../components/NumberOverview";
import appendNewToName from "../../utils/appendNewToName";
import downloadPhoto from "../../utils/downloadPhoto";
import Layout from "../layout";
import { uploaderConfig, uploaderOptions } from "./config";

const PhotoRestore: NextPage = () => {
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  const [fixedUrl, setFixedUrl] = useState<string | null>(null);
  const [photoName, setPhotoName] = useState<string | null>(null);

  async function generatePhoto(fileUrl: string) {
    await new Promise((resolve) => setTimeout(resolve, 500)); // 等待时间，模拟延时效果
    const res = await fetch("/api/photoRestore/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ imageUrl: fileUrl }),
    });

    let newPhoto = await res.json();
    if (res.status === 200) setFixedUrl(newPhoto);
  }

  return (
    <Layout>
      <Row justify={"center"} style={{ minHeight: "35rem" }}>
        <Col
          lg={10}
          sm={20}
          xs={20}
          className="text-center pt-10 lg:text-left lg:pt-20"
        >
          <h1 className="font-bold text-4xl">
            AI 图片修复
            <br />
            <span className="inline-block mt-2" style={{ color: "#5555ff" }}>
              一键免费修复图片
            </span>
          </h1>
          <p className="mt-4 text-base">
            <span style={{ color: "#8C8B99" }}>
              基于腾讯出品的 AI 模型 GFPGAN
              进行图片修复，只需上传图片即可体验模糊图片秒变清晰。——对人脸图像有奇效
            </span>
          </p>

          <Row className="mt-4 lg:mt-10">
            {originalUrl ? (
              <div className="flex flex-wrap lg:flex-nowrap justify-center lg:justify-start m-auto lg:m-0">
                <Button
                  type="primary"
                  onClick={() => {
                    setOriginalUrl(null);
                    setFixedUrl(null);
                  }}
                  ghost
                  className="w-64 lg:w-56 h-12 ls:h-16 text-xl rounded-full font-medium mt-4 lg:mt-0"
                >
                  上传新图片
                </Button>
                <Button
                  disabled={!fixedUrl}
                  type="primary"
                  onClick={() => {
                    downloadPhoto(fixedUrl!, appendNewToName(photoName!));
                  }}
                  ghost
                  className="w-64 lg:w-56 h-12 ls:h-16 text-xl rounded-full font-medium mt-4 lg:mt-0 ml-2 lg:ml-4"
                >
                  下载图片
                </Button>
              </div>
            ) : (
              <ResizablePanel>
                <AnimatePresence mode="wait">
                  <motion.div className="w-full flex justify-center">
                    <UploadDropzone
                      uploader={uploaderConfig}
                      options={uploaderOptions}
                      onUpdate={(files: UploadWidgetResult[]) => {
                        if (!files.length) return;
                        setPhotoName(files[0].originalFile.originalFileName);
                        setOriginalUrl(
                          files[0].fileUrl.replace("raw", "thumbnail")
                        );
                        generatePhoto(
                          files[0].fileUrl.replace("raw", "thumbnail")
                        );
                      }}
                      width="670px"
                      height="250px"
                    />
                  </motion.div>
                </AnimatePresence>
              </ResizablePanel>
            )}
          </Row>
        </Col>
        <Col
          lg={10}
          sm={20}
          xs={20}
          className="flex justify-center lg:justify-end items-center p-5 mt-4 lg:mt-0"
        >
          {!originalUrl ? (
            <PhotoCompareSlider
              originalUrl="/sample-originalPhoto.jpeg"
              fixedUrl="/sample-fixedPhoto.jpeg"
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
                  安全检测已通过，图片修复中
                  <LoadingDots color="white" style="large" />
                </span>
              </div>
            </div>
          ) : (
            <PhotoCompareSlider originalUrl={originalUrl} fixedUrl={fixedUrl} />
          )}
        </Col>
      </Row>
      <NumberOverview />
    </Layout>
  );
};

export default PhotoRestore;
