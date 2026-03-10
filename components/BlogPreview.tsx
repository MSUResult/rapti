import Link from "next/link";
import Image from "next/image";
import blogData from "@/data/dummyBlogData.json";

export default function BlogPreview({ limit = 2 }) {
  const previewBlogs = blogData.slice(0, limit);

  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold mb-6 text-center">Latest Blogs</h2>

      <div className="grid md:grid-cols-2 gap-8">
        {previewBlogs.map((blog) => (
          <div key={blog.slug} className="border rounded-xl overflow-hidden shadow-sm">
            <Image
              src={blog.image}
              alt={blog.title}
              width={600}
              height={400}
              className="w-full h-48 object-cover"
            />

            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{blog.title}</h3>
              <p className="text-gray-600 text-sm mb-3">{blog.description}</p>

              <Link href={`/blog/${blog.slug}`} className="text-blue-600 font-medium">
                Read More →
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-6">
        <Link href="/blog" className="text-blue-600 font-semibold">
          View All Blogs →
        </Link>
      </div>
    </section>
  );
}