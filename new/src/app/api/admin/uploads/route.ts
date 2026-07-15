import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { requireAdmin, logAdminAction } from "@/lib/auth";

const UPLOAD_DIR = path.join(process.cwd(), "public/uploads/blogs");

const ALLOWED = {
  image: { types: ["image/jpeg", "image/png", "image/webp"], max: 5 * 1024 * 1024 },
  gif: { types: ["image/gif"], max: 10 * 1024 * 1024 },
  video: { types: ["video/mp4", "video/webm"], max: 30 * 1024 * 1024 },
} as const;

type UploadKind = keyof typeof ALLOWED;

function extForMime(mime: string) {
  if (mime === "image/jpeg") return "jpg";
  if (mime === "image/png") return "png";
  if (mime === "image/webp") return "webp";
  if (mime === "image/gif") return "gif";
  if (mime === "video/mp4") return "mp4";
  if (mime === "video/webm") return "webm";
  return "bin";
}

export async function POST(req: Request) {
  try {
    await requireAdmin();

    const formData = await req.formData();
    const file = formData.get("file");
    const kind = (formData.get("kind") as UploadKind) || "image";

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const rules = ALLOWED[kind] ?? ALLOWED.image;
    const allowedTypes: readonly string[] = rules.types;
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: "Unsupported file type" }, { status: 400 });
    }
    if (file.size > rules.max) {
      return NextResponse.json({ error: "File too large" }, { status: 400 });
    }

    await mkdir(UPLOAD_DIR, { recursive: true });

    const ext = extForMime(file.type);
    const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(path.join(UPLOAD_DIR, filename), buffer);

    const url = `/uploads/blogs/${filename}`;
    await logAdminAction("upload", "blog_media", filename);

    return NextResponse.json({ url });
  } catch (e) {
    if (e instanceof Error && e.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
