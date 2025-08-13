
import { loginUser } from "@/app/actions/auth/loginUser";

import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import dbConnect, { collectionNameObj } from "./dbConnect";
export const authOptions = {
 
  providers: [
  CredentialsProvider({
   
    name: "Credentials",
    
    credentials: {
      email: { label: "Email", type: "text", placeholder: "Enter Email" },
      password: { label: "Password", type: "password" }
    },
    async authorize(credentials, req) {
       
      const user = await loginUser(credentials)

      if (user) { 
        return user
      } else { 
        return null
      }
    }
  }),
   GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET
  })
],
pages: {
    signIn: "/login"
},
session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60,
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },

callbacks: {
  async jwt({ token, user }) {
     
      if (user) {
        token.role = user.role;
        token._id = user._id;
      }
      return token;
    },
    async session({ session, token }) {
      
      if (token) {
        session.user.role = token.role;
        session.user._id = token._id;
      }
      return session;
    },
    
  async signIn({ user, account }) {
    if (account) {
      const { providerAccountId, provider } = account;
      const { email: user_email, image, name } = user;

      const userCollection = dbConnect(collectionNameObj.userCollection);
      const isExist = await userCollection.findOne({ providerAccountId });

      if (!isExist) {
        const payload = {
          providerAccountId,
          provider,
          name,
          email: user_email,
          image,
          role: "user",
        };
        await userCollection.insertOne(payload);
      }
    }
    return true;
  },

  async session({ session }) {
    const userCollection = dbConnect(collectionNameObj.userCollection);
    const user = await userCollection.findOne({ email: session.user.email });

    if (user) {
      session.user.role = user.role || "user";
      session.user._id = user._id.toString();
    }

    return session;
  },
}


}