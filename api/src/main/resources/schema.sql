CREATE table if not exists `recipe_directions` (
  `directions_order` int NOT NULL,
  `directions` TEXT DEFAULT NULL,
  `recipe_id` varchar(255) NOT NULL,
  PRIMARY KEY (`directions_order`,`recipe_id`),
  KEY `FKhvcukpdw0n8nnnwcdkw16v44s` (`recipe_id`),
  CONSTRAINT `FKhvcukpdw0n8nnnwcdkw16v44s` FOREIGN KEY (`recipe_id`) REFERENCES `recipes` (`id`)
);
