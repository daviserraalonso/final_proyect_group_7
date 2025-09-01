```mermaid
a tabla de formaciones se llama 

-- dev.formationstrans definition

CREATE TABLE formationstrans (
id bigint unsigned NOT NULL AUTO_INCREMENT,
idformation smallint NOT NULL,
name varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
language varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

Y hay una relación con

-- dev.formations definition
CREATE TABLE formations (
  id bigint unsigned NOT NULL AUTO_INCREMENT,
  name varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  period smallint DEFAULT NULL,
  created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
