
import { useState } from 'react';
import Head from 'next/head';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';

export default function NotePage() {
  const [text, setText] = useState('');
  const [noteId, setNoteId] = useState(null);

  const handleShare = () => {
    const id = Math.random().toString(36).substring(2, 8);
    localStorage.setItem(`note-${id}`, text);
    navigator.clipboard.writeText(`${window.location.origin}/${id}#fenxiang`);
    setNoteId(id);
    alert(`已创建并复制分享链接：/${id}#fenxiang`);
  };

  return (
    <div className="container">
      <Head>
        <title>note.luogu.xyz</title>
      </Head>
      
      <div className="editor">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="输入Markdown内容...完成后点击分享按钮生成链接"
        />
        <button onClick={handleShare}>生成分享链接</button>
        {noteId && <div className="note-id">笔记ID: {noteId}</div>}
      </div>
      <div className="preview">
        <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
          {text}
        </ReactMarkdown>
      </div>
    </div>
  );
}
