import Head from "next/head";
import Image from "next/image";
import { ReactNode, useState } from "react";
import type { MenuProps } from "antd";
import { Col, Row, Dropdown, Space } from "antd";
import Link from "next/link";
import { navbarConfig } from "../utils/constant";

interface ILayout {
  children: ReactNode;
  headTitle?: string;
}

export default function Layout({ children, headTitle }: ILayout) {
  const [hasOpenMenu, setHasOpenMenu] = useState<boolean>(false);
  const items: MenuProps["items"] = navbarConfig.map((navbar, idx) => ({
    key: idx,
    label: (
      <Link className="hover:text-blue-600" href={navbar.route}>
        {navbar.name}
      </Link>
    ),
  }));

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
        className="fixed z-50 top-0 w-screen px-3 h-14 lg:h-20 bg-slate-50"
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
        <Col className="hidden lg:block text-lg">
          {navbarConfig.map((navbar, idx) => (
            <Link
              key={idx}
              className="ml-8 hover:text-blue-600"
              href={navbar.route}
            >
              {navbar.name}
            </Link>
          ))}
        </Col>
        <Col flex={1} className="block lg:hidden text-end">
          <Space direction="vertical">
            <Space wrap>
              <Dropdown
                menu={{ items }}
                placement="bottom"
                onOpenChange={(open: boolean) => setHasOpenMenu(open)}
              >
                <Image
                  src={hasOpenMenu ? "/close.png" : "/more.png"}
                  width={hasOpenMenu ? 20 : 25}
                  height={hasOpenMenu ? 20 : 25}
                  className={`mt-[5px] ${hasOpenMenu ? "mr-[2.5px]" : ""}`}
                  alt="mobile read more btn"
                />
              </Dropdown>
            </Space>
          </Space>
        </Col>
      </Row>

      <main className="min-h-screen mx-auto flex flex-col pt-14 lg:pt-20">
        {children}
      </main>
    </div>
  );
}
