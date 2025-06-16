// pages/blog/[slug].tsx
import type { GetServerSideProps } from "next";
import { api } from "~/utils/api";
import Navbar from "../componenty/navbar";
import Footer from "../componenty/footer";
import Link from "next/link";
import Image from "next/image";


type BlogPageProps = {
  slug: string;
};

const BlogPage = ({ slug }: BlogPageProps) => {
  const { data: blog, isLoading } = api.blog.getById.useQuery({ id: slug });

  if (isLoading) return <p>Loading...</p>;
  if (!blog) return <p>Blog not found</p>;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">{blog.title}</h1>

            <div className="flex items-center text-gray-600 mb-8">
              <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
              <span className="mx-3">•</span>
            </div>

            <Image
              src={`${blog.imageUrl}?height=200&width=400&text=Blog+${blog.id}`}
              alt={blog.title}
              className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>

      {/* Obsah článku */}
      <div className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none">
            <div dangerouslySetInnerHTML={{ __html: blog.content }} />
          </div>

          {/* Navigace na konci článku */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <Link href="/blog" className="inline-flex items-center text-blue-600 hover:text-blue-800">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Zpět na blog
              </Link>

              <div className="flex space-x-4">
                <button className="text-gray-600 hover:text-blue-600">Sdílet na Facebooku</button>
                <button className="text-gray-600 hover:text-blue-600">Sdílet na Twitteru</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const slug = context.params?.slug;

  if (typeof slug !== "string") {
    return {
      notFound: true, 
    };
  }

  return {
    props: {
      slug,
    },
  };
};

export default BlogPage;
