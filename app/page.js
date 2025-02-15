import Image from "next/image";

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
            <button className="bg-orange-500 text-white px-6 py-2.5 rounded-full hover:bg-orange-600 transition-all shadow-lg hover:shadow-orange-200 text-sm font-medium">
              Get Started
            </button>
          </div>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="pt-28 sm:pt-32 pb-16 sm:pb-20 px-4 relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200%] sm:w-[1000px] h-[1000px] bg-gradient-to-b from-orange-100/50 to-transparent rounded-full blur-3xl -z-10 opacity-50"></div>
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-block px-4 py-1.5 bg-orange-50 rounded-full text-orange-600 text-sm font-medium mb-6 sm:mb-8">
              Discover Timeless Wisdom Through AI
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8 bg-gradient-to-r from-orange-600 via-orange-500 to-orange-400 bg-clip-text text-transparent leading-tight px-4">
              Experience Divine Guidance Through Advanced AI Technology
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-8 sm:mb-12 max-w-3xl mx-auto px-4">
              Immerse yourself in the profound wisdom of the Bhagavad Gita through intelligent conversations. Receive personalized spiritual guidance powered by cutting-edge AI.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center px-4">
              <button className="w-full sm:w-auto bg-orange-500 text-white px-8 sm:px-10 py-4 sm:py-5 rounded-full hover:bg-orange-600 transition-all shadow-xl hover:shadow-orange-200 text-base sm:text-lg font-semibold transform hover:-translate-y-0.5">
                Start Your Journey
              </button>
              <button className="w-full sm:w-auto bg-white text-orange-500 px-8 sm:px-10 py-4 sm:py-5 rounded-full hover:bg-orange-50 transition-all border-2 border-orange-200 text-base sm:text-lg font-semibold transform hover:-translate-y-0.5">
                Watch Demo
              </button>
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
          <div className="max-w-4xl mx-auto text-center relative z-10 px-4">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 text-white">Transform Your Life with Divine Guidance</h2>
            <p className="text-lg sm:text-xl mb-8 sm:mb-12 text-orange-100">
              Join thousands of seekers who have discovered their path through ancient wisdom and modern technology.
            </p>
            <button className="w-full sm:w-auto bg-white text-orange-500 px-8 sm:px-12 py-4 sm:py-5 rounded-full text-base sm:text-lg font-semibold hover:bg-orange-50 transition-all shadow-xl hover:shadow-orange-700/20 transform hover:-translate-y-0.5">
              Begin Your Spiritual Journey
            </button>
          </div>
        </section>
      </main>

      <footer className="bg-white border-t border-orange-100 px-4 sm:px-8 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-6 sm:gap-8">
          <div className="text-lg sm:text-xl font-bold bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">
            Gita AI
          </div>
          <div className="flex gap-6 sm:gap-8 text-gray-600">
            <a href="#" className="hover:text-orange-500 transition-colors text-sm">Privacy</a>
            <a href="#" className="hover:text-orange-500 transition-colors text-sm">Terms</a>
            <a href="#" className="hover:text-orange-500 transition-colors text-sm">Contact</a>
          </div>
          <div className="text-gray-500 text-sm">© 2024 Gita AI. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}