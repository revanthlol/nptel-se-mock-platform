import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ code, language = 'c' }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative my-3 rounded-xl overflow-hidden border border-black/10 dark:border-white/10 bg-[#1E1E24] text-[#E4E4E7] shadow-sm font-mono text-[13px] leading-relaxed">
      <div className="flex items-center justify-between px-3.5 py-1.5 bg-[#17171C] border-b border-white/5 text-[11px] text-stone-400">
        <span className="uppercase tracking-wider font-semibold">{language}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 hover:text-white transition-colors py-0.5 px-1.5 rounded bg-white/5 hover:bg-white/10"
          title="Copy code"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>
      <div className="p-3.5 overflow-x-auto">
        <pre className="whitespace-pre">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
};
