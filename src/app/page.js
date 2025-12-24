import Link from 'next/link'

export default function Home() {
  return (
    <div>
      <main>
        <Link href="/article/hello-POORYA" className="mb-4 inline-block text-blue-500 underline">
          Article
        </Link>
        <Link href="/about" className="mb-4 inline-block text-blue-500 underline">
          About
        </Link>
        <h1>
          Welcome to Next.js 16.1.1 App Router Storefront!
        </h1>
        
      </main>
    </div>
  );
}
