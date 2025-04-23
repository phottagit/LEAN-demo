import { NextResponse } from 'next/server'
import { connectMongoDB } from '../../../../lib/mongodb';
import User from '../../../../models/user';

export async function POST(req) {
    try {

        const { email } = await req.json();
        
        await connectMongoDB();
        
        const user = await User.findOne({ email }).select("_id");
        console.log("User: ", user)

        return NextResponse.json({ user })

    } catch(error) {
        console.error("User check error:", error);
        return NextResponse.json({ message: "An error occured while registering the user." }, { status: 500 })
    }
}