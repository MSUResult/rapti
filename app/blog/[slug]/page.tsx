import blogData from "@/data/dummyBlogData.json";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Metadata } from "next";

export async function generateStaticParams() {
  return blogData.map((blog) => ({
    slug: blog.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const blog = blogData.find((item) => item.slug === slug);
  if (!blog) return { title: "Blog Not Found" };
  return {
    title: blog.title,
    description: blog.description,
  };
}

export default async function SingleBlogPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blog = blogData.find((item) => item.slug === slug);

  if (!blog) return notFound();

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="max-w-5xl mx-auto px-6 pt-16 pb-10 text-center">
        <div className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wide text-blue-600 uppercase bg-blue-50 rounded-full">
          Revolutionizing IT Education
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
          {blog.title}
        </h1>
        <div className="flex items-center justify-center gap-4 text-gray-600 mb-10">
          <span className="font-medium text-gray-900">{blog.author}</span>
          <span className="text-gray-300">|</span>
          <time>{blog.date}</time>
        </div>
      </div>

      {/* Featured Image */}
      <div className="max-w-6xl mx-auto px-4 mb-16">
        <div className="relative h-[400px] md:h-[600px] w-full rounded-3xl overflow-hidden shadow-2xl">
          <Image
            src={blog.image}
            alt={blog.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* Content Section */}
      <article className="max-w-3xl mx-auto px-6 pb-20">
        <div className="prose prose-lg prose-blue max-w-none text-gray-700 leading-relaxed">
          {/* This splits the content by new lines to create paragraphs and headers */}
          {blog.content.split("\n").map((line, index) => {
            if (line.startsWith("###")) {
              return <h2 key={index} className="text-2xl font-bold text-gray-900 mt-8 mb-4">{line.replace("###", "")}</h2>;
            }
            if (line.trim() === "") return <div key={index} className="h-4" />;
            return (
              <p key={index} className="mb-4 whitespace-pre-wrap">
                {line}
              </p>
            );
          })}
        </div>

        {/* Call to Action Box */}
        <div className="mt-16 p-8 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl text-white text-center shadow-xl">
          <h3 className="text-2xl font-bold mb-4">Ready to Start Your IT Journey?</h3>
          <p className="text-blue-100 mb-6">
            Join Saharanpur's most advanced O Level training program at Rapti Computers. 
            Seats are filling fast for the 2026 session!
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-bold hover:bg-blue-50 transition-colors">
            Enroll Now at Rapti Computers
          </button>
        </div>
      </article>
    </main>
  );
}