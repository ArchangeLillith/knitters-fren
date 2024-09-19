CREATE SCHEMA knitters_fren;
USE knitters_fren;

CREATE TABLE authors (
id CHAR(36) NOT NULL PRIMARY KEY,
email VARCHAR(254) NOT NULL UNIQUE,
username CHAR(30) NOT NULL UNIQUE, 
`password` CHAR(60) NOT NULL, 
`role` ENUM('admin', 'user') NOT NULL DEFAULT 'user',
link VARCHAR(255),
created_at TIMESTAMP DEFAULT NOW()
);

    INSERT INTO authors (id, email, username, password) VALUE (
	'8e4f59af-d3f5-4ab3-90be-351c38758006',
    'admin@knitters-fren.ca',
    'Admin',
    '$2b$12$qmlu8i8wOlvrteqJmQ1zs.h02/9d13SH2WTXh8oY947wlR6AdkD1K');

SELECT * FROM authors;

CREATE TABLE patterns (
id CHAR(36) NOT NULL PRIMARY KEY,
author_id CHAR(36),
title VARCHAR(50) NOT NULL UNIQUE,
content LONGTEXT NOT NULL,
created_at TIMESTAMP DEFAULT NOW(),
FOREIGN KEY (author_id) REFERENCES authors(id)
);



    INSERT INTO patterns (id, author_id, title, content) VALUE (
	'2b99c031-e979-4a54-9bd0-fd237afd62b5',
    'b990a79e-7dc2-4c61-b3c3-670fcb8945d3',
    'Pattern Test',
		'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras in bibendum leo. Nam interdum justo et tincidunt tincidunt. Quisque posuere orci nec mauris pulvinar, vel tempor ex volutpat. Fusce id lectus ut eros vehicula sollicitudin. Aenean auctor sem euismod, commodo erat eget, varius justo. In rhoncus quam sed nunc tristique, id cursus ligula dictum. Curabitur venenatis, massa ut laoreet congue, erat sapien vestibulum enim, ac malesuada erat odio eget risus. Sed sit amet odio sed felis interdum pretium non vel sapien. Nullam mollis nisl ut leo interdum, at gravida mauris laoreet. Proin pharetra, orci non porttitor dictum, sapien eros feugiat dolor, ut aliquam nisl neque vel magna. Mauris consectetur vestibulum augue, nec tempor odio volutpat ac. Nunc ultricies quam nec arcu facilisis, ut suscipit arcu efficitur.');
      
      
          INSERT INTO patterns (id, author_id, title, content) VALUE (
	'490f2157-a4ec-49a6-ad35-89bb396fccef',
    'b990a79e-7dc2-4c61-b3c3-670fcb8945d3',
    'Pattern For Reg',
		'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras in bibendum leo. Nam interdum justo et tincidunt tincidunt. Quisque posuere orci nec mauris pulvinar, vel tempor ex volutpat. Fusce id lectus ut eros vehicula sollicitudin. Aenean auctor sem euismod, commodo erat eget, varius justo. In rhoncus quam sed nunc tristique, id cursus ligula dictum. Curabitur venenatis, massa ut laoreet congue, erat sapien vestibulum enim, ac malesuada erat odio eget risus. Sed sit amet odio sed felis interdum pretium non vel sapien. Nullam mollis nisl ut leo interdum, at gravida mauris laoreet. Proin pharetra, orci non porttitor dictum, sapien eros feugiat dolor, ut aliquam nisl neque vel magna. Mauris consectetur vestibulum augue, nec tempor odio volutpat ac. Nunc ultricies quam nec arcu facilisis, ut suscipit arcu efficitur.');
      
SELECT * FROM patterns;

CREATE TABLE tags (
id INT NOT NULL AUTO_INCREMENT,
`name` VARCHAR(60) UNIQUE NOT NULL,
PRIMARY KEY(id)
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

SELECT * FROM tags;

CREATE TABLE pattern_tags (
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
pattern_id CHAR(36),
tag_id INT,
FOREIGN KEY (pattern_id) REFERENCES patterns(id),
FOREIGN KEY (tag_id) REFERENCES tags(id)
);

INSERT INTO pattern_tags (pattern_id, tag_id) VALUE ("490f2157-a4ec-49a6-ad35-89bb396fccef",6);

SELECT * FROM pattern_tags;

CREATE TABLE favorite_patterns (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    author_id CHAR(36),
    pattern_id CHAR(36),
    FOREIGN KEY (author_id) REFERENCES authors(id),
    FOREIGN KEY (pattern_id) REFERENCES patterns(id),
    UNIQUE (author_id, pattern_id)
);

INSERT INTO favorite_patterns (author_id, pattern_id) VALUE ("b990a79e-7dc2-4c61-b3c3-670fcb8945d3", "490f2157-a4ec-49a6-ad35-89bb396fccef");

SELECT * FROM favorite_patterns;

CREATE TABLE pattern_comments (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    author_id CHAR(36) NOT NULL,
    pattern_id CHAR(36) NOT NULL,
	content VARCHAR(1500) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (author_id) REFERENCES authors(id),
    FOREIGN KEY (pattern_id) REFERENCES patterns(id),
    UNIQUE (author_id, pattern_id)
);

CREATE USER 'nanachi'@'localhost' IDENTIFIED BY 'regandriku';
GRANT ALL PRIVILEGES ON knitters_fren.* TO 'nanachi'@'localhost';
flush PRIVILEGES;

CREATE TABLE activity_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id CHAR(36) NOT NULL,
    action VARCHAR(255) NOT NULL,
    details TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES authors(id)
);

SELECT * FROM activity_logs;











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
        



    
  


INSERT INTO pattern_tags VALUES
	(20, 33),
    (20,34),
    (20, 35);

SELECT * FROM authors;
SELECT * FROM pattern_tags;
ALTER TABLE patterns
ADD COLUMN link VARCHAR(255);

  
  UPDATE patterns SET content = "This si a new thingy" WHERE id = 3 AND author_id = 2;


SELECT * from pattern_tags;

	SELECT 
		pattern_tags.tag_id as TagId,
		patterns.id AS PatternId
	FROM 
		pattern_tags 
				JOIN 
		patterns ON patterns.id = pattern_tags.pattern_id WHERE patterns.id = 6;
        
        
SELECT 
    pattern_tags.tag_id AS TagId, 'tags.name' AS `name`, tags.id
FROM
    pattern_tags
        INNER JOIN
    tags ON 'tags.id' = pattern_tags.tag_id
WHERE
    pattern_tags.pattern_id = 6;
        
SELECT * FROM patterns WHERE title LIKE scarf;

SELECT 
	tags.id AS tag_id, 
	tags.name AS tag_name
FROM tags
JOIN pattern_tags ON tags.id = pattern_tags.tag_id
WHERE pattern_tags.pattern_id = 33;

	SELECT * from pattern_tags;

SELECT 
    pattern_tags.tag_id AS TagId, patterns.*, tags.*
FROM
    pattern_tags
        JOIN
    patterns ON patterns.id = pattern_tags.pattern_id;
    
    
    SELECT p.id, p.author_id, p.title, p.content, p.created_at, t.`name`
		FROM patterns p
			JOIN pattern_tags pt ON p.id = pt.pattern_id
			JOIN tags t ON pt.tag_id = t.id ;



SELECT * from patterns;
    