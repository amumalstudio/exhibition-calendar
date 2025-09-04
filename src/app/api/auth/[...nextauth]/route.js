import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || 'demo-client-id',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'demo-client-secret',
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        const db = await connectToDatabase();
        
        if (db) {
          let existingUser = await User.findOne({
            email: user.email,
          });

          if (!existingUser) {
            existingUser = await User.create({
              name: user.name,
              email: user.email,
              image: user.image,
              provider: account.provider,
              providerId: account.providerAccountId,
            });
          }
        }

        return true;
      } catch (error) {
        console.error('Error during sign in:', error);
        return true; // Allow sign in even if DB connection fails
      }
    },
    async session({ session, token }) {
      try {
        const db = await connectToDatabase();
        
        if (db) {
          const dbUser = await User.findOne({ email: session.user.email });
          if (dbUser) {
            session.user.id = dbUser._id.toString();
          }
        }
      } catch (error) {
        console.error('Error during session:', error);
      }
      
      return session;
    },
    async jwt({ token, user }) {
      return token;
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET || 'fallback-secret-key',
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };