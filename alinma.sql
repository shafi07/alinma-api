CREATE TABLE IF NOT EXISTS users(
id SERIAL PRIMARY KEY,
userName VARCHAR UNIQUE NOT NULL,
password VARCHAR
);

CREATE TABLE IF NOT EXISTS javasath(
id SERIAL PRIMARY KEY,
fileId VARCHAR GENERATED ALWAYS AS ('JZ' || id::VARCHAR) STORED,
sponser_name VARCHAR,
amount_paid_dates JSONB[],
name VARCHAR,
mol NUMERIC,
agent VARCHAR,
agent_amount NUMERIC,
paid_date VARCHAR,
status VARCHAR default 'pending',
sub_category VARCHAR,
remarks TEXT,
id_number VARCHAR,
professionName VARCHAR,
newSponser VARCHAR,
purpose VARCHAR,
iqama NUMERIC,
insurance NUMERIC,
other NUMERIC,
total_amount NUMERIC,
balance_amount NUMERIC GENERATED ALWAYS AS (total_amount-paid_amount) STORED,
paid_amount NUMERIC,
service NUMERIC,
mobileNumber VARCHAR,
createdUser INTEGER,
updatedUser INTEGER,
createdTime TIMESTAMP WITHOUT TIME ZONE default current_timestamp,
modifiedTime TIMESTAMP WITHOUT TIME ZONE,
	FOREIGN KEY(createdUser) references users(id),
	FOREIGN KEY(updatedUser) references users(id)
);

CREATE TABLE IF NOT EXISTS insurance(
id SERIAL PRIMARY KEY,
fileId VARCHAR GENERATED ALWAYS AS ('IN' || id::VARCHAR) STORED,
name VARCHAR,
id_number VARCHAR,
amount_paid_dates JSONB[],
add_or_new VARCHAR,
sub_category VARCHAR,
dob VARCHAR,
agent VARCHAR,
agent_amount NUMERIC,
paid_date VARCHAR,
status VARCHAR default "pending",
service NUMERIC,
total_amount NUMERIC,
balance_amount NUMERIC GENERATED ALWAYS AS (total_amount-paid_amount) STORED,
paid_amount NUMERIC,
sponser_name VARCHAR,
mobileNumber VARCHAR,
createdUser INTEGER,
updatedUser INTEGER,
remarks TEXT,
createdTime TIMESTAMP WITHOUT TIME ZONE default current_timestamp,
modifiedTime TIMESTAMP WITHOUT TIME ZONE,
	FOREIGN KEY(createdUser) references users(id),
	FOREIGN KEY(updatedUser) references users(id)
);

CREATE TABLE IF NOT EXISTS work(
id SERIAL PRIMARY KEY,
fileId VARCHAR GENERATED ALWAYS AS ('WK' || id::VARCHAR) STORED,
name VARCHAR,
id_number VARCHAR,
sub_category VARCHAR,
amount_paid_dates JSONB[],
status VARCHAR default 'pending',
total_amount NUMERIC,
service NUMERIC,
balance_amount NUMERIC GENERATED ALWAYS AS (total_amount-paid_amount) STORED,
paid_amount NUMERIC,
agent_amount NUMERIC,
agent VARCHAR,
paid_date VARCHAR,
sponser_name VARCHAR,
mobileNumber VARCHAR,
createdUser INTEGER,
updatedUser INTEGER,
remarks TEXT,
createdTime TIMESTAMP WITHOUT TIME ZONE default current_timestamp,
modifiedTime TIMESTAMP WITHOUT TIME ZONE,
	FOREIGN KEY(createdUser) references users(id),
	FOREIGN KEY(updatedUser) references users(id)
);

CREATE TABLE IF NOT EXISTS other(
id SERIAL PRIMARY KEY,
fileId VARCHAR GENERATED ALWAYS AS ('OT' || id::VARCHAR) STORED,
name VARCHAR,
id_number VARCHAR,
status VARCHAR default "pending",
sub_category VARCHAR,
amount_paid_dates JSONB[],
paid_date VARCHAR,
agent VARCHAR,
agent_amount NUMERIC,
service NUMERIC,
total_amount NUMERIC,
balance_amount NUMERIC GENERATED ALWAYS AS (total_amount-paid_amount) STORED,
paid_amount NUMERIC,
sponser_name VARCHAR,
mobileNumber VARCHAR,
createdUser INTEGER,
updatedUser INTEGER,
remarks TEXT,
createdTime TIMESTAMP WITHOUT TIME ZONE default current_timestamp,
modifiedTime TIMESTAMP WITHOUT TIME ZONE,
	FOREIGN KEY(createdUser) references users(id),
	FOREIGN KEY(updatedUser) references users(id)
);

CREATE TABLE IF NOT EXISTS visa(
id SERIAL PRIMARY KEY,
fileId VARCHAR GENERATED ALWAYS AS ('VS' || id::VARCHAR) STORED,
name VARCHAR,
id_number VARCHAR,
visa_number VARCHAR,
amount_paid_dates JSONB[],
paid_date VARCHAR,
status VARCHAR default "pending",
sub_category VARCHAR,
agent VARCHAR,
agent_amount NUMERIC,
chamber_amount NUMERIC,
service NUMERIC,
total_amount NUMERIC,
balance_amount NUMERIC GENERATED ALWAYS AS (total_amount-paid_amount) STORED,
paid_amount NUMERIC,
sponser_name VARCHAR,
mobileNumber VARCHAR,
createdUser INTEGER,
updatedUser INTEGER,
remarks TEXT,
createdTime TIMESTAMP WITHOUT TIME ZONE default current_timestamp,
modifiedTime TIMESTAMP WITHOUT TIME ZONE,
	FOREIGN KEY(createdUser) references users(id),
	FOREIGN KEY(updatedUser) references users(id)
);

CREATE TABLE IF NOT EXISTS expense(
id SERIAL PRIMARY KEY,
fileId VARCHAR GENERATED ALWAYS AS ('EX' || id::VARCHAR) STORED,
electricity NUMERIC,
other NUMERIC,
total_amount NUMERIC GENERATED ALWAYS AS (electricity+telephone+salary+stationary+other) STORED,
stationary NUMERIC,
salary NUMERIC,
telephone NUMERIC,
createdUser INTEGER,
updatedUser INTEGER,
remarks TEXT,
createdTime TIMESTAMP WITHOUT TIME ZONE default current_timestamp,
modifiedTime TIMESTAMP WITHOUT TIME ZONE,
	FOREIGN KEY(createdUser) references users(id),
	FOREIGN KEY(updatedUser) references users(id)
);

ALTER TABLE work ADD COLUMN work_type VARCHAR;
ALTER TABLE work ADD COLUMN government_fee NUMERIC;
ALTER TABLE visa ADD COLUMN government_fee NUMERIC;
ALTER TABLE insurance ADD COLUMN company VARCHAR;
ALTER TABLE javasath ADD COLUMN due VARCHAR;
ALTER TABLE javasath ADD COLUMN boarder_number VARCHAR;

ALTER TABLE javasath ADD COLUMN government_fee NUMERIC;
ALTER TABLE javasath ADD COLUMN absheer_amount NUMERIC;
ALTER TABLE javasath ADD COLUMN qiwa_amount NUMERIC;
ALTER TABLE javasath ADD COLUMN new_passport_number VARCHAR;
ALTER TABLE javasath ADD COLUMN expiry_date VARCHAR;
ALTER TABLE visa ADD COLUMN application_number VARCHAR;
ALTER TABLE visa ADD COLUMN travels VARCHAR;

CREATE EXTENSION IF NOT EXISTS pg_trgm;
CREATE INDEX javasath_name_gin_trgm_idx ON javasath USING gin (name gin_trgm_ops);
CREATE INDEX javasath_mobileNumber_gin_trgm_idx ON javasath USING gin (mobileNumber gin_trgm_ops);
CREATE INDEX insurance_name_gin_trgm_idx ON insurance USING gin (name gin_trgm_ops);
CREATE INDEX insurance_mobileNumber_gin_trgm_idx ON insurance USING gin (mobileNumber gin_trgm_ops);
CREATE INDEX work_name_gin_trgm_idx ON work USING gin (name gin_trgm_ops);
CREATE INDEX work_mobileNumber_gin_trgm_idx ON work USING gin (mobileNumber gin_trgm_ops);
CREATE INDEX other_name_gin_trgm_idx ON other USING gin (name gin_trgm_ops);
CREATE INDEX other_mobileNumber_gin_trgm_idx ON other USING gin (mobileNumber gin_trgm_ops);
CREATE INDEX visa_name_gin_trgm_idx ON visa USING gin (name gin_trgm_ops);
CREATE INDEX visa_mobileNumber_gin_trgm_idx ON visa USING gin (mobileNumber gin_trgm_ops);

CREATE INDEX visa_createdTime_btree_idx ON visa (createdTime DESC);
CREATE INDEX insurance_createdTime_btree_idx ON insurance (createdTime DESC);
CREATE INDEX work_createdTime_btree_idx ON work (createdTime DESC);
CREATE INDEX other_createdTime_btree_idx ON other (createdTime DESC);
CREATE INDEX javasath_createdTime_btree_idx ON javasath (createdTime DESC);
CREATE INDEX idxgin ON javasath USING GIN (amount_paid_dates);
CREATE INDEX javasath_id_number_gin_trgm_idx ON javasath USING gin (id_number gin_trgm_ops);
CREATE INDEX insurance_id_number_gin_trgm_idx ON insurance USING gin (id_number gin_trgm_ops);
CREATE INDEX work_id_number_gin_trgm_idx ON work USING gin (id_number gin_trgm_ops);
CREATE INDEX other_id_number_gin_trgm_idx ON other USING gin (id_number gin_trgm_ops);
CREATE INDEX visa_id_number_gin_trgm_idx ON visa USING gin (id_number gin_trgm_ops);
CREATE INDEX visa_file_id_gin_trgm_idx ON visa USING gin (fileid gin_trgm_ops);
CREATE INDEX other_file_id_gin_trgm_idx ON other USING gin (fileid gin_trgm_ops);

-- This index is not executed
CREATE INDEX idx_trgm_search ON other USING gin (name gin_trgm_ops, mobileNumber gin_trgm_ops, id_number gin_trgm_ops, fileId gin_trgm_ops);

//

CREATE TABLE IF NOT EXISTS users(
userid SERIAL PRIMARY KEY,
email VARCHAR(255) UNIQUE NOT NULL,
phone_number VARCHAR(255) UNIQUE NOT NULL,
createdtime TIMESTAMP DEFAULT CURRENT_TIMESTAMP(),
name VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS courses(
id SERIAL,
masaaq_id VARCHAR(255) PRIMARY KEY,
title VARCHAR(255),
description TEXT,
price VARCHAR(255),
image TEXT,
createdtime TIMESTAMP DEFAULT CURRENT_TIMESTAMP(),
isActive BOOLEAN
);

CREATE TABLE IF NOT EXISTS coupon(
coupon_id SERIAL,
coupon_name VARCHAR(255) PRIMARY KEY,
discount_amount VARCHAR(255),
discount_percentage VARCHAR(255),
createdtime TIMESTAMP DEFAULT CURRENT_TIMESTAMP(),
discount_type VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS offer_course(
offer_course_id SERIAL PRIMARY KEY,
coupon_name VARCHAR(255),
masaaq_id VARCHAR(255),
isActive BOOLEAN,
createdtime TIMESTAMP DEFAULT CURRENT_TIMESTAMP(),
FOREIGN KEY(coupon_name) 
        REFERENCES coupon(coupon_name)
        ON DELETE CASCADE,
FOREIGN KEY(masaaq_id) 
        REFERENCES courses(masaaq_id)
        ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS purchase(
purchase_id SERIAL PRIMARY KEY,
reference_id VARCHAR(255),
pyment_method VARCHAR(255),
payment_status VARCHAR(255),
isCompleted BOOLEAN,
userid BIGINT UNSIGNED,
masaaq_id VARCHAR(255),
createdtime TIMESTAMP DEFAULT CURRENT_TIMESTAMP(),
payment_id VARCHAR(255),
FOREIGN KEY(userid) 
        REFERENCES users(userid)
        ON DELETE CASCADE,
FOREIGN KEY(masaaq_id) 
        REFERENCES courses(masaaq_id)
        ON DELETE CASCADE
);

SELECT (courses.price-coupon.discount_amount) as price, 
courses.masaaq_id as masaaq_id,
courses.title as title,
courses.description as description,
courses.image as image,
courses.isActive as isActive,
courses.createdtime as createdtime FROM offer_course
JOIN course ON offer_course.masaaq_id = course.masaaq_id
WHERE offer_course.masaaq_id='8132' AND offer_course.coupon_name = 'TEST';

INSERT INTO users (email, phone_number,name)
VALUES ('shafiptb07@gmail.com','8086021409','shafi');

INSERT INTO coupon (coupon_name, discount_amount,discount_percentage,discount_type)
VALUES ('TEST','30','5%','test');

INSERT INTO courses (masaaq_id,title,price,image,description,isActive) VALUES ('test001','test title-123','500','test-image','test-description',true)

INSERT INTO coupon (coupon_name,discount_amount,discount_percentage,discount_type) VALUES ('test-coupon','500','50%','percentage');

INSERT INTO coupon_product_link (coupon_id,masaaq_id) VALUES (1,'test001');

INSERT INTO purchase (userid,masaaq_id) VALUES (1,'test001');

'Access-Control-Allow-Origin': "*",
'Access-Control-Allow-Headers': 'x-requested-with, Content-Type, origin, authorization, accept, client-security-token',
'Access-Control-Allow-Methods':'GET,POST,OPTIONS,PUT,PATCH,DELETE',
'Access-Control-Allow-Credentials': 'true',

