import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      {/* Header */}
      <header className="bg-white shadow-md fixed top-0 w-full z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-orange-500">Gita AI</h1>
          <nav className="space-x-4">
            <Link href="/#features" className="hover:text-orange-500">Features</Link>
            <Link href="/chat" className="hover:text-orange-500">Chat</Link>
            <Link href="https://github.com/varunisrani/gitaaii" target="_blank" className="hover:text-orange-500">GitHub</Link>
          </nav>
        </div>
      </header>

      <main className="pt-24 px-4">
        {/* Hero Section - Split Layout */}
        <section className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center py-20">
          <div>
            <h2 className="text-4xl font-bold mb-4 text-orange-600">Timeless Wisdom, Modern Interface</h2>
            <p className="text-lg mb-6 text-gray-600 dark:text-gray-300">
              Experience spiritual insights from the Bhagavad Gita with AI-powered conversations tailored to your journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/chat">
                <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full font-medium">Start Chatting</button>
              </Link>
              <Link href="https://github.com/varunisrani/gitaaii" target="_blank">
                <button className="border border-orange-500 text-orange-500 hover:bg-orange-50 px-6 py-3 rounded-full font-medium">View GitHub</button>
              </Link>
            </div>
          </div>

          <div className="relative w-full h-64 sm:h-80 md:h-full bg-orange-100 rounded-xl overflow-hidden">
            <img src="/gita-illustration.svg" alt="Gita Illustration" className="w-full h-full object-contain p-6" />
          </div>
        </section>

        {/* Features Section - Horizontal Cards */}
        <section id="features" className="bg-orange-50 py-16">
          <div className="max-w-7xl mx-auto px-4">
            <h3 className="text-3xl font-bold text-center text-orange-600 mb-12">Features</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
                <h4 className="text-xl font-semibold mb-2 text-orange-500">Conversational Gita</h4>
                <p className="text-gray-600">Ask any question and get answers rooted in the teachings of the Bhagavad Gita.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
                <h4 className="text-xl font-semibold mb-2 text-orange-500">Verse Lookup</h4>
                <p className="text-gray-600">Quickly find verses by chapter, keyword, or theme.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
                <h4 className="text-xl font-semibold mb-2 text-orange-500">Personal Insights</h4>
                <p className="text-gray-600">Get tailored advice based on your stage in life and spiritual path.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action - Banner */}
        <section className="py-20 bg-orange-500 text-white text-center">
          <h4 className="text-3xl sm:text-4xl font-bold mb-4">Begin Your Spiritual Journey</h4>
          <p className="text-lg mb-6">Start exploring the Gita like never before. AI meets timeless wisdom.</p>
          <Link href="/chat">
            <button className="bg-white text-orange-600 px-8 py-3 rounded-full font-semibold hover:bg-orange-100">Start Now</button>
          </Link>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t text-sm text-gray-600">
        <div className="max-w-7xl mx-auto px-4 py-8 grid sm:grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <h5 className="font-bold text-orange-500 mb-2">Gita AI</h5>
            <p>AI-powered spiritual assistant rooted in the Bhagavad Gita.</p>
          </div>
          <div>
            <h5 className="font-bold text-orange-500 mb-2">Navigation</h5>
            <ul className="space-y-1">
              <li><Link href="/chat">Chat</Link></li>
              <li><Link href="/#features">Features</Link></li>
              <li><Link href="https://github.com/varunisrani/gitaaii" target="_blank">GitHub</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold text-orange-500 mb-2">Legal</h5>
            <ul className="space-y-1">
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Use</a></li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold text-orange-500 mb-2">Contact</h5>
            <p>Email: support@gitaai.dev</p>
          </div>
        </div>
        <div className="border-t py-4 text-center text-gray-500">
          © 2024 Gita AI. Open source with ❤️
        </div>
      </footer>
    </div>
  );
}
