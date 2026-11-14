import Navbar from "../Component/layout/Navbar";
import Footer from "../Component/layout/Footer";
import { BlogDetails } from "../Component/blogdetails/BlogDetails";
import { RelatedBlog } from "../Component/blogdetails/related-blog";

const BlogDetail = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <div className="w-full h-64 sm:h-80 lg:h-96 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1600&h=600&fit=crop"
          alt="Blog cover"
          className="w-full h-full object-cover"
        />
      </div>

      <BlogDetails />
      <RelatedBlog />
      <Footer />
    </div>
  );
};

export default BlogDetail;
