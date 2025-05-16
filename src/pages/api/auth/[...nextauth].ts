import NextAuth, { NextAuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { prisma } from '../../../../lib/prisma'
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions  = {
  adapter: PrismaAdapter(prisma),
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || '',
      clientSecret: process.env.GITHUB_SECRET || '',
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_SECRET || ''
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Correo", type: "text"},
        password: {  label: "Contraseña", type: "password" }
      },
      authorize: async (credentials) => {
        if(!credentials) return null

        const {email, password} = credentials

        const user = await prisma.user.findFirst({
          where: { email: email },
        })
  
        if (!user) {
          return null;
        }
        
        if (!user?.isActive) {
          return null;
        }

        if (!user.password) {
          return null;
        }

        const isValidPassword = bcrypt.compare(password, user.password);

        if (!isValidPassword) {
          return null;
        }

        return user
      }
    })
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }

      return token;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    session: async ({ session, token } : any) => {
      if (token) {
        session.user.id = token.id;
      }
      return session
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt"
  },
  jwt: {
    maxAge: 60 * 60 * 24
  },
  pages: {
    signIn: '/login',
    signOut: '/',
    error: '/login',
    newUser: '/'
  }
}
export default NextAuth(authOptions)