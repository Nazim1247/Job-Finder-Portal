import { loginUser } from "@/app/actions/auth/loginUser";
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
  CredentialsProvider({
    // The name to display on the sign in form (e.g. "Sign in with...")
    name: "Credentials",
    // `credentials` is used to generate a form on the sign in page.
    // You can specify which fields should be submitted, by adding keys to the `credentials` object.
    // e.g. domain, username, password, 2FA token, etc.
    // You can pass any HTML attribute to the <input> tag through the object.
    credentials: {
      email: { label: "Email", type: "text", placeholder: "Enter Email" },
      password: { label: "Password", type: "password" }
    },
    async authorize(credentials, req) {
        // console.log(credentials);
      // Add logic here to look up the user from the credentials supplied
      const user = await loginUser(credentials)
// console.log('USER',user);
      if (user) {
        // Any object returned will be saved in `user` property of the JWT
        return user
      } else {
        // If you return null then an error will be displayed advising the user to check their details.
        return null

        // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
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
      // When user logs in, attach role and id to token
      if (user) {
        token.role = user.role;
        token._id = user._id;
      }
      return token;
    },
    async session({ session, token }) {
      // Attach role and id to session object
      if (token) {
        session.user.role = token.role;
        session.user._id = token._id;
      }
      return session;
    },
    
  // Sign In Callback
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

  // Session Callback
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


const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }