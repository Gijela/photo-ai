import { Col, Row } from "antd";
const fixedAIInfo = [
  {
    total: 6.7,
    unit: "亿+",
    desc: "使用6.7亿张图片训练模型",
  },
  {
    total: 8.2,
    unit: "万+",
    desc: "已为8.2万+人提供服务",
  },
  {
    total: 35.7,
    unit: "万+",
    desc: "已修复35.7万+张模糊图片",
  },
  {
    total: 98,
    unit: "%",
    desc: "获得98%+的好评率",
  },
];

export default function NumberOverview() {
  return (
    <>
      <Row
        style={{
          boxShadow: "0 10px 30px rgba(182,193,255,.2)",
          backdropFilter: `blur(2px)`,
          borderRadius: "2rem",
          borderWidth: "1px",
        }}
        className="2xl:mt-6 max-w-full mx-auto h-max border-white flex items-center justify-center relative text-center flex-col lg:flex-row lg:py-5 my-4"
      >
        {fixedAIInfo.map((item, index) => (
          <Col key={index} className="min-w-40 w-max mx-10 px-3 mt-7 lg:mt-0">
            <div
              style={{ color: `rgba(45,45,51,1)` }}
              className="font-bold text-lg lg:text-xl"
            >
              <span className="text-4xl lg:text-5xl text-4xl">
                {item.total}
              </span>
              {item.unit}
            </div>
            <div
              style={{ color: `rgba(140,139,153,1)` }}
              className="text-sm lg:text-base"
            >
              {item.desc}
            </div>
          </Col>
        ))}
      </Row>
    </>
  );
}
