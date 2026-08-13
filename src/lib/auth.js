const dns = require("dns")
dns.setServers([
  "1.1.1.1",
  '8.8.8.8'
])

import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { jwt } from "better-auth/plugins"

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db("mediqueue");

const googleProvider =
  process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
    ? {
      google: {
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      },
    }
    : undefined;

export const auth = betterAuth({
  baseURL:
    process.env.BETTER_AUTH_URL ||
    process.env.NEXT_PUBLIC_BETTER_AUTH_URL ||
    undefined,

  ...(googleProvider ? { socialProviders: googleProvider } : {}),

  database: mongodbAdapter(db, {
    // Optional: if you don't provide a client, database transactions won't be enabled.
    client
  }),

  emailAndPassword: {
    enabled: true,
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID ,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },

  advanced: {
    generateJWKS: true
  },

  session: {
    cookieCache: {
      enabled: true,
      strategy: "jwt",
      maxAge: 432000,
    }
  },

  plugins: [
    jwt(),
  ],
});