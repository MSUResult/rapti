import BlogPreview from "@/components/BlogPreview";
import { Courses } from "@/components/Courses";
import Hero from "@/components/Hero";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  return (
    <main className="">
      <Hero />
      <Courses />
      <Testimonials />
      <BlogPreview />
    </main>
  );
}
