
import { useState, useEffect } from 'react';
import Head from 'next/head';
import ReactMarkdown from 'react-markdown';
import { useRouter } from 'next/router';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';
import 'katex/dist/katex.min.css';

export default function NotePage() {
  const router = useRouter();
  const { id } = router.query;
  const [text, setText] = useState('');
  const [isShared, setIsShared] = useState(false);

  useEffect(() => {
    const loadNote = () => {
      if (id) {
        const note = localStorage.getItem(`note-${id}`) || '';
        setText(note);
        setIsShared(router.asPath.includes('#fenxiang'));
      } else {
        const newId = Math.random().toString(36).substring(2, 8);
        router.push(`/${newId}`);
      }
    };
    loadNote();
  }, [id, router]);

  const handleSave = () => {
    if (id) localStorage.setItem(`note-${id}`, text);
  };

  const handleShare = () => {
    handleSave();
    navigator.clipboard.writeText(`${window.location.origin}/${id}#fenxiang`);
    alert('分享链接已复制到剪贴板！');
  };

  return (
    <div className="container">
      <Head>
        <title>{id ? `${id} - note.luogu.xyz` : 'note.luogu.xyz'}</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.0/dist/katex.min.css" />
      </Head>
      
      {isShared ? (
        <div className="preview">
          <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
            {text}
          </ReactMarkdown>
        </div>
      ) : (
        <>
          <div className="editor">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              onBlur={handleSave}
              placeholder="输入Markdown内容...支持$$公式$$和$行内公式$"
              autoFocus
            />
            <button onClick={handleShare}>分享</button>
          </div>
          <div className="preview">
            <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
              {text}
            </ReactMarkdown>
          </div>
        </>
      )}

      <style jsx>{`
        .container { display: flex; height: 100vh; }
        .editor, .preview { flex: 1; padding: 20px; overflow-y: auto; }
        textarea { width: 100%; height: calc(100vh - 60px); border: none; padding: 10px; 
          font-size: 16px; resize: none; outline: none; font-family: monospace; }
        button { margin-top: 10px; padding: 8px 16px; background: #0070f3; color: white; 
          border: none; border-radius: 4px; cursor: pointer; }
        .preview { border-left: 1px solid #eee; }
        .katex { font-size: 1.05em; }
      `}</style>
    </div>
  );
}
