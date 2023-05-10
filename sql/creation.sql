-- Eliminamos las tablas si existen
DROP TABLE IF EXISTS favourite_products;
DROP TABLE IF EXISTS products_clients;
DROP TABLE IF EXISTS shoes;
DROP TABLE IF EXISTS users;

-- Eliminamos la extensión "uuid-ossp" si existe
DROP EXTENSION IF EXISTS "uuid-ossp";

-- Creamos la extensión "uuid-ossp" para poder generar UUIDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Creamos la tabla "users"
CREATE TABLE IF NOT EXISTS users (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  age INTEGER NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL
);

-- Creamos la tabla "shoes"
CREATE TABLE IF NOT EXISTS shoes (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  brand TEXT NOT NULL,
  size INTEGER NOT NULL,
  color TEXT NOT NULL,
  model TEXT NOT NULL
);

-- Creamos la tabla "products_clients"
CREATE TABLE IF NOT EXISTS products_clients (
  id SERIAL PRIMARY KEY,
  purchase_date DATE NOT NULL NOW(),
  user_id uuid REFERENCES users
    ON UPDATE CASCADE
    ON DELETE SET NULL,
  shoe_id UUID NOT NULL REFERENCES shoes(id)
    ON UPDATE CASCADE
    ON DELETE SET NULL
);

-- Creamos la tabla "favourite_products"
CREATE TABLE IF NOT EXISTS favourite_products (
  id SERIAL PRIMARY KEY,
  favourite_date DATE NOT NULL NOW(),
  user_id UUID NOT NULL REFERENCES users(id)
    ON UPDATE CASCADE
    ON DELETE SET NULL,
  shoe_id UUID NOT NULL REFERENCES shoes(id)
    ON UPDATE CASCADE
    ON DELETE SET NULL
);
