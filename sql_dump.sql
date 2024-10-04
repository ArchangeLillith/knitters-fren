CREATE SCHEMA knitters_fren;
USE knitters_fren;

CREATE TABLE authors (
    id CHAR(36) NOT NULL PRIMARY KEY,
    email VARCHAR(254) NOT NULL UNIQUE,
    username CHAR(30) NOT NULL UNIQUE,
    `password` CHAR(60) NOT NULL,
    `role` ENUM('admin', 'user') NOT NULL DEFAULT 'user',
    created_at TIMESTAMP DEFAULT NOW()
);

    INSERT INTO authors (id, email, username, password) VALUE (
	'8e4f59af-d3f5-4ab3-90be-351c38758006',
    'admin@knitters-fren.ca',
    'Admin',
    '$2b$12$qmlu8i8wOlvrteqJmQ1zs.h02/9d13SH2WTXh8oY947wlR6AdkD1K');

SELECT 
    *
FROM
    authors;

CREATE TABLE patterns (
    id CHAR(36) NOT NULL PRIMARY KEY,
    author_id CHAR(36),
    title VARCHAR(50) NOT NULL UNIQUE,
    content LONGTEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW (),
    link VARCHAR(255),
    FOREIGN KEY (author_id)
        REFERENCES authors (id)
);

UPDATE patterns 
SET 
    author_id = '779e05a4-8988-4641-a2e5-5d9bb8391b65'
WHERE
    id = 'bed72fdc-9716-4812-9735-7a3492a16a0e';

UPDATE patterns 
SET 
    link = 'https://knitters-fren.s3.ca-central-1.amazonaws.com/Braided-Cable-Knit-Hat.pdf'
WHERE
    id = 'fa3106cf-db3e-46c3-935c-7eaacbbd62c6';
 
      
          INSERT INTO patterns (id, author_id, title, content) VALUE (
	'490f2157-a4ec-49a6-ad35-89bb396fccef',
    'b990a79e-7dc2-4c61-b3c3-670fcb8945d3',
    'Pattern For Reg',
		'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras in bibendum leo. Nam interdum justo et tincidunt tincidunt. Quisque posuere orci nec mauris pulvinar, vel tempor ex volutpat. Fusce id lectus ut eros vehicula sollicitudin. Aenean auctor sem euismod, commodo erat eget, varius justo. In rhoncus quam sed nunc tristique, id cursus ligula dictum. Curabitur venenatis, massa ut laoreet congue, erat sapien vestibulum enim, ac malesuada erat odio eget risus. Sed sit amet odio sed felis interdum pretium non vel sapien. Nullam mollis nisl ut leo interdum, at gravida mauris laoreet. Proin pharetra, orci non porttitor dictum, sapien eros feugiat dolor, ut aliquam nisl neque vel magna. Mauris consectetur vestibulum augue, nec tempor odio volutpat ac. Nunc ultricies quam nec arcu facilisis, ut suscipit arcu efficitur.');
      
SELECT 
    *
FROM
    patterns;

CREATE TABLE tags (
    id INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(60) UNIQUE NOT NULL,
    PRIMARY KEY (id)
);

INSERT INTO tags (`name`) VALUES
	("No Sew"),
    ("Little Sewing"),
    ("Sewing"),
    ("Circular"),
    ("Worked Flat"),
    ("Flat Needle"),
	("DPNs"),
	("Cables"),
	("Steeking"),
	("Drop Stitch"),
	("Fair Isle"),
	("Intarsia"),
	("Lace"),
	("Double Knitting"),
	("Brioche"),
	("Button Holes");

SELECT 
    *
FROM
    tags;

CREATE TABLE pattern_tags (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    pattern_id CHAR(36),
    tag_id INT,
    FOREIGN KEY (pattern_id)
        REFERENCES patterns (id),
    FOREIGN KEY (tag_id)
        REFERENCES tags (id),
    UNIQUE (pattern_id , tag_id)
);

INSERT INTO pattern_tags (pattern_id, tag_id) VALUE ("490f2157-a4ec-49a6-ad35-89bb396fccef",6);

SELECT 
    *
FROM
    pattern_tags;


CREATE TABLE favorite_patterns (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    author_id CHAR(36),
    pattern_id CHAR(36),
    FOREIGN KEY (author_id)
        REFERENCES authors (id),
    FOREIGN KEY (pattern_id)
        REFERENCES patterns (id),
    UNIQUE (author_id , pattern_id)
);

INSERT INTO favorite_patterns (author_id, pattern_id) VALUE ("3b6d9d2b-132a-4542-aa40-2de35690f4e6", "981ca702-c843-49c1-ae54-d73c73c7b698");

SELECT 
    *
FROM
    favorite_patterns;

CREATE TABLE pattern_comments (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    author_id CHAR(36) NOT NULL,
    pattern_id CHAR(36) NOT NULL,
    content VARCHAR(1500) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (author_id)
        REFERENCES authors (id),
    FOREIGN KEY (pattern_id)
        REFERENCES patterns (id)
);


SELECT 
    *
FROM
    pattern_comments;

CREATE USER 'nanachi'@'localhost' IDENTIFIED BY 'regandriku';
GRANT ALL PRIVILEGES ON knitters_fren.* TO 'nanachi'@'localhost';
flush PRIVILEGES;

CREATE TABLE activity_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id CHAR(36) NOT NULL,
    action VARCHAR(255) NOT NULL,
    details TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id)
        REFERENCES authors (id)
);

SELECT 
    *
FROM
    activity_logs;




CREATE TABLE banned_authors (
    id CHAR(36) PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id)
        REFERENCES authors (id)
        ON DELETE CASCADE
);



("Weight: Lace"),
("Weight: Super Fine"),
("Weight: Fine"),
("Weight: Light"),
("Weight: Medium"),
("Weight: Bulky"),
("Weight: Super Bulky"),
("Weight: Jumbo"),
("Needle: US 1"),
("Needle: US 2"),
("Needle: US 3"),
("Needle: US 4"),
("Needle: US 5"),
("Needle: US 6"),
("Needle: US 7"),
("Needle: US 8"),	
("Needle: US 9"),	
("Needle: US 10"),	
("Needle: US 10.5"),	
("Needle: US 11"),	
("Needle: US 13"),	
("Needle: US 15"),
("Needle: 2.0 mm"),
("Needle: 2.25 mm"),
("Needle: 2.5 mm"),
("Needle: 2.75 mm"),
("Needle: 3.0 mm"),
("Needle: 3.25 mm"),
("Needle: 3.5 mm"),
("Needle: 3.75 mm"),
("Needle: 4.0 mm"),
("Needle: 4.5 mm"),
("Needle: 5.0 mm"),
("Needle: 5.5 mm"),
("Needle: 6.0 mm"),
("Needle: 6.5 mm"),
("Needle: 7.0 mm")
("Wearable"),
("Scarf"),
("Sweater"),
("Cardigan"),
("Gloves"),
("Mittens"),
("Hat"),
("Shorts"),
("Shirt"),
("Socks"),
("Earmuff"),
("Blanket"),
("Cowl"),
("Leg Warmers"),
("Baby Blanket"), 
("Bag"), 
("Vest"), 
("Home Decor"), 
("Seasonal"),
("Shawl");
        


        CREATE SCHEMA knitters_fren;
USE knitters_fren;

CREATE TABLE authors (
    id CHAR(36) NOT NULL PRIMARY KEY,
    email VARCHAR(254) NOT NULL UNIQUE,
    username CHAR(30) NOT NULL UNIQUE,
    `password` CHAR(60) NOT NULL,
    `role` ENUM('admin', 'user') NOT NULL DEFAULT 'user',
    created_at TIMESTAMP DEFAULT NOW()
);

    INSERT INTO authors (id, email, username, password) VALUE (
	'8e4f59af-d3f5-4ab3-90be-351c38758006',
    'admin@knitters-fren.ca',
    'Admin',
    '$2b$12$qmlu8i8wOlvrteqJmQ1zs.h02/9d13SH2WTXh8oY947wlR6AdkD1K');

SELECT 
    *
FROM
    authors;

CREATE TABLE patterns (
    id CHAR(36) NOT NULL PRIMARY KEY,
    author_id CHAR(36),
    title VARCHAR(50) NOT NULL UNIQUE,
    content LONGTEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    link VARCHAR(255),
    FOREIGN KEY (author_id)
        REFERENCES authors (id)
);

UPDATE patterns 
SET 
    author_id = '779e05a4-8988-4641-a2e5-5d9bb8391b65'
WHERE
    id = 'bed72fdc-9716-4812-9735-7a3492a16a0e';

UPDATE patterns 
SET 
    link = 'https://knitters-fren.s3.ca-central-1.amazonaws.com/Braided-Cable-Knit-Hat.pdf'
WHERE
    id = 'fa3106cf-db3e-46c3-935c-7eaacbbd62c6';
 
      
          INSERT INTO patterns (id, author_id, title, content) VALUE (
	'490f2157-a4ec-49a6-ad35-89bb396fccef',
    'b990a79e-7dc2-4c61-b3c3-670fcb8945d3',
    'Pattern For Reg',
		'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras in bibendum leo. Nam interdum justo et tincidunt tincidunt. Quisque posuere orci nec mauris pulvinar, vel tempor ex volutpat. Fusce id lectus ut eros vehicula sollicitudin. Aenean auctor sem euismod, commodo erat eget, varius justo. In rhoncus quam sed nunc tristique, id cursus ligula dictum. Curabitur venenatis, massa ut laoreet congue, erat sapien vestibulum enim, ac malesuada erat odio eget risus. Sed sit amet odio sed felis interdum pretium non vel sapien. Nullam mollis nisl ut leo interdum, at gravida mauris laoreet. Proin pharetra, orci non porttitor dictum, sapien eros feugiat dolor, ut aliquam nisl neque vel magna. Mauris consectetur vestibulum augue, nec tempor odio volutpat ac. Nunc ultricies quam nec arcu facilisis, ut suscipit arcu efficitur.');
      
SELECT 
    *
FROM
    patterns;

CREATE TABLE tags (
    id INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(60) UNIQUE NOT NULL,
    PRIMARY KEY (id)
);

INSERT INTO tags (`name`) VALUES
	("No Sew"),
    ("Little Sewing"),
    ("Sewing"),
    ("Circular"),
    ("Worked Flat"),
    ("Flat Needle"),
	("DPNs"),
	("Cables"),
	("Steeking"),
	("Drop Stitch"),
	("Fair Isle"),
	("Intarsia"),
	("Lace"),
	("Double Knitting"),
	("Brioche"),
	("Button Holes");

SELECT 
    *
FROM
    tags;

CREATE TABLE pattern_tags (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    pattern_id CHAR(36),
    tag_id INT,
    FOREIGN KEY (pattern_id)
        REFERENCES patterns (id),
    FOREIGN KEY (tag_id)
        REFERENCES tags (id),
    UNIQUE (pattern_id , tag_id)
);

INSERT INTO pattern_tags (pattern_id, tag_id) VALUE ("490f2157-a4ec-49a6-ad35-89bb396fccef",6);

SELECT 
    *
FROM
    pattern_tags;


CREATE TABLE favorite_patterns (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    author_id CHAR(36),
    pattern_id CHAR(36),
    FOREIGN KEY (author_id)
        REFERENCES authors (id),
    FOREIGN KEY (pattern_id)
        REFERENCES patterns (id),
    UNIQUE (author_id , pattern_id)
);

INSERT INTO favorite_patterns (author_id, pattern_id) VALUE ("3b6d9d2b-132a-4542-aa40-2de35690f4e6", "981ca702-c843-49c1-ae54-d73c73c7b698");

SELECT 
    *
FROM
    favorite_patterns;

CREATE TABLE pattern_comments (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    author_id CHAR(36) NOT NULL,
    pattern_id CHAR(36) NOT NULL,
    content VARCHAR(1500) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (author_id)
        REFERENCES authors (id),
    FOREIGN KEY (pattern_id)
        REFERENCES patterns (id)
);


SELECT 
    *
FROM
    pattern_comments;

CREATE USER 'nanachi'@'localhost' IDENTIFIED BY 'regandriku';
GRANT ALL PRIVILEGES ON knitters_fren.* TO 'nanachi'@'localhost';
flush PRIVILEGES;

CREATE TABLE activity_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id CHAR(36) NOT NULL,
    action VARCHAR(255) NOT NULL,
    details TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id)
        REFERENCES authors (id)
);

SELECT 
    *
FROM
    activity_logs;




CREATE TABLE banned_authors (
    id CHAR(36) PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id)
        REFERENCES authors (id)
        ON DELETE CASCADE
);



("Weight: Lace"),
("Weight: Super Fine"),
("Weight: Fine"),
("Weight: Light"),
("Weight: Medium"),
("Weight: Bulky"),
("Weight: Super Bulky"),
("Weight: Jumbo"),
("Needle: US 1"),
("Needle: US 2"),
("Needle: US 3"),
("Needle: US 4"),
("Needle: US 5"),
("Needle: US 6"),
("Needle: US 7"),
("Needle: US 8"),	
("Needle: US 9"),	
("Needle: US 10"),	
("Needle: US 10.5"),	
("Needle: US 11"),	
("Needle: US 13"),	
("Needle: US 15"),
("Needle: 2.0 mm"),
("Needle: 2.25 mm"),
("Needle: 2.5 mm"),
("Needle: 2.75 mm"),
("Needle: 3.0 mm"),
("Needle: 3.25 mm"),
("Needle: 3.5 mm"),
("Needle: 3.75 mm"),
("Needle: 4.0 mm"),
("Needle: 4.5 mm"),
("Needle: 5.0 mm"),
("Needle: 5.5 mm"),
("Needle: 6.0 mm"),
("Needle: 6.5 mm"),
("Needle: 7.0 mm")
("Wearable"),
("Scarf"),
("Sweater"),
("Cardigan"),
("Gloves"),
("Mittens"),
("Hat"),
("Shorts"),
("Shirt"),
("Socks"),
("Earmuff"),
("Blanket"),
("Cowl"),
("Leg Warmers"),
("Baby Blanket"), 
("Bag"), 
("Vest"), 
("Home Decor"), 
("Seasonal"),
("Shawl");
        