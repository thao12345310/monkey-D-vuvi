CREATE TABLE "user" (
  user_id INTEGER PRIMARY KEY,
  username VARCHAR,
  password VARCHAR,
  dob DATE,
  role VARCHAR
);

CREATE TABLE hotel_short_description (
  hotel_id INTEGER,
  block_id INTEGER,
  description VARCHAR,
  PRIMARY KEY (hotel_id, block_id)
);

CREATE TABLE ship_short_description (
  ship_id INTEGER,
  block_id INTEGER,
  description VARCHAR,
  PRIMARY KEY (ship_id, block_id)
);

CREATE TABLE features (
  feature_id INTEGER PRIMARY KEY,
  feature_description VARCHAR
);

CREATE TABLE company (
  company_id INTEGER PRIMARY KEY,
  company_name VARCHAR,
  username VARCHAR,
  password VARCHAR,
  role VARCHAR
);

CREATE TABLE hotel (
  hotel_id INTEGER PRIMARY KEY,
  hotel_name VARCHAR,
  total_rooms INTEGER,
  company_name VARCHAR,
  hotel_price INTEGER,
  city VARCHAR,
  address VARCHAR,
  map_link VARCHAR,
  thumbnail VARCHAR,
  company_id INTEGER,
  FOREIGN KEY (company_id) REFERENCES company(company_id)
);

CREATE TABLE hotel_room (
  hotel_room_id INTEGER PRIMARY KEY,
  hotel_id INTEGER,
  room_name VARCHAR,
  room_price INTEGER,
  room_features VARCHAR,
  size INTEGER,
  max_persons INTEGER,
  bed_type VARCHAR,
  view VARCHAR,
  FOREIGN KEY (hotel_id) REFERENCES hotel(hotel_id)
);

CREATE TABLE ship (
  ship_id INTEGER PRIMARY KEY,
  ship_name VARCHAR,
  launch INTEGER,
  cabin INTEGER,
  shell VARCHAR,
  trip VARCHAR,
  company_name VARCHAR,
  ship_price INTEGER,
  address VARCHAR,
  map_link VARCHAR,
  company_id INTEGER,
  FOREIGN KEY (company_id) REFERENCES company(company_id)
);

CREATE TABLE ship_room (
  ship_room_id INTEGER PRIMARY KEY,
  ship_id INTEGER,
  room_name VARCHAR,
  size INTEGER,
  max_persons INTEGER,
  room_price INTEGER,
  room_features VARCHAR,
  FOREIGN KEY (ship_id) REFERENCES ship(ship_id)
);

CREATE TABLE ship_features (
  ship_id INTEGER,
  feature_id INTEGER,
  PRIMARY KEY (ship_id, feature_id),
  FOREIGN KEY (ship_id) REFERENCES ship(ship_id),
  FOREIGN KEY (feature_id) REFERENCES features(feature_id)
);

CREATE TABLE hotel_features (
  hotel_id INTEGER,
  feature_id INTEGER,
  PRIMARY KEY (hotel_id, feature_id),
  FOREIGN KEY (hotel_id) REFERENCES hotel(hotel_id),
  FOREIGN KEY (feature_id) REFERENCES features(feature_id)
);

CREATE TABLE hotel_long_description (
  hotel_id INTEGER,
  block_id INTEGER,
  type VARCHAR,
  data VARCHAR,
  PRIMARY KEY (hotel_id, block_id),
  FOREIGN KEY (hotel_id) REFERENCES hotel(hotel_id)
);

CREATE TABLE ship_long_description (
  ship_id INTEGER,
  block_id INTEGER,
  type VARCHAR,
  data VARCHAR,
  PRIMARY KEY (ship_id, block_id),
  FOREIGN KEY (ship_id) REFERENCES ship(ship_id)
);

CREATE TABLE hotel_room_features (
  hotel_room_id INTEGER,
  feature_id INTEGER,
  PRIMARY KEY (hotel_room_id, feature_id),
  FOREIGN KEY (hotel_room_id) REFERENCES hotel_room(hotel_room_id),
  FOREIGN KEY (feature_id) REFERENCES features(feature_id)
);

CREATE TABLE ship_room_features (
  ship_room_id INTEGER,
  feature_id INTEGER,
  PRIMARY KEY (ship_room_id, feature_id),
  FOREIGN KEY (ship_room_id) REFERENCES ship_room(ship_room_id),
  FOREIGN KEY (feature_id) REFERENCES features(feature_id)
);

CREATE TABLE booking_ship_room (
  booking_room_id INTEGER PRIMARY KEY,
  ship_room_id INTEGER,
  user_id INTEGER,
  state VARCHAR,
  start_date DATE,
  end_date DATE,
  FOREIGN KEY (ship_room_id) REFERENCES ship_room(ship_room_id),
  FOREIGN KEY (user_id) REFERENCES "user"(user_id)
);

CREATE TABLE booking_hotel_room (
  booking_room_id INTEGER PRIMARY KEY,
  hotel_room_id INTEGER,
  user_id INTEGER,
  state VARCHAR,
  FOREIGN KEY (hotel_room_id) REFERENCES hotel_room(hotel_room_id),
  FOREIGN KEY (user_id) REFERENCES "user"(user_id)
);

-- Foreign key references for descriptions
ALTER TABLE ship_short_description ADD FOREIGN KEY (ship_id) REFERENCES ship(ship_id);
ALTER TABLE hotel_short_description ADD FOREIGN KEY (hotel_id) REFERENCES hotel(hotel_id);
