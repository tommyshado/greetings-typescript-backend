create table user_greet_counter (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    greet_count INT
);