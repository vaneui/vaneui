export function Footer() {
  return (
    <footer className="w-full bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
              About
            </h3>
            <p className="mt-4 text-base text-gray-500">
              VaneUI is a modern React component library built with Tailwind CSS.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
              Resources
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <a href="/docs" className="text-base text-gray-500 hover:text-gray-900">
                  Documentation
                </a>
              </li>
              <li>
                <a href="/components" className="text-base text-gray-500 hover:text-gray-900">
                  Components
                </a>
              </li>
              <li>
                <a href="https://github.com/yourusername/vaneui" className="text-base text-gray-500 hover:text-gray-900">
                  GitHub
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
              Legal
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <a href="/privacy" className="text-base text-gray-500 hover:text-gray-900">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms" className="text-base text-gray-500 hover:text-gray-900">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-8">
          <p className="text-base text-gray-400 text-center">
            © {new Date().getFullYear()} VaneUI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
} 