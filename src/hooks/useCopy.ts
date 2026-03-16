import { useState } from 'react';

export default function useCopy() {
  const [copied, setCopied] = useState(false);
  function copy(str: string) {
    navigator.clipboard.writeText(str);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  }

  return { copied, copy };
}
