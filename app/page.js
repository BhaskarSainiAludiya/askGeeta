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
          {/* Mobile Menu Button */}
          <button className="lg:hidden p-2 text-gray-600 hover:text-orange-500 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"/>
            </svg>
          </button>
          {/* Desktop Menu */}
          <div className="hidden lg:flex gap-8 items-center">
            <a href="#features" className="text-gray-600 hover:text-orange-500 transition-colors text-sm font-medium">Features</a>
            <a href="#about" className="text-gray-600 hover:text-orange-500 transition-colors text-sm font-medium">About</a>
            <a href="#pricing" className="text-gray-600 hover:text-orange-500 transition-colors text-sm font-medium">Pricing</a>
            <Link href="/chat" className="bg-orange-500 text-white px-6 py-2.5 rounded-full hover:bg-orange-600 transition-all shadow-lg hover:shadow-orange-200 text-sm font-medium">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="pt-28 sm:pt-32 pb-16 sm:pb-20 px-4 relative overflow-hidden">
          {/* Background Effects */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200%] sm:w-[1000px] h-[1000px] bg-gradient-to-b from-orange-100/50 to-transparent rounded-full blur-3xl -z-10 opacity-50"></div>
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5"></div>
          
          <div className="max-w-5xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-50 to-orange-100/50 rounded-full text-orange-600 text-sm font-medium mb-6 sm:mb-8 shadow-sm">
              <span className="text-xl">🕉️</span>
              <span>Discover Timeless Wisdom Through AI</span>
            </div>

            {/* Main Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 sm:mb-8 tracking-tight">
              <div className="inline-flex flex-col items-center">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-600 via-orange-500 to-orange-400 leading-tight mb-3">
                  Experience Divine Guidance
                </span>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-orange-400 leading-tight text-[0.8em] sm:text-[0.7em]">
                  Through Advanced AI
                </span>
              </div>
            </h1>

            {/* Description */}
            <p className="text-lg sm:text-xl text-gray-600 mb-8 sm:mb-12 max-w-3xl mx-auto px-4 leading-relaxed">
              Immerse yourself in the profound wisdom of the <span className="text-orange-600 font-medium">Bhagavad Gita</span> through intelligent conversations. 
              Receive personalized spiritual guidance powered by <span className="text-orange-600 font-medium">cutting-edge AI technology</span>.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center px-4">
              <Link href="/chat" className="w-full sm:w-auto">
                <button className="w-full group bg-orange-500 text-white px-8 sm:px-10 py-4 sm:py-5 rounded-full hover:bg-orange-600 transition-all shadow-xl hover:shadow-orange-200 text-base sm:text-lg font-semibold transform hover:-translate-y-0.5 flex items-center justify-center gap-2">
                  Start Your Journey
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
              </Link>
              <a 
                href="https://github.com/varunisrani/gitaaii" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <button className="w-full flex items-center justify-center gap-2 bg-white text-orange-500 px-8 sm:px-10 py-4 sm:py-5 rounded-full hover:bg-orange-50 transition-all border-2 border-orange-200 text-base sm:text-lg font-semibold transform hover:-translate-y-0.5 group">
                  <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z"/>
                  </svg>
                  GitHub
                </button>
              </a>
            </div>

            {/* Stats or Trust Indicators */}
            <div className="mt-12 sm:mt-16 flex flex-wrap justify-center gap-8 text-center">
              <div className="px-4">
                <div className="text-2xl sm:text-3xl font-bold text-orange-500 mb-1">1000+</div>
                <div className="text-sm text-gray-600">Spiritual Conversations</div>
              </div>
              <div className="px-4">
                <div className="text-2xl sm:text-3xl font-bold text-orange-500 mb-1">24/7</div>
                <div className="text-sm text-gray-600">Divine Guidance</div>
              </div>
              <div className="px-4">
                <div className="text-2xl sm:text-3xl font-bold text-orange-500 mb-1">100%</div>
                <div className="text-sm text-gray-600">Open Source</div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-16 sm:py-20 px-4" id="features">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-orange-50 to-white border border-orange-100 hover:shadow-xl transition-all group">
                <div className="w-12 sm:w-14 h-12 sm:h-14 bg-orange-500 rounded-xl mb-6 flex items-center justify-center text-white">
                  <svg className="w-6 sm:w-7 h-6 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/>
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-4 group-hover:text-orange-500 transition-colors">Divine Conversations</h3>
                <p className="text-gray-600 text-base sm:text-lg">Engage in meaningful dialogues through our advanced AI chatbot.</p>
              </div>

              <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-orange-50 to-white border border-orange-100 hover:shadow-xl transition-all group">
                <div className="w-12 sm:w-14 h-12 sm:h-14 bg-orange-500 rounded-xl mb-6 flex items-center justify-center text-white">
                  <svg className="w-6 sm:w-7 h-6 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"/>
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-4 group-hover:text-orange-500 transition-colors">Voice of Wisdom</h3>
                <p className="text-gray-600 text-base sm:text-lg">Experience spiritual guidance through natural voice conversations.</p>
              </div>

              <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-orange-50 to-white border border-orange-100 hover:shadow-xl transition-all group md:col-span-2 lg:col-span-1">
                <div className="w-12 sm:w-14 h-12 sm:h-14 bg-orange-500 rounded-xl mb-6 flex items-center justify-center text-white">
                  <svg className="w-6 sm:w-7 h-6 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-4 group-hover:text-orange-500 transition-colors">Sacred Knowledge</h3>
                <p className="text-gray-600 text-base sm:text-lg">Access personalized spiritual insights from timeless teachings.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Premium CTA Section */}
        <section className="py-16 sm:py-20 px-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-600"></div>
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/0"></div>
          
          <div className="max-w-4xl mx-auto text-center relative z-10 px-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-white text-sm font-medium mb-6 backdrop-blur-sm">
              <span className="text-xl">🕉️</span>
              <span>Join Our Community</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8 text-white">
              Transform Your Life with 
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-200 to-orange-100 ml-2">
                Divine Guidance
              </span>
            </h2>
            
            <p className="text-lg sm:text-xl mb-8 sm:mb-12 text-orange-100/90 max-w-2xl mx-auto leading-relaxed">
              Join thousands of seekers who have discovered their path through ancient wisdom and modern technology.
            </p>
            
            <Link href="/chat">
              <button className="group bg-white text-orange-500 px-8 sm:px-12 py-4 sm:py-5 rounded-full text-base sm:text-lg font-semibold hover:bg-orange-50 transition-all shadow-xl hover:shadow-black/20 transform hover:-translate-y-0.5 flex items-center gap-3 mx-auto">
                Begin Your Spiritual Journey
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </Link>
          </div>
        </section>
      </main>

      <footer className="bg-white border-t border-orange-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Footer */}
          <div className="py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="space-y-4">
              <div className="text-xl font-bold bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">
                Gita AI
              </div>
              <p className="text-gray-600 text-sm max-w-xs">
                Experience divine wisdom through the power of artificial intelligence and ancient teachings.
              </p>
            </div>
            
            {/* Quick Links */}
            <div>
              <h3 className="text-gray-900 font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-3">
                <li><a href="#features" className="text-gray-600 hover:text-orange-500 transition-colors text-sm">Features</a></li>
                <li><a href="#about" className="text-gray-600 hover:text-orange-500 transition-colors text-sm">About</a></li>
                <li><a href="#pricing" className="text-gray-600 hover:text-orange-500 transition-colors text-sm">Pricing</a></li>
              </ul>
            </div>
            
            {/* Resources */}
            <div>
              <h3 className="text-gray-900 font-semibold mb-4">Resources</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-600 hover:text-orange-500 transition-colors text-sm">Documentation</a></li>
                <li><a href="#" className="text-gray-600 hover:text-orange-500 transition-colors text-sm">API</a></li>
                <li><a href="#" className="text-gray-600 hover:text-orange-500 transition-colors text-sm">Privacy Policy</a></li>
              </ul>
            </div>
            
            {/* Community */}
            <div>
              <h3 className="text-gray-900 font-semibold mb-4">Community</h3>
              <ul className="space-y-3">
                <li>
                  <a 
                    href="https://github.com/varunisrani/gitaaii" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-orange-500 transition-colors text-sm inline-flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z"/>
                    </svg>
                    GitHub
                  </a>
                </li>
                <li><a href="#" className="text-gray-600 hover:text-orange-500 transition-colors text-sm">Discord</a></li>
                <li><a href="#" className="text-gray-600 hover:text-orange-500 transition-colors text-sm">Twitter</a></li>
              </ul>
            </div>
          </div>
          
          {/* Bottom Footer */}
          <div className="py-6 border-t border-orange-100 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-gray-600 text-sm">
              © 2024 Gita AI. Open source project with ❤️
            </div>
            <div className="flex gap-6">
              <a href="#" className="text-gray-600 hover:text-orange-500 transition-colors text-sm">Terms</a>
              <a href="#" className="text-gray-600 hover:text-orange-500 transition-colors text-sm">Privacy</a>
              <a href="#" className="text-gray-600 hover:text-orange-500 transition-colors text-sm">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}