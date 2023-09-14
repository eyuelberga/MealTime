import NextAuth from "next-auth";

declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        user: {
            id: string;
            name: string;
            username: string;
            email: string;
            roles: string[];
            accessToken: string;
            refreshToken: string;
        };
    }
}
declare module "next-auth/jwt" {
    interface JWT {
        id_token: string;
    }
}