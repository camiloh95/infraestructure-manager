import * as dotenv from 'dotenv';

dotenv.config();

export default {
  port: process.env.PORT || 3000,
  databases: {
    infraestructure: {
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || '3306',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'root',
      name: process.env.DB_NAME || 'test',
    },
  },
  bitbucket: {
    clientId: process.env.BITBUCKET_CLIENT_ID || '',
    clientSecret: process.env.BITBUCKET_CLIENT_SECRET || '',
    username: process.env.BITBUCKET_USERNAME || '',
    password: process.env.BITBUCKET_PASSWORD || '',
    worspace: process.env.BITBUCKET_WORKSPACE || '',
  },
}