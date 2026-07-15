export type TextBlock = { type: "heading" | "paragraph"; text: string };

export type MediaBlock = {
  type: "image" | "video" | "gif";
  url: string;
  alt?: string;
  caption?: string;
};

export type BlogContentBlock = TextBlock | MediaBlock;

export function isTextBlock(block: BlogContentBlock): block is TextBlock {
  return block.type === "heading" || block.type === "paragraph";
}

export function isMediaBlock(block: BlogContentBlock): block is MediaBlock {
  return block.type === "image" || block.type === "video" || block.type === "gif";
}
