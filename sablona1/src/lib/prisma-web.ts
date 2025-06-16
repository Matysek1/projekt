import { PrismaClient } from '@prisma/client';

const clients: Record<string, PrismaClient> = {};

const connectionStrings: Record<string, string> = {
  web1: process.env.DATABASE_URL_WEB1!,
  web2: process.env.DATABASE_URL_WEB2!,
  web3: process.env.DATABASE_URL_WEB3!,
  web4: process.env.DATABASE_URL_WEB4!,
  web5: process.env.DATABASE_URL_WEB5!,
  web6: process.env.DATABASE_URL_WEB6!,
};

export default function getRemotePrismaClient(webName: string): PrismaClient {
  if (!clients[webName]) {
    if (!connectionStrings[webName]) {
      throw new Error(`No connection string found for ${webName}`);
    }
    clients[webName] = new PrismaClient({
      datasources: {
        db: {
          url: connectionStrings[webName],
        },
      },
    });
  }
  return clients[webName];
}