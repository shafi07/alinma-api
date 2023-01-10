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
status VARCHAR,
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
status VARCHAR,
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
status VARCHAR,
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
status VARCHAR,
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
status VARCHAR,
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