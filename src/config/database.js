export const development = {
  use_env_variable: 'DATABASE_URL',
  username: 'stvnjvr',
  password: 'toor',
  database: 'shoffer',
  host: 'localhost',
  ssl: true,
  dialect: 'postgres',
  logging: false
};

export const production = {
  use_env_variable: 'DATABASE_URL',
  ssl: true,
  dialect: 'postgres',
  dialectOptions: {
    ssl: { required: true, rejectUnauthorized: false }
  },
  logging: false
};
