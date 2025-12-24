"use client";
import { useParams } from "next/navigation";

export default function Article() {
  const { slug } = useParams();
  console.log("Slug:", slug);

  return (
    <div className="container">
      This is the article page for article: {slug}. page router works!
    </div>
  );
}