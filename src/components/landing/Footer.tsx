import Link from "next/link";

export function Footer() {
  return (
    <footer className="py-12 px-6 bg-[#0B1020] border-t border-white/5">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <span className="text-white text-sm font-bold">D</span>
            </div>
            <span className="text-white font-semibold">Dream Home AI</span>
            <span className="text-white/20">•</span>
            <span className="text-white/30 text-sm">by Snaphomz</span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm text-white/40">
            <Link href="/" className="hover:text-white/70 transition-colors">Home</Link>
            <Link href="/quiz" className="hover:text-white/70 transition-colors">Take Quiz</Link>
            <a href="https://snaphomz.com" target="_blank" rel="noopener noreferrer" className="hover:text-white/70 transition-colors">Snaphomz</a>
          </div>

          {/* Social */}
          <div className="flex items-center gap-4">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-white/60 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/5 text-center">
          <p className="text-white/20 text-sm">
            © {new Date().getFullYear()} Dream Home AI — Snaphomz Hackathon 2.0
          </p>
        </div>
      </div>
    </footer>
  );
}
