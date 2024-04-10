create table user_greet_counter (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    greet_count INT
);

create table language_greeting_map (
    id SERIAL PRIMARY KEY,
    language TEXT NOT NULL UNIQUE,
    greetings TEXT NOT NULL
);