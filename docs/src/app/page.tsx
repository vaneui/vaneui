import { Header } from './components/Header';
import { Footer } from './components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex flex-col items-center justify-between p-24">
        <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
          <h1 className="text-4xl font-bold mb-8">VaneUI Documentation</h1>
          <p className="text-lg mb-4">
            Welcome to the VaneUI documentation. This site showcases all the components
            and their usage examples.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
} 