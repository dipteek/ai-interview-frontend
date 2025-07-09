// app/api/auth/[...nextauth]/route.js
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/login/`, {
            email: credentials.email,
            password: credentials.password
          });

          console.log('Login response:', response.data); // Add this

          if (response.data.user && response.data.token) {
            //localStorage.setItem('token', response.data.token)
            //localStorage.setItem('user', JSON.stringify(response.data.user))
            return {
              ...response.data.user,
              djangoToken: response.data.token,
              id: response.data.user.id,
              email: response.data.user.email,
              name: response.data.user.username || response.data.user.first_name,
              token: response.data.token, // Store Django token
              //djangoToken: response.data.token // Also store as djangoToken
            };
          }
          return null;
        } catch (error) {
          console.error('Credentials error:', error?.response?.data || error.message);
          throw new Error(error.response?.data?.message || 'Login failed');
        }
      }

    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account.provider === 'google') {
        try {
          const response = await axios.post(
            /*`${process.env.DJANGO_API_URL}/api/auth/google/register/`*/`${process.env.NEXT_PUBLIC_BACKEND_URL}/dj-rest-auth/google/`,
            {
              id_token: account.id_token,
              access_token: account.access_token,
              email: profile.email,
              name: profile.name
            }
          );

          if (response.data.success) {
            user.djangoToken = response.data.access;
            //user.djangoToken = response.data.token;
            user.djangoUser = response.data.user;
            //localStorage.setItem('token', response.data.token)
            //localStorage.setItem('user', JSON.stringify(response.data.user))
            return true;
          }
          return false;
        } catch (error) {
          console.error('Error during Google sign in:', error.response?.data || error.message);
          return false;
        }
      }
      return true;
    },
    /*async jwt({ token, user, account, profile }) {
      if (account && user) {
        if (account.provider === 'google') {
          return {
            ...token,
            accessToken: account.access_token,
            refreshToken: account.refresh_token,
            djangoToken: user.djangoToken,
            djangoUser: user.djangoUser,
            userProfile: profile
          };
        } else {
          //token.user = user;
          token.djangoToken = user.djangoToken;
          token.djangoUser = user; // store user info too
        }
      }
      return token;
    },*/
    async jwt({ token, user, account }) {
  if (user?.djangoToken) {
    token.jwtToken = user.jwtToken
    //token.djangoToken = user.djangoToken;
    token.djangoToken = user.djangoToken; 
    token.djangoUser = user.djangoUser;
  }

  if (account?.provider === 'google') {
    token.accessToken = account.access_token;
    token.refreshToken = account.refresh_token;
  }

  return token;
},
    async session({ session, token }) {
      if (token.accessToken) {
        session.accessToken = token.accessToken;
        session.refreshToken = token.refreshToken;
        session.djangoToken = token.djangoToken;
        session.jwtToken = token.jwtToken;
        session.user = {
          ...session.user,
          ...token.djangoUser
        };
      } else {
        session.user = token.user;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
    signOut: '/logout',
    error: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };