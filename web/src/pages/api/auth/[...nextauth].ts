import NextAuth from "next-auth";
import axios, { AxiosError } from "axios";
import KeycloakProvider from "next-auth/providers/keycloak";
import jwt_decode from "jwt-decode";
import { JWT } from "next-auth/jwt";

const keycloak = KeycloakProvider({
  clientId: `${process.env.AUTH_CLIENT_ID}`,
  clientSecret: `${process.env.AUTH_CLIENT_SECRET}`,
  issuer: `${process.env.AUTH_ISSUER}`,
  name: "Meal Time",
  style: {
    logo: "http://localhost:3000/next.svg",
    logoDark: "http://localhost:3000/next.svg",
    bg: "#fff",
    text: "#000",
    bgDark: "#fff",
    textDark: "#000",
  }
});

// this will refresh an expired access token, when needed
async function refreshAccessToken(token: any) {
  const resp = await axios.post(`${keycloak.options!.issuer}/protocol/openid-connect/token`,
    {
      client_id: process.env.AUTH_CLIENT_ID || "",
      client_secret: process.env.AUTH_CLIENT_SECRET || "",
      grant_type: "refresh_token",
      refresh_token: token.refresh_token,
    },
    {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });
  const refreshToken = await resp.data;

  return {
    ...token,
    access_token: refreshToken.access_token,
    decoded: jwt_decode(refreshToken.access_token),
    id_token: refreshToken.id_token,
    expires_at: Math.floor(Date.now() / 1000) + refreshToken.expires_in,
    refresh_token: refreshToken.refresh_token,
  };
}

async function providerLogout(jwt: JWT) {
  const { id_token } = jwt;
  try {
    const { status, statusText } = await axios(`${keycloak.options!.issuer}/protocol/openid-connect/logout`, {
      params: {
        id_token_hint: id_token
      }
    });
  }
  catch (e: any) {
    console.error("Unable to perform logout", (e as AxiosError)?.code || e)
  }

}

export const authOptions = {
  providers: [
    keycloak,
  ],
  callbacks: {
    async jwt({ token, account }: any) {
      const nowTimestamp = Math.floor(Date.now() / 1000);
      if (account) {
        token.payload = jwt_decode(account.access_token);
        token.access_token = account.access_token;
        token.id_token = account.id_token;
        token.expires_at = account.expires_at;
        token.refresh_token = account.refresh_token;
      }

      if (nowTimestamp >= token.expires_at) {
        // token is expired, try to refresh it
        try {
          return await refreshAccessToken(token);
        } catch (error) {
          // force signin 
          return null
        }
      }
      return token;
    },
    async session({ session, token }: any) {
      session.user = {
        id: token.payload.sub,
        username: token.payload.preferred_username,
        name: token.payload.name,
        email: token.payload.email,
        accessToken: token.access_token,
        refreshToken: token.refresh_token,
        roles: token.payload.resource_access[keycloak.options!.clientId].roles
      }
      return session;
    },
  },
  events: {
    signOut: ({ token }: any) => providerLogout(token)
  }
};

export default NextAuth(authOptions);

