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

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    // Optional: if you don't provide a client, database transactions won't be enabled.
    client
  }),

  emailAndPassword: {
    enabled: true,
  },

  advanced: {
        generateJWKS: true 
    },

  session: {
    cookueCache: {
      enabled: true,
      strategy: "jwt",
      maxAge: 432000,
    }
  },
  
  plugins: [
    jwt(),
  ],
});