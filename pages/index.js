import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [questionInput, setQuestionInput] = useState("");
  const [result, setResult] = useState();
	const [isLoading, setIsLoading] = useState(false);
 
  async function onSubmit(event) {
    event.preventDefault();
		setResult("");
		setIsLoading(true);
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: questionInput }),
      });
			
      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResult(`问题：${questionInput}${data.result}`);
			setIsLoading(false);
      setQuestionInput("");
    } catch(error) {
      // Consider implementing your own error handling logic here
			setIsLoading(false);
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div>
      <Head>
        <title>OpenAI Quickstart</title>
        <link rel="icon" href="/openai-icon.png" />
      </Head>

      <main className={styles.main}>
        <img src="/openai-icon.png" className={styles.icon} />
        <h3>请输入您的问题</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="question"
            placeholder="输入你的问题"
            value={questionInput}
            onChange={(e) => setQuestionInput(e.target.value)}
          />
          <input type="submit" value="提交" />
        </form>
				{isLoading && <p className={styles.loading}>loading...</p>}  
      </main>
			<div className={styles.result}>{result}</div>
    </div>
  );
}
