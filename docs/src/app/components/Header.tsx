export function Header() {
  return (
    <header className="w-full bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <a href="/" className="text-xl font-bold text-gray-900">
              VaneUI
            </a>
          </div>
          <nav className="flex space-x-8">
            <a href="/components" className="text-gray-600 hover:text-gray-900">
              Components
            </a>
            <a href="/docs" className="text-gray-600 hover:text-gray-900">
              Documentation
            </a>
            <a href="https://github.com/yourusername/vaneui" className="text-gray-600 hover:text-gray-900">
              GitHub
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
} 