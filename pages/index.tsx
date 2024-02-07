import { NextPage } from "next";
import Head from "next/head";
import RestorePicture from "./RestorePicture";
import Header from "../components/Header";
import NumberOverview from "../components/NumberOverview";

const Home: NextPage = () => {
  return (
    <div
      className="bg-no-repeat bg-top bg-cover"
      style={{ backgroundImage: `url(/bg.jpg)` }}
    >
      <Head>
        <title>免费高效AI图像修复：一键模糊照片变超清</title>
      </Head>

      <Header />

      <div
        style={{ backgroundImage: `url(/cell.svg)` }}
        className="block min-h-screen w-screen absolute inset-x-0 opacity-40"
      ></div>

      <main className="min-h-screen mx-auto flex flex-col pt-14 lg:pt-20">
        <RestorePicture />

        <NumberOverview />
      </main>
    </div>
  );
};

export default Home;
