CREATE SEQUENCE EVENT_SEQ;
CREATE TABLE EVENTS (ID UUID NOT NULL DEFAULT RANDOM_UUID() PRIMARY KEY, AGGREGATE_ID UUID NOT NULL, EVENT_DATA VARCHAR NOT NULL, USER VARCHAR NOT NULL, CREATED TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(), SEQUENCE BIGINT NOT NULL DEFAULT NEXTVAL('EVENT_SEQ'));
CREATE TABLE CUSTOMERS (ID UUID NOT NULL DEFAULT RANDOM_UUID() PRIMARY KEY, NAME VARCHAR NOT NULL, COUNTRY CHAR(2) NOT NULL, EMAIL VARCHAR NOT NULL);
CREATE TABLE CATEGORIES (ID UUID NOT NULL DEFAULT RANDOM_UUID() PRIMARY KEY, NAME VARCHAR NOT NULL, PARENT_CATEGORY UUID, FOREIGN KEY (PARENT_CATEGORY) REFERENCES CATEGORIES(ID) ON DELETE CASCADE);
CREATE TABLE PRODUCTS (ID UUID NOT NULL DEFAULT RANDOM_UUID() PRIMARY KEY, NAME VARCHAR NOT NULL, PRICE INT NOT NULL, MULTIPLICITY INT NOT NULL DEFAULT 1, FEATURES VARCHAR, NOTE VARCHAR, CATEGORY UUID, VISIBLE BOOLEAN NOT NULL DEFAULT TRUE, FOREIGN KEY(CATEGORY) REFERENCES CATEGORIES(ID) ON DELETE SET NULL);