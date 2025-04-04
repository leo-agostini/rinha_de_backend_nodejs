import { Pool, PoolClient } from "pg";

export default interface DatabaseConnection {
  client(): Promise<PoolClient>;
  disconnect(): Promise<void>;
}

export class DatabasePgConnectionAdapter implements DatabaseConnection {
  pool: Pool | null = null;

  constructor() {
    this.pool = new Pool({
      user: "admin",
      password: "123",
      host: "172.19.0.2",
      // host: "localhost",
      port: 5432,
      database: "rinha",
      min: 5,
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 30000,
      query_timeout: 5000,
    });

    this.pool.on("connect", () => {
      console.log("Connected to the database");
    });

    this.pool.on("error", (err) => {
      console.log("Unexpected error on idle client", err);
      this.pool?.end();
      process.exit(-1);
    });
  }

  async disconnect(): Promise<void> {
    await this.pool?.end();
  }

  async client(): Promise<PoolClient> {
    const client = await this.pool?.connect();
    if (!client) {
      throw new Error("Failed to connect to the database");
    }
    return client;
  }
}
