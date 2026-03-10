import Link from "next/link";
import Image from "next/image";
import blogData from "@/data/dummyBlogData.json";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description: "Read latest blogs about O Level, CCC and computer courses in Saharanpur.",
};

export default function BlogPage() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">Rapti Computers Blog</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogData.map((blog) => (
          <div key={blog.slug} className="border rounded-xl overflow-hidden shadow-sm">
            <Image
              src={blog.image}
              alt={blog.title}
              width={600}
              height={400}
              className="w-full h-48 object-cover"
            />

            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
              <p className="text-gray-600 text-sm mb-3">{blog.description}</p>

              <Link
                href={`/blog/${blog.slug}`}
                className="text-blue-600 font-medium"
              >
                Read More →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}