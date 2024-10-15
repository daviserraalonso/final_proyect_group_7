CREATE DATABASE TeacherAppDB;

USE TeacherAppDB;

CREATE TABLE category (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description TEXT
);

CREATE TABLE modality (
    id INT PRIMARY KEY AUTO_INCREMENT,
    type ENUM('presencial', 'online') NOT NULL,
    description TEXT
);

CREATE TABLE role (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE course (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    idProfessor INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    category VARCHAR(255) NOT NULL,
    modality INT NOT NULL,
    startDate DATE NOT NULL,
    endDate DATE NOT NULL,
    FOREIGN KEY (modality) REFERENCES modality(id)
);

CREATE TABLE course_location (
    id INT PRIMARY KEY AUTO_INCREMENT,
    idCourse INT NOT NULL,
    lat DECIMAL(9, 6) NOT NULL,
    lng DECIMAL(9, 6) NOT NULL,
    address VARCHAR(255),
    FOREIGN KEY (idCourse) REFERENCES course(id)
);

CREATE TABLE evaluation (
    id INT PRIMARY KEY AUTO_INCREMENT,
    idStudent INT NOT NULL,
    idSubject INT NOT NULL,
    score DECIMAL(3, 2) CHECK (score >= 1 AND score <= 5) NOT NULL,
    comment TEXT,
    evaluationDate DATE NOT NULL
);

CREATE TABLE message (
    id INT PRIMARY KEY AUTO_INCREMENT,
    idStudent INT NOT NULL,
    idProfessor INT NOT NULL,
    content TEXT NOT NULL,
    sentDate DATETIME NOT NULL,
    read TINYINT(1) DEFAULT 0
);

CREATE TABLE message_detail (
    id INT PRIMARY KEY AUTO_INCREMENT,
    senderId INT NOT NULL,
    recipientId INT NOT NULL,
    content TEXT NOT NULL,
    sentDate DATETIME NOT NULL,
    read TINYINT(1) DEFAULT 0
);

CREATE TABLE rating_opinion (
    id INT PRIMARY KEY AUTO_INCREMENT,
    idProfessor INT NOT NULL,
    idStudent INT NOT NULL,
    idCourse INT NOT NULL,
    score DECIMAL(3, 2) CHECK (score >= 1 AND score <= 5) NOT NULL,
    opinion TEXT,
    ratingDate DATE NOT NULL
);

CREATE TABLE student_course (
    id INT PRIMARY KEY AUTO_INCREMENT,
    idStudent INT NOT NULL,
    idCourse INT NOT NULL,
    enrollmentDate DATE NOT NULL
);

CREATE TABLE subject (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    idCourse INT NOT NULL,
    description TEXT,
    finalGrade DECIMAL(3, 2) CHECK (finalGrade >= 1 AND finalGrade <= 5),
    FOREIGN KEY (idCourse) REFERENCES course(id)
);

CREATE TABLE user (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    roleId INT NOT NULL,
    phone VARCHAR(15),
    isValidated TINYINT(1) DEFAULT 0,
    lat DECIMAL(9, 6),
    lng DECIMAL(9, 6),
    FOREIGN KEY (roleId) REFERENCES role(id)
);
