use ultragame;

CREATE TABLE publishers (
  id varchar(36) NOT NULL,
  name varchar(255) DEFAULT NULL,
  phone varchar(255) DEFAULT NULL,
  siret varchar(255) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY idx_publisher_siret (siret)
);

CREATE TABLE IF NOT EXISTS games (
  id varchar(36) NOT NULL,
  title varchar(255) NOT NULL,
  price int NOT NULL,
  tags text,
  publisherId varchar(36) DEFAULT NULL,
  releaseDate timestamp NULL DEFAULT NULL,
  discounted tinyint NOT NULL DEFAULT '0',
  PRIMARY KEY (id),
  KEY idx_game_realease_date (releaseDate),
  CONSTRAINT FK_games_publishers_publisherId FOREIGN KEY (publisherId) REFERENCES publishers (id)
);

