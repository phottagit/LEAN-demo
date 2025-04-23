import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectMongoDB } from "../../../../../lib/mongodb";
import User from "../../../../../models/user";
import bcrypt from 'bcryptjs';

const authOptions = {
    providers: [
        CredentialsProvider({
          name: 'credentials',
          credentials: {},
          async authorize(credentials) {
            const { email, password } = credentials;

            try {
                await connectMongoDB();
                const user = await User.findOne({ email });

                if (!user) {
                    return null;
                }

                const passwordMatch = await bcrypt.compare(password, user.password);

                if (!passwordMatch) {
                    return null;
                }

                // Return user without password
                const userObject = user.toObject();
                delete userObject.password;
                
                return userObject;
            } catch(error) {
                console.log("Error in authorize:", error);
                return null;
            }
          }
        })
    ],
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/login"
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                return {
                    ...token,
                    id: user._id,
                    role: user.role,
                    img: user.img,
                    departments: user.departments,
                    empId: user.empId,
                    name: user.name
                }
            }
            return token;
        },
        async session({ session, token }) {
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id,
                    role: token.role,
                    img: token.img,
                    departments: token.departments,
                    empId: token.empId,
                    name: token.name
                }
            }
        }
    },
    debug: process.env.NODE_ENV === 'development'
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
