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
  const [isShared] = useState(router.asPath.includes('#fenxiang'));

  // 只加载对应ID的笔记（不自动跳转）
  useEffect(() => {
    if (id) {
      const savedText = localStorage.getItem(`note-${id}`) || '';
      setText(savedText);
    }
  }, [id]);

  // 自动保存当前ID的笔记
  useEffect(() => {
    if (id && text !== '') {
      localStorage.setItem(`note-${id}`, text);
    }
  }, [text, id]);

  const handleShare = () => {
    if (!id) return;
    navigator.clipboard.writeText(`${window.location.origin}/${id}#fenxiang`);
    alert(`已复制分享链接：/${id}#fenxiang`);
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
              placeholder={id ? `正在编辑 ${id}` : "输入内容后分享将自动生成ID"}
              autoFocus
            />
            <button onClick={handleShare} disabled={!id}>
              {id ? "🔗 复制分享链接" : "先输入内容再分享"}
            </button>
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
