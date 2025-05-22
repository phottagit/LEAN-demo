import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoClient } from "mongodb";
import bcrypt from 'bcryptjs';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const client = await MongoClient.connect(process.env.MONGODB_URI);
        const db = client.db("test");

        const user = await db.collection("users").findOne({ email: credentials.email });
        if (!user) {
          await client.close();
          return null;
        }

        const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
        if (!isPasswordValid) {
          await client.close();
          return null;
        }

        await client.close();

        return {
          _id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
          departments: user.departments,
          empId: user.empId,
          img: user.img?.filename || `user_${user._id}.jpg`,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user._id;
        token.name = user.name;
        token.email = user.email;
        token.img = user.img;
        token.role = user.role;
        token.departments = user.departments;
        token.empId = user.empId;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.name = token.name;
      session.user.email = token.email;
      session.user.img = token.img;
      session.user.role = token.role;
      session.user.departments = token.departments;
      session.user.empId = token.empId;
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
    error: "/login"
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
