import Navbar from "../Component/layout/Navbar";
import { BlogHero } from "../Component/blog/blog-hero";
import { MarketingArticles } from "../Component/blog/marketing-articles";
import { ReadingBlogList } from "../Component/blog/reading-blog-list";
import { RelatedBlog } from "../Component/blog/related-blog";
import Footer from "../Component/layout/Footer";

const Blog = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <BlogHero />
        <ReadingBlogList />
        <RelatedBlog />
        <MarketingArticles />
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
