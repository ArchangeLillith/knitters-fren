CREATE SCHEMA knitters_fren;
USE knitters_fren;

CREATE TABLE authors (
id INT NOT NULL AUTO_INCREMENT,
`name` CHAR(60) NOT NULL, 
email VARCHAR(60) UNIQUE NOT NULL,
created_at TIMESTAMP DEFAULT NOW(),
PRIMARY KEY (id)
);

CREATE TABLE patterns (
id INT NOT NULL AUTO_INCREMENT,
author_id INT,
title VARCHAR(50) NOT NULL UNIQUE,
content LONGTEXT NOT NULL,
created_at TIMESTAMP DEFAULT NOW(),
FOREIGN KEY (author_id) REFERENCES authors(id),
PRIMARY KEY (id)
);

CREATE TABLE tags (
id INT NOT NULL AUTO_INCREMENT,
`name` VARCHAR(15) UNIQUE NOT NULL,
PRIMARY KEY(id)
);

SELECT
  patterns.*,
  authors.name
FROM
  patterns
      JOIN
  authors ON authors.id = patterns.author_id;

CREATE TABLE pattern_tags (
pattern_id INT,
tag_id INT,
FOREIGN KEY (pattern_id) REFERENCES patterns(id),
FOREIGN KEY (tag_id) REFERENCES tags(id)
);


INSERT INTO authors (`name`, email) VALUE (
    'zach',
    'zach@test.com');
    
    SELECT * FROM authors;
    
    INSERT INTO patterns (author_id, title, content) VALUE (
	'2',
    'Pattern Test 2',
		'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras in bibendum leo. Nam interdum justo et tincidunt tincidunt. Quisque posuere orci nec mauris pulvinar, vel tempor ex volutpat. Fusce id lectus ut eros vehicula sollicitudin. Aenean auctor sem euismod, commodo erat eget, varius justo. In rhoncus quam sed nunc tristique, id cursus ligula dictum. Curabitur venenatis, massa ut laoreet congue, erat sapien vestibulum enim, ac malesuada erat odio eget risus. Sed sit amet odio sed felis interdum pretium non vel sapien. Nullam mollis nisl ut leo interdum, at gravida mauris laoreet. Proin pharetra, orci non porttitor dictum, sapien eros feugiat dolor, ut aliquam nisl neque vel magna. Mauris consectetur vestibulum augue, nec tempor odio volutpat ac. Nunc ultricies quam nec arcu facilisis, ut suscipit arcu efficitur.');
        
    SELECT * FROM patterns;
    
INSERT INTO tags (`name`) VALUES 
		("Beginner"),
        ("Intermediate"),
        ("Advanced"),
        ("Circular"),
        ("Straight"),
        ("DPNs");
        
SELECT * FROM tags;
        
ALTER TABLE tags MODIFY COLUMN `name` VARCHAR (25) NOT NULL;

INSERT INTO pattern_tags VALUES
	(2, 7),
    (2,8),
    (1, 9);

SELECT * FROM pattern_tags;

UPDATE patterns SET content = "This si a new thingy" WHERE id = 3 AND author_id = 2;

SELECT * from patterns;
