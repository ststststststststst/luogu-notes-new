 { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

export default function SharedNote({ noteId }) {
  const [content, setContent] = useState('');

  useEffect(() => {
    setContent(localStorage.getItem(`note-${noteId}`) || '');
  }, [noteId]);

  return (
    <div className="preview-only">
      <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
        {content}
      </ReactMarkdown>
    </div>
  );
}

export async function getServerSideProps(context) {
  return { props: { noteId: context.params.id } };
}
