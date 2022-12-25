CREATE TABLE orders(id SERIAL PRIMARY KEY,
                                      statuso VARCHAR(15),
                                              user_id bigint REFERENCES users(id));

