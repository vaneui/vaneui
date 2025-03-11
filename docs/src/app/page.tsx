export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold mb-8">VaneUI Documentation</h1>
        <p className="text-lg mb-4">
          Welcome to the VaneUI documentation. This site showcases all the components
          and their usage examples.
        </p>
        <p className="text-lg">
          Visit our{' '}
          <a href="/storybook" className="text-blue-500 hover:text-blue-700 underline">
            Storybook
          </a>{' '}
          to explore components interactively.
        </p>
      </div>
    </main>
  );
} 