import { SITE } from "@/lib/site-config";

export default function Footer() {
  return (
    <footer className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 border-t border-line px-6 py-8 text-xs text-muted sm:flex-row sm:items-center sm:px-10">
      <span className="font-mono">
        © {new Date().getFullYear()} SikmaCamp
      </span>
      <span className="font-mono">{SITE.serverIp}</span>
    </footer>
  );
}
