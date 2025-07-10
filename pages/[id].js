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

  // 加载/初始化笔记
  useEffect(() => {
    if (id) {
      setText(localStorage.getItem(`note-${id}`) || '');
      setIsShared(window.location.hash === '#fenxiang');
    } else {
      router.push(`/${Math.random().toString(36).substring(2, 8)}`);
    }
  }, [id]);

  // 自动保存
  useEffect(() => {
    if (id && text) localStorage.setItem(`note-${id}`, text);
  }, [text, id]);

  const handleShare = () => {
    navigator.clipboard.writeText(`${window.location.origin}/${id}#fenxiang`);
    alert('已复制分享链接！');
  };

  return (
    <div className="container">
      <Head>
        <title>{id ? `${id} - note.luogu.xyz` : '加载中...'}</title>
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
              placeholder="支持Markdown和LaTeX公式：\n- 行内公式 $E=mc^2$\n- 块公式 $$\int_a^b f(x)dx$$"
              autoFocus
            />
            <button onClick={handleShare}>🔗 分享</button>
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
