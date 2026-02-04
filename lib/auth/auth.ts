import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient, Db } from "mongodb";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { initializeUserBoard } from "../init-user-board";

// Cache the MongoDB client connection for Next.js hot reloads
const globalForMongo = globalThis as unknown as {
    _mongoClientPromise: Promise<MongoClient> | undefined;
};

const uri = process.env.MONGODB_URI!;

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

const mongoOptions = {
    tls: true,
    tlsAllowInvalidCertificates: false,
    tlsAllowInvalidHostnames: false,
};

if (process.env.NODE_ENV === "development") {

    if (!globalForMongo._mongoClientPromise) {
        client = new MongoClient(uri, mongoOptions);
        globalForMongo._mongoClientPromise = client.connect();
    }
    clientPromise = globalForMongo._mongoClientPromise;
} else {
    // In production mode, it's safe to create a new client
    client = new MongoClient(uri, mongoOptions);
    clientPromise = client.connect();
}

// Get the connected client synchronously after first connection
const connectedClient = await clientPromise;
const db: Db = connectedClient.db();

export const auth = betterAuth({
    database: mongodbAdapter(db),
    emailAndPassword: {
        enabled: true,
    },
    databaseHooks: {
        user: {
            create: {
                after: async ( user ) => {

                    if (user.id) {
                        await initializeUserBoard(user.id);
                    }
                }
            }
        }
    }
});

export async function getSession() {
    const result = await auth.api.getSession({
        headers: await headers(),
    });
    return result

}

export async function signOut() {
 const result = await auth.api.signOut({
        headers: await headers(),
    });
    if (result.success){
      redirect("/sign-in")
    }
}