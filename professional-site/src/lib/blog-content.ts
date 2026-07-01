import { z } from "zod";
import type { BlogContentBlock } from "@/types/blog";
import { isMediaBlock, isTextBlock } from "@/types/blog";

const textBlockSchema = z.discriminatedUnion("type", [
  z.object({ type: z.literal("heading"), text: z.string() }),
  z.object({ type: z.literal("paragraph"), text: z.string() }),
]);

const mediaBlockSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("image"),
    url: z.string().min(1),
    alt: z.string().optional(),
    caption: z.string().optional(),
  }),
  z.object({
    type: z.literal("video"),
    url: z.string().min(1),
    caption: z.string().optional(),
  }),
  z.object({
    type: z.literal("gif"),
    url: z.string().min(1),
    alt: z.string().optional(),
    caption: z.string().optional(),
  }),
]);

export const blogContentBlockSchema = z.union([textBlockSchema, mediaBlockSchema]);

export const blogContentSchema = z.array(blogContentBlockSchema);

export function isBlockEmpty(block: BlogContentBlock): boolean {
  if (isTextBlock(block)) return !block.text.trim();
  if (isMediaBlock(block)) return !block.url.trim();
  return true;
}

export function filterEmptyBlocks(blocks: BlogContentBlock[]): BlogContentBlock[] {
  return blocks.filter((b) => !isBlockEmpty(b));
}

export function emptyTextBlock(type: "heading" | "paragraph" = "paragraph"): BlogContentBlock {
  return { type, text: "" };
}

export function emptyMediaBlock(type: "image" | "video" | "gif"): BlogContentBlock {
  return { type, url: "", alt: "", caption: "" };
}
