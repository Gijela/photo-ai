import { NextPage } from "next";
import React, { useState } from "react";
import { Col, Row } from "antd";
import { UploadDropzone } from "react-uploader";
import { UploadWidgetResult } from "uploader";
import LoadingDots from "../../components/LoadingDots";
import ResizablePanel from "../../components/ResizablePanel";
import PhotoCompareSlider from "../../components/PhotoCompareSlider";
import NumberOverview from "../../components/NumberOverview";
import Layout from "../layout";
import { uploaderConfig, uploaderOptions } from "./config";
import BtnControl from "../../components/BtnControl";

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

  const resetUrlToNull = () => {
    setOriginalUrl(null);
    setFixedUrl(null);
  };

  return (
    <Layout headTitle="AI超人 | AI 图片修复">
      <Row justify={"center"}>
        <Col
          lg={10}
          sm={20}
          xs={20}
          className="text-center pt-10 lg:text-left lg:pt-12"
        >
          <h1 className="font-bold text-4xl">
            AI 图片修复
            <br />
            <span className="inline-block mt-2" style={{ color: "#5555ff" }}>
              一键模糊图片变清晰
            </span>
          </h1>
          <p className="mt-4 text-base">
            <span style={{ color: "#8C8B99" }}>
              基于腾讯出品的 AI 模型 GFPGAN
              进行图片修复，只需上传图片即可体验模糊图片秒变清晰。——对人脸图像有奇效
            </span>
          </p>

          <Row className="mt-4 lg:mt-8">
            <ResizablePanel>
              {originalUrl ? (
                <BtnControl
                  processedUrl={fixedUrl}
                  photoName={photoName}
                  resetUrlToNull={resetUrlToNull}
                  uploadCss="w-64 lg:w-56 h-12 lg:h-16"
                  downloadCss="w-64 lg:w-56 h-12 lg:h-16 ml-2 lg:ml-4 mt-4 lg:mt-0"
                />
              ) : (
                <div className="w-full flex justify-center">
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
                </div>
              )}
            </ResizablePanel>
          </Row>
        </Col>
        <Col
          lg={10}
          sm={20}
          xs={20}
          className="flex justify-center lg:justify-end items-center mt-4 lg:mt-0"
        >
          <ResizablePanel>
            {!originalUrl ? (
              <PhotoCompareSlider
                originalUrl="/sample-originalPhoto.jpeg"
                processedUrl="/sample-fixedPhoto.jpeg"
                compareSliderCSS="w-10/12 lg:w-8/12 m-auto my-4"
              />
            ) : !fixedUrl ? (
              <div className="relative">
                <img
                  src={originalUrl}
                  className="rounded-2xl"
                  alt="original photo"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center rounded-2xl">
                  <span className="text-white font-medium">
                    安全检测已通过，图片修复中
                    <LoadingDots color="white" style="large" />
                  </span>
                </div>
              </div>
            ) : (
              <PhotoCompareSlider
                originalUrl={originalUrl}
                processedUrl={fixedUrl}
                compareSliderCSS="w-10/12 lg:w-8/12 m-auto my-4"
              />
            )}
          </ResizablePanel>
        </Col>
      </Row>
      <NumberOverview />
    </Layout>
  );
};

export default PhotoRestore;
