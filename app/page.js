import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Premium Navigation */}
      <nav className="fixed w-full bg-white/80 backdrop-blur-lg z-50 border-b border-orange-100">
        <div className="flex justify-between items-center px-4 sm:px-6 lg:px-8 py-4 sm:py-6 max-w-7xl mx-auto">
          <div className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">
            Gita AI
          </div>
          <button className="lg:hidden p-2 text-gray-600 hover:text-orange-500 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
          <div className="hidden lg:flex gap-8 items-center">
            <a href="#features" className="text-gray-600 hover:text-orange-500 transition-colors text-sm font-medium">Features</a>
            <a href="#about" className="text-gray-600 hover:text-orange-500 transition-colors text-sm font-medium">About</a>
            <a href="#pricing" className="text-gray-600 hover:text-orange-500 transition-colors text-sm font-medium">Pricing</a>
            <a
              href="mailto:solovpxoffical@gmail.com?subject=Feedback%20for%20Gita%20AI&body=Dear%20Team,%0A%0AI%20would%20like%20to%20share%20my%20feedback%20about%20Gita%20AI:%0A%0A"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-orange-50 border border-orange-200 text-orange-600 hover:bg-orange-100 hover:border-orange-300 transition-all text-sm font-medium group"
            >
              <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
              </svg>
              Share Feedback
            </a>
            <Link href="/chat" className="bg-orange-500 text-white px-6 py-2.5 rounded-full hover:bg-orange-600 transition-all shadow-lg hover:shadow-orange-200 text-sm font-medium">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="pt-28 sm:pt-36 pb-20 px-4 relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200%] sm:w-[1000px] h-[1000px] bg-gradient-to-b from-orange-100/50 to-transparent rounded-full blur-3xl -z-10 opacity-50"></div>
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5"></div>

          <div className="max-w-6xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-50 to-orange-100/50 rounded-full text-orange-600 text-sm font-medium mb-8">
              <span className="text-xl">🕉️</span>
              <span>Timeless Wisdom Through AI</span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-600 via-orange-500 to-orange-400">
                Experience Divine Guidance
              </span>
              <br />
              <span className="text-orange-400 text-2xl sm:text-3xl">through AI-Powered Conversations</span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-10">
              Unlock the profound wisdom of the <strong className="text-orange-600">Bhagavad Gita</strong> with personalized, AI-guided dialogue tailored to your journey.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/chat" className="w-full sm:w-auto">
                <button className="group bg-orange-500 text-white px-8 sm:px-10 py-4 sm:py-5 rounded-full hover:bg-orange-600 shadow-xl hover:shadow-orange-200 text-base sm:text-lg font-semibold flex items-center justify-center gap-2">
                  Start Your Journey
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
              </Link>

              <a href="https://github.com/varunisrani/gitaaii" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                <button className="w-full flex items-center justify-center gap-2 bg-white text-orange-500 px-8 sm:px-10 py-4 sm:py-5 rounded-full hover:bg-orange-50 border-2 border-orange-200 text-base sm:text-lg font-semibold shadow">
                  <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2..." />
                  </svg>
                  GitHub
                </button>
              </a>
            </div>

            <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-orange-500">1000+</div>
                <div className="text-sm text-gray-600">Spiritual Conversations</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-orange-500">24/7</div>
                <div className="text-sm text-gray-600">Divine Guidance</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-orange-500">100%</div>
                <div className="text-sm text-gray-600">Open Source</div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 px-4 bg-orange-50/30">
          <div className="max-w-7xl mx-auto text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-orange-600 mb-4">Core Features</h2>
            <p className="text-gray-600 max-w-xl mx-auto">Empowering seekers through interactive and immersive spiritual tools.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* ...your existing 3 feature cards here... */}
          </div>
        </section>

        {/* Premium CTA */}
        <section className="py-24 px-4 bg-gradient-to-r from-orange-500 to-orange-600 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
          <div className="max-w-4xl mx-auto text-center relative z-10 text-white">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-sm font-medium mb-6 backdrop-blur-sm">
              <span className="text-xl">🕉️</span>
              <span>Join Our Community</span>
            </div>

            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              Transform Your Life with 
              <span className="ml-2 bg-clip-text text-transparent bg-gradient-to-r from-orange-200 to-orange-100">
                Divine Guidance
              </span>
            </h2>

            <p className="text-orange-100/90 text-lg sm:text-xl mb-10 max-w-2xl mx-auto">
              Thousands are walking a spiritual path empowered by wisdom and technology.
            </p>

            <Link href="/chat">
              <button className="group bg-white text-orange-500 px-10 py-4 rounded-full text-lg font-semibold hover:bg-orange-50 shadow-lg hover:shadow-black/20 transition-transform hover:-translate-y-1 flex items-center gap-3">
                Begin Your Spiritual Journey
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-orange-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* ...your existing footer content here... */}
          </div>
          <div className="py-6 border-t border-orange-100 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-600 gap-4">
            <div>© 2024 Gita AI. Open source project with ❤️</div>
            <div className="flex gap-6">
              <a href="#">Terms</a>
              <a href="#">Privacy</a>
              <a href="#">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
