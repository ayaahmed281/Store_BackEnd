# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Dev mode

To install the app's dependencies and use the app in dev mode, run the following:

`npm create-db-dev`

`npm create-db-dev` runs a script that uses db-migrate to create a new database called `storefront` and runs the migrations to create the tables `db-migrate up`. This script assumes you have installed `postgres` on your local system and the server is running.

To run the app in dev mode execute `yarn start`.

## port number
database is 5434
server is 54242
## env variables
 host: "localhost",
  port: 5434,
  database: "dev",
  user: "postgres",
  password: "aya"
# Package installation instructions.
npm i
# Database schema with column name and type.
## API Endpoints
#### Users

- id
- email
- firstName
- lastName
- password

- Index [token required] (GET `/api/users`)
- Show [token required] (GET `/api/users/:id`)
- Create (POST `/api/users`)
- Update [token required] (PUT `/api/users/:id`)
- Delete [token required] (DELETE `/api/users/:id`)


CREATE TABLE users (id SERIAL PRIMARY KEY,
                                      email VARCHAR(20) UNIQUE,
                                                        firstName VARCHAR(20) NOT NULL,
                                                                              lastName VARCHAR(20) NOT NULL,
                                                                                                   password VARCHAR(255) NOT NULL);


#### Products

- pid
- pName
- price
- category

- Index (GET `/api/productsList` )
- Show (GET `/api/productsList/:id`)
- Create [token required] (POST `/api/productsList`)
- Update [token required] (PUT `/api/productsList/:id`)
- Delete [token required] (DELETE `/api/productsList/:id`)

CREATE TABLE products (PID SERIAL PRIMARY KEY,
                                          pName VARCHAR(20) not null,
                                                            price integer not null,
                                                                          category VARCHAR(20));

#### Orders

- id
- order_status
- quantity
- product_id
- user_id

- Index [token required] (GET `/api/orders`)
- Show [token required] (GET `/api/orders/:id`)
- Create [token required] (POST `/api/orders`)
- Update [token required] (PUT `/api/orders/:id`)
- Delete [token required] (DELETE `/api/orders/:id`)
- add product to order (POST `orders/add`)

CREATE TABLE orders
    (id serial primary key,
                       order_status varchar(20) not null,
                                                quantity integer not null,
                                                                 "user_id" integer DEFAULT NULL,
                                                                                           "product_id" integer DEFAULT NULL,
     FOREIGN KEY ("user_id") REFERENCES users("id") on delete cascade on update cascade,
     FOREIGN KEY ("product_id") REFERENCES products("pid") on delete cascade on update cascade);

#### ordersProducts

- id
- product_id
- order_id
- quantity

CREATE TABLE ordersProducts
    (id serial primary key,
                       quantity integer not null,
                                        "order_id" integer DEFAULT NULL,
                                                                   "product_id" integer DEFAULT NULL,
     FOREIGN KEY ("order_id") REFERENCES orders("id") on delete cascade on update cascade,
     FOREIGN KEY ("product_id") REFERENCES products("pid") on delete cascade on update cascade);

