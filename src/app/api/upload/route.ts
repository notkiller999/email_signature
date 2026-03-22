import { v2 as cloudinary } from 'cloudinary';
import { NextResponse } from 'next/server';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: Request) {
  try {
    const { image, userId } = await req.json();
    
    const result = await cloudinary.uploader.upload(image, {
      public_id: `avatar_${userId}`,
      overwrite: true,
      folder: 'signatures',
    });

    return NextResponse.json({ url: result.secure_url });
  } catch (error) {
    return NextResponse.json({ error: `Upload failed with error: ${error}` }, { status: 500 });
  }
}