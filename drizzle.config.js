// This file is used to configure Drizzle ORM for database migrations and schema generation.
// It specifies the database connection details and the schema file to be used.
// It is important to keep this file secure and not expose sensitive information like database credentials.
// Make sure to add this file to your .gitignore if it contains sensitive information.
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
 
  schema: './config/schema.js',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});
