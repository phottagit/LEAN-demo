import { connectMongoDB } from '../../../../../lib/mongodb';
import User from '../../../../../models/user';

export async function GET(request, { params }) {
  const { filename } = params;

  await connectMongoDB();

  try {
    const user = await User.findOne({ imgFilename: filename });

    if (!user || !user.img) {
      return new Response('Image not found', { status: 404 });
    }

    // Convert Binary to base64 string
    const buffer = user.img.buffer; // if user.img is a BSON Binary object
    const base64 = buffer.toString('base64');
    const mimeType = user.imgType || 'image/jpeg';

    const jsonResponse = {
      dataUri: `data:${mimeType};base64,${base64}`,
    };

    return Response.json(jsonResponse);
  } catch (error) {
    console.error('Error fetching image:', error);
    return new Response('Server error', { status: 500 });
  }
}
