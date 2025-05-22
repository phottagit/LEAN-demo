import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../lib/mongodb";
import User from "../../../../models/user";

// Placeholder: implement your logic to get user info from request (e.g., JWT, cookies)
async function getUserFromRequest(request) {
  // Example: decode JWT token from headers or cookies here
  // Return user object { id, role, ... }
  // For demo, assume admin user:
  return { role: "admin" };
}

export async function GET(request) {
  try {
    // Get user info from request
    const user = await getUserFromRequest(request);

    // Check if user role is admin
    if (!user || user.role !== "admin") {
      return NextResponse.json(
        { message: "Unauthorized - Admins only" },
        { status: 401 }
      );
    }

    await connectMongoDB();

    // Fetch the 10 latest users, selecting specific fields
    const users = await User.find({})
      .sort({ createdAt: -1 })
      .select("name email empId departments role createdAt")
      .limit(10);

    if (!users || users.length === 0) {
      return NextResponse.json(
        {
          message: "No users found in the database",
          count: 0,
          users: [],
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        message: "Users retrieved successfully",
        count: users.length,
        users,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error retrieving users:", error);
    return NextResponse.json(
      {
        message: "An error occurred while retrieving users",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
