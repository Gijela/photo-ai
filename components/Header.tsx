import { Col, Row } from "antd";
import Link from "next/link";

export default function Header() {
  return (
    <Row
      align={"middle"}
      className="fixed z-50 top-0 w-screen px-3 h-14 lg:h-20 bg-white lg:bg-transparent"
    >
      <Col className="flex items-center text-2xl text-blue-600 font-extrabold">
        <img src="/avatar.jpeg" alt="avatar" className="w-12 h-12" />
        <span className="hidden lg:inline ml-1">AI 超人</span>
      </Col>
      <Col className="ml-8 text-lg">
        <Link className="hover:text-blue-600" href="/">
          图片AI修复
        </Link>
      </Col>
      <Col className="ml-8 text-lg">
        <Link className="hover:text-blue-600" href="/roomGPT">
          房间装修AI设计
        </Link>
      </Col>
    </Row>
  );
}
