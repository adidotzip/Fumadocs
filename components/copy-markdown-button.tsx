'use client';

import { useState } from 'react';
import { Copy } from '@/components/animate-ui/icons/copy';
import { Check } from '@/components/animate-ui/icons/check';
import { cn } from '@/lib/cn';

const cache = new Map<string, string>();

export function CopyMarkdownButton({ markdownUrl, className }: { markdownUrl: string; className?: string }) {
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  async function copyMarkdown() {
    if (loading) return;
    setLoading(true);
    try {
      let content = cache.get(markdownUrl);
      if (!content) {
        const response = await fetch(markdownUrl);
        if (!response.ok) throw new Error(`Failed to fetch markdown: ${response.status}`);
        content = await response.text();
        cache.set(markdownUrl, content);
      }
      await navigator.clipboard.writeText(content);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button type="button" disabled={loading} aria-live="polite" onClick={copyMarkdown}
      className={cn('inline-flex h-9 shrink-0 items-center gap-2 rounded-xl border border-fd-border bg-fd-background px-3 text-xs font-medium text-fd-foreground transition-colors hover:bg-fd-accent hover:text-fd-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fd-ring disabled:pointer-events-none disabled:opacity-50', className)}>
      {copied ? <Check size={14} animate /> : <Copy size={14} animateOnHover />}
      {copied ? 'Copied Markdown' : 'Copy Markdown'}
    </button>
  );
}
