import Link from 'next/link';
import './about.css';


export const metadata = {
  title: "About",
};

export default function About() {
  return (

    <main>
      <Link  className="About mb-4 inline-block text-blue-500 underline" href="/">Go to Home</Link>
      <div className="container">
        This is the about page. page router works!

      </div>
    </main>
  );
}