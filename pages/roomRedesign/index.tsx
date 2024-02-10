import { NextPage } from "next";
import Image from "next/image";
import { useState } from "react";
import { UrlBuilder } from "@bytescale/sdk";
import { UploadDropzone } from "@bytescale/upload-widget-react";
import PhotoCompareSlider from "../../components/PhotoCompareSlider";
import LoadingDots from "../../components/LoadingDots";
import ResizablePanel from "../../components/ResizablePanel";
import Toggle from "../../components/Toggle";
import DropDown from "../../components/DropDown";
import BtnControl from "../../components/BtnControl";
import {
  roomType,
  rooms,
  themeType,
  themes,
  optionsMap,
} from "../../utils/dropdownTypes";
import Layout from "../layout";
import { options } from "./config";

const RoomRedesign: NextPage = () => {
  const [originalPhoto, setOriginalPhoto] = useState<string | null>(null);
  const [restoredImage, setRestoredImage] = useState<string | null>(null);
  const [sideBySide, setSideBySide] = useState<boolean>(false);
  const [photoName, setPhotoName] = useState<string | null>(null);
  const [theme, setTheme] = useState<themeType>("Modern");
  const [room, setRoom] = useState<roomType>("Living Room");

  async function generatePhoto(fileUrl: string) {
    await new Promise((resolve) => setTimeout(resolve, 200));
    const res = await fetch("api/roomRedesign/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ imageUrl: fileUrl, theme, room }),
    });

    let newPhoto = await res.json();
    if (res.status === 200) setRestoredImage(newPhoto?.image[1]);
  }

  const resetUrlToNull = () => {
    setOriginalPhoto(null);
    setRestoredImage(null);
  };

  return (
    <Layout headTitle="AI超人 | AI 室内设计师">
      <div className="p-4 text-center">
        <h1 className="mt-5 text-4xl lg:text-6xl font-bold">
          在几秒内<span className="text-blue-600">重新设计</span>您的房间
        </h1>
        <ResizablePanel>
          <div className="flex flex-col justify-between items-center w-full mt-5">
            {/* design options seleted */}
            {!restoredImage && (
              <>
                <div className="space-y-4 w-full max-w-sm">
                  <div className="flex mt-3 items-center space-x-3">
                    <Image
                      src="/number-1-white.svg"
                      width={30}
                      height={30}
                      alt="1 icon"
                    />
                    <p className="text-left font-medium">选择您的房间主题</p>
                  </div>
                  <DropDown
                    theme={theme}
                    setTheme={(newTheme) => setTheme(newTheme as typeof theme)}
                    themes={themes}
                  />
                </div>
                <div className="space-y-4 w-full max-w-sm">
                  <div className="flex mt-10 items-center space-x-3">
                    <Image
                      src="/number-2-white.svg"
                      width={30}
                      height={30}
                      alt="1 icon"
                    />
                    <p className="text-left font-medium">选择您的房间类型</p>
                  </div>
                  <DropDown
                    theme={room}
                    setTheme={(newRoom) => setRoom(newRoom as typeof room)}
                    themes={rooms}
                  />
                </div>
                <div className="my-4 w-full max-w-sm">
                  <div className="flex mt-6 w-96 items-center space-x-3">
                    <Image
                      src="/number-3-white.svg"
                      width={30}
                      height={30}
                      alt="1 icon"
                    />
                    <p className="text-left font-medium">上传您的房间图片</p>
                  </div>
                </div>
              </>
            )}

            {/* conditional render */}
            {!originalPhoto ? (
              <UploadDropzone
                options={options}
                onUpdate={({ uploadedFiles }) => {
                  if (uploadedFiles.length !== 0) {
                    const image = uploadedFiles[0];
                    const imageName = image.originalFile.originalFileName;
                    const imageUrl = UrlBuilder.url({
                      accountId: image.accountId,
                      filePath: image.filePath,
                      options: {
                        transformation: "preset",
                        transformationPreset: "thumbnail",
                      },
                    });
                    setPhotoName(imageName);
                    setOriginalPhoto(imageUrl);
                    generatePhoto(imageUrl);
                  }
                }}
                width="670px"
                height="250px"
              />
            ) : !restoredImage ? (
              <>
                <button
                  disabled
                  className="bg-blue-500 rounded-full text-white font-medium px-4 py-2 my-5 hover:bg-blue-500/80 transition"
                >
                  <span className="pt-4">
                    拼命设计中
                    <LoadingDots color="white" style="large" />
                  </span>
                </button>
                <img
                  alt="original photo"
                  src={originalPhoto}
                  className="rounded-2xl h-96"
                />
              </>
            ) : (
              // have restoredImage
              <>
                <div>
                  这是 AI 为您重新设计的
                  <b>{optionsMap[theme].split("的")[0]}</b>主题
                  <b>{optionsMap[room]}</b>！
                </div>
                <div className="flex my-5">
                  <BtnControl
                    processedUrl={restoredImage}
                    photoName={photoName}
                    resetUrlToNull={resetUrlToNull}
                    uploadCss="text-base"
                    downloadCss="text-base ml-2 lg:ml-4"
                  />
                  <Toggle
                    className="flex items-center ml-2 lg:ml-4"
                    sideBySide={sideBySide}
                    setSideBySide={(newVal) => setSideBySide(newVal)}
                  />
                </div>

                {!sideBySide ? (
                  <div className="flex sm:space-x-4 sm:flex-row flex-col">
                    <div>
                      <h2 className="mb-1 font-medium text-lg">原设计</h2>
                      <img
                        alt="original photo"
                        src={originalPhoto}
                        className="rounded-2xl relative w-full h-96"
                      />
                    </div>
                    <div className="sm:mt-0 mt-8">
                      <h2 className="mb-1 font-medium text-lg">AI 设计</h2>
                      <a href={restoredImage} target="_blank" rel="noreferrer">
                        <img
                          alt="restored photo"
                          src={restoredImage}
                          className="rounded-2xl relative sm:mt-0 mt-2 cursor-zoom-in w-full h-96"
                        />
                      </a>
                    </div>
                  </div>
                ) : (
                  <PhotoCompareSlider
                    originalUrl={originalPhoto}
                    processedUrl={restoredImage}
                    compareSliderCSS="w-10/12 lg:w-1/2"
                  />
                )}
              </>
            )}
          </div>
        </ResizablePanel>
      </div>
    </Layout>
  );
};

export default RoomRedesign;
