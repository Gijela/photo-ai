import { NextPage } from "next";
import Head from "next/head";
import CountUp from "react-countup";
import RestorePicture from "./RestorePicture";

const Home: NextPage = () => {
  return (
    <div className="max-w-6xl mx-auto">
      <Head>
        <title>免费高效AI图像修复：一键模糊照片变超清</title>
      </Head>

      <main className="min-h-screen flex flex-col w-4/6 m-auto text-center">
        <h1 className="pt-14 font-bold sm:text-7xl">AI 图片修复</h1>
        <p className="pt-8 text-lg text-slate-700">
          实时修复、精准恢复，让您的图片效果更上一层楼！
          <span className="text-red-500">100% 免费，对人脸图像有奇效~</span>
        </p>
        <p className="text-slate-500">
          AI模型训练超{" "}
          <CountUp start={10000000} end={67500000} duration={2} separator="," />{" "}
          次运行, 本项目已修复{" "}
          <CountUp start={100000} end={325321} duration={2} separator="," />{" "}
          张照片
        </p>

        <RestorePicture />
      </main>
    </div>
  );
};

export default Home;
