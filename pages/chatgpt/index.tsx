import Layout from "../layout";

export default function ChatGPT() {
  return (
    <Layout headTitle="AI超人 | ChatGPT">
      <div className="flex-1 flex relative">
        <iframe className="flex-1" src="https://gpt.devin.ren/"></iframe>
      </div>
    </Layout>
  );
}
