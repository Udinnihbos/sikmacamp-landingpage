"use client";

import { useState } from "react";

export default function CopyIp({ ip }: { ip: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(ip);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // clipboard not available; fail silently
    }
  }

  return (
    <button
      onClick={handleCopy}
      className="group flex w-full items-center justify-between gap-3 rounded-lg border border-line bg-surface px-4 py-3 text-left transition-colors hover:border-brass/50 sm:w-auto"
      aria-label="Salin IP server"
    >
      <span className="flex items-center gap-3">
        <span className="font-mono text-xs uppercase tracking-widest text-muted">
          IP
        </span>
        <span className="font-mono text-sm text-ink sm:text-base">{ip}</span>
      </span>
      <span className="font-mono text-xs uppercase tracking-widest text-brass transition-colors group-hover:text-brasshi">
        {copied ? "Tersalin ✓" : "Salin"}
      </span>
    </button>
  );
}
