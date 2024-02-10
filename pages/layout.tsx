import Head from "next/head";
import { ReactNode } from "react";
import { Col, Row } from "antd";
import Link from "next/link";

interface ILayout {
  children: ReactNode;
  headTitle?: string;
}

export default function Layout({ children, headTitle }: ILayout) {
  return (
    <div
      className="bg-no-repeat bg-top bg-cover"
      style={{ backgroundImage: `url(/bg.jpg)` }}
    >
      <Head>
        <title>{headTitle || "AI超人 | 最新最全AI工具实测"}</title>
      </Head>

      {/* bg-cell */}
      <div
        style={{ backgroundImage: `url(/cell.svg)` }}
        className="block min-h-screen w-screen absolute inset-x-0 opacity-40"
      ></div>

      {/* Header */}
      <Row
        align={"middle"}
        className="fixed z-50 top-0 w-screen px-3 h-14 lg:h-20 bg-white lg:bg-transparent"
      >
        <Col className="text-2xl">
          <Link
            href="/"
            className="flex items-center text-blue-600 font-extrabold"
          >
            <img src="/favicon.png" alt="favicon" className="w-12 h-12" />
            <span className="hidden lg:inline ml-1">AI 超人</span>
          </Link>
        </Col>
        <Col className="ml-8 text-lg">
          <Link className="hover:text-blue-600" href="/photoRestore">
            AI 图片修复
          </Link>
        </Col>
        <Col className="ml-8 text-lg">
          <Link className="hover:text-blue-600" href="/roomRedesign">
            AI 室内设计师
          </Link>
        </Col>
      </Row>

      <main className="min-h-screen mx-auto flex flex-col pt-14 lg:pt-20">
        {children}
      </main>
    </div>
  );
}
