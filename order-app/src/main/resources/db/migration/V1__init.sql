CREATE SEQUENCE EVENT_SEQ;
CREATE TABLE EVENTS (
  ID UUID NOT NULL DEFAULT RANDOM_UUID() PRIMARY KEY,
  AGGREGATE_ID UUID NOT NULL,
  EVENT_DATA VARCHAR NOT NULL,
  USER VARCHAR NOT NULL,
  CREATED TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  SEQUENCE BIGINT NOT NULL DEFAULT NEXTVAL('EVENT_SEQ')
);
CREATE TABLE CUSTOMERS (
  ID UUID NOT NULL DEFAULT RANDOM_UUID() PRIMARY KEY,
  NAME VARCHAR NOT NULL,
  COUNTRY CHAR(2) NOT NULL,
  EMAIL VARCHAR NOT NULL
);
CREATE TABLE CATEGORIES (
  ID UUID NOT NULL DEFAULT RANDOM_UUID() PRIMARY KEY,
  NAME VARCHAR NOT NULL,
  PARENT_CATEGORY UUID,
  WEIGHT INT NOT NULL DEFAULT 0,
  FOREIGN KEY (PARENT_CATEGORY) REFERENCES CATEGORIES(ID) ON DELETE CASCADE
);
CREATE TABLE PRODUCTS (
  ID UUID NOT NULL DEFAULT RANDOM_UUID() PRIMARY KEY,
  NAME VARCHAR NOT NULL,
  PRICE INT NOT NULL,
  MULTIPLICITY INT NOT NULL DEFAULT 1,
  FEATURES VARCHAR DEFAULT '',
  NOTE VARCHAR DEFAULT '',
  CATEGORY UUID NOT NULL DEFAULT '249e2189-8e76-4cb8-a682-662c8ae44392',
  WEIGHT INT NOT NULL DEFAULT 0,
  FOREIGN KEY(CATEGORY) REFERENCES CATEGORIES(ID) ON DELETE SET DEFAULT
);