
import React from "react";
import 'katex/dist/katex.min.css';
import TeX from '@matejmazur/react-katex';
import DOMPurify from 'dompurify';

const KatexMessage = ({ content }) => {
  const safeContent = DOMPurify.sanitize(content);
  const parts = safeContent.split(/(\$\$.*?\$\$|\$.*?\$)/g);
  
  return (
    <span>
      {parts.map((part, i) => {
        if (part.startsWith('$$') && part.endsWith('$$')) {
          const formula = part.substring(2, part.length - 2);
          return <TeX key={i} math={formula} block />;
        } else if (part.startsWith('$') && part.endsWith('$')) {
          const formula = part.substring(1, part.length - 1);
          return <TeX key={i} math={formula} />;
        }
        return <span key={i}>{part}</span>;
      })}
    </span>
  );
};

export default React.memo(KatexMessage);
