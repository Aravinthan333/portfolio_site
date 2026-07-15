import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { ArrowUpRight, Clock } from "lucide-react";
import type { BlogPost } from "@/lib/blogs";

const blogGradients: Record<string, string> = {
  "whatsapp-operations-platform-valathi-chits":
    "linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #0f172a 100%)",
  "grocery-ecommerce-raja-supermart":
    "linear-gradient(135deg, #064e3b 0%, #10b981 50%, #0f172a 100%)",
  "serverless-motorsport-storefront-race-parts-india":
    "linear-gradient(135deg, #7f1d1d 0%, #ef4444 50%, #0f172a 100%)",
  default: "linear-gradient(135deg, #1e40af 0%, #3b82f6 45%, #0f172a 100%)",
};

function getGradient(slug: string) {
  return blogGradients[slug] ?? blogGradients.default;
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

type Props = {
  post: BlogPost;
};

export function BlogCard({ post }: Props) {
  return (
    <Link href={`/blog/${post.slug}`} className="blog-card group">
      {post.coverImage ? (
        <div className="blog-card-cover blog-card-cover-image">
          <Image
            src={post.coverImage}
            alt=""
            fill
            className="object-cover"
            unoptimized={post.coverImage.startsWith("/uploads/")}
          />
          <span className="blog-card-category">{post.category}</span>
        </div>
      ) : (
        <div
          className="blog-card-cover"
          style={{ background: getGradient(post.slug) }}
          aria-hidden
        >
          <span className="blog-card-category">{post.category}</span>
        </div>
      )}

      <div className="blog-card-body">
        <div className="blog-card-meta">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span className="blog-card-meta-dot" aria-hidden>
            ·
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock size={12} className="shrink-0 opacity-70" />
            {post.readTime}
          </span>
        </div>

        <h2 className="blog-card-title">{post.title}</h2>
        <p className="blog-card-excerpt">{post.excerpt}</p>

        <span className="blog-card-link">
          Read article
          <ArrowUpRight
            size={15}
            className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </span>
      </div>
    </Link>
  );
}
