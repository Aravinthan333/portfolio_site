import Image from "next/image";
import type { BlogContentBlock } from "@/types/blog";
import { isMediaBlock, isTextBlock } from "@/types/blog";

type Props = {
  blocks: BlogContentBlock[];
};

export function BlogContentRenderer({ blocks }: Props) {
  return (
    <>
      {blocks.map((block, i) => {
        if (isTextBlock(block)) {
          if (block.type === "heading") {
            return (
              <h2 key={i} className="article-heading">
                {block.text}
              </h2>
            );
          }
          return (
            <p key={i} className="article-paragraph">
              {block.text}
            </p>
          );
        }

        if (!isMediaBlock(block) || !block.url) return null;

        return (
          <figure key={i} className="article-media">
            {block.type === "video" ? (
              <video
                src={block.url}
                controls
                playsInline
                className="article-media-video"
                preload="metadata"
              />
            ) : (
              <div className="article-media-image-wrap">
                <Image
                  src={block.url}
                  alt={block.alt ?? ""}
                  width={1200}
                  height={675}
                  className={`article-media-image ${block.type === "gif" ? "article-media-gif" : ""}`}
                  unoptimized={block.type === "gif" || block.url.endsWith(".gif")}
                />
              </div>
            )}
            {block.caption && (
              <figcaption className="article-media-caption">{block.caption}</figcaption>
            )}
          </figure>
        );
      })}
    </>
  );
}
