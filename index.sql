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

DROP TABLE superheroes;

INSERT INTO superheroes (nickname, real_name, origin_description, superpowers, catch_phrase, images) VALUES('value','value','value','value','value', ARRAY['value', 'value','value']);

SELECT * FROM superheroes LIMIT 5;

SELECT * FROM superheroes WHERE hero_id = id;

DELETE FROM superheroes WHERE hero_id = id;


UPDATE superheroes SET (nickname, images) = ('newNickName', newImagesArr)
  WHERE hero_id = id;

  UPDATE superheroes SET images = newImagesArr WHERE hero_id = id;