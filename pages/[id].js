
import { useState, useEffect } from 'react';
import Head from 'next/head';
import ReactMarkdown from 'react-markdown';
import { useRouter } from 'next/router';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';

export default function NotePage() {
  const router = useRouter();
  const { id } = router.query;
  const [text, setText] = useState('');
  const [isShared, setIsShared] = useState(false);

  useEffect(() => {
    if (id) {
      const savedNote = localStorage.getItem(`note-${id}`);
      if (savedNote !== null) {
        setText(savedNote);
      }
      setIsShared(window.location.hash === '#fenxiang');
    }
  }, [id]);

  const handleSave = () => {
    if (id && text) localStorage.setItem(`note-${id}`, text);
  };

  const handleShare = () => {
    if (!id) return;
    navigator.clipboard.writeText(`${window.location.origin}/${id}#fenxiang`);
    alert('已复制分享链接！');
  };

  return (
    <div className="container">
      <Head>
        <title>{id ? `${id} - 笔记` : '新笔记'}</title>
      </Head>

      {isShared ? (
        <div className="preview-only">
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
              placeholder="输入Markdown内容..."
              autoFocus
            />
            {id && <button onClick={handleShare}>🔗 分享</button>}
          </div>
          <div className="preview">
            <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
              {text}
            </ReactMarkdown>
          </div>
        </>
      )}
    </div>
  );
}
