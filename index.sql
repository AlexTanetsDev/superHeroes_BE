CREATE TABLE superheroes(
hero_id SERIAL,    
nickname TEXT NOT NULL,
real_name TEXT NOT NULL UNIQUE,
origin_description TEXT NOT NULL,
superpowers TEXT NOT NULL,
catch_phrase TEXT,
images  TEXT[],
PRIMARY KEY(hero_id, nickname)
);

CREATE TABLE herophotos(
 photo_id SERIAL,
photo_title TEXT NOT NULL UNIQUE DEFAULT 'Hero photo',
hero_id INTEGER ,    
createdAt TIMESTAMP WITH TIME ZONE NOT NULL,
updatedAt TIMESTAMP WITH TIME ZONE NOT NULL,
PRIMARY KEY(hero_id, photo_title),
FOREIGN KEY(hero_id) REFERENCES heroes(hero_id) ON DELETE CASCADE
);


DROP TABLE herophotos;

INSERT INTO superheroes (nickname, real_name, origin_description, superpowers, catch_phrase, images) VALUES('value','value','value','value','value', ARRAY['value', 'value','value']);

SELECT * FROM superheroes LIMIT 5;

SELECT * FROM superheroes WHERE hero_id = id;

DELETE FROM superheroes WHERE hero_id = id;


UPDATE superheroes SET (nickname, images) = ('newNickName', newImagesArr)
  WHERE hero_id = id;

  UPDATE superheroes SET images = newImagesArr WHERE hero_id = id;