-- Crear la base de datos
CREATE DATABASE teacherAppDB;

-- Usar la base de datos
USE TeacherAppDB;

-- Tabla de roles
CREATE TABLE role (
    id INT PRIMARY KEY AUTO_INCREMENT,
    role_name ENUM('administrador', 'profesor', 'estudiante') NOT NULL
);

-- Tabla de categorías
CREATE TABLE category (
    id INT PRIMARY KEY AUTO_INCREMENT,
    category_name VARCHAR(255) NOT NULL,
    description TEXT
);

-- Tabla de modalidades (presencial u online)
CREATE TABLE modality (
    id INT PRIMARY KEY AUTO_INCREMENT,
    type ENUM('presencial', 'online') NOT NULL,
    description TEXT
);

-- Tabla de usuarios (administradores, profesores y estudiantes)
CREATE TABLE user (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    roleId INT NOT NULL,
    phone VARCHAR(20),
    isValidated TINYINT(1) DEFAULT 0,
    lat DECIMAL(9, 6), 
    lng DECIMAL(9, 6),  
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (roleId) REFERENCES role(id)
);

-- Tabla de cursos
CREATE TABLE course (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    category_id INT NOT NULL,         
    modality_id INT NOT NULL,        
    startDate DATE NOT NULL,       
    endDate DATE NOT NULL,            
    FOREIGN KEY (category_id) REFERENCES category(id),
    FOREIGN KEY (modality_id) REFERENCES modality(id)
);

-- Tabla de localización de cursos (para sesiones presenciales)
CREATE TABLE course_location (
    id INT PRIMARY KEY AUTO_INCREMENT,
    idCourse INT NOT NULL,
    lat DECIMAL(9, 6),               
    lng DECIMAL(9, 6),               
    address VARCHAR(255),            
    onlineLink VARCHAR(255),         
    FOREIGN KEY (idCourse) REFERENCES course(id)
);

-- Tabla intermedia para la relación muchos a muchos entre profesores y cursos
CREATE TABLE professor_course (
    id INT PRIMARY KEY AUTO_INCREMENT,
    idProfessor INT NOT NULL,
    idCourse INT NOT NULL,
    FOREIGN KEY (idProfessor) REFERENCES user(id),
    FOREIGN KEY (idCourse) REFERENCES course(id),
    UNIQUE (idProfessor, idCourse)  
);

-- Tabla de materias dentro de los cursos
CREATE TABLE subject (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,    
    idCourse INT NOT NULL,          
    description TEXT,               
    finalGrade DECIMAL(3, 2) CHECK (finalGrade >= 1 AND finalGrade <= 10),  
    FOREIGN KEY (idCourse) REFERENCES course(id)
);

-- Tabla de eventos de los cursos (clases y tareas)
CREATE TABLE course_event (
    id INT PRIMARY KEY AUTO_INCREMENT,
    idCourse INT NOT NULL,         
    idSubject INT,                 
    eventType ENUM('class', 'task') NOT NULL, 
    title VARCHAR(255) NOT NULL,    
    description TEXT,               
    startDateTime DATETIME NOT NULL,  
    endDateTime DATETIME NOT NULL,    
    locationType ENUM('physical', 'online') NOT NULL,  
    locationId INT,                  /* Si es presencial, relación con la tabla course_location */
    onlineLink VARCHAR(255),         /* Enlace a la sesión online (si es online) */
    deadline DATE,                   /* Fecha límite para tareas (opcional) */
    FOREIGN KEY (idCourse) REFERENCES course(id),
    FOREIGN KEY (idSubject) REFERENCES subject(id),
    FOREIGN KEY (locationId) REFERENCES course_location(id)  
);

-- Tabla de tareas (siempre online)
CREATE TABLE tasks (
    id INT PRIMARY KEY AUTO_INCREMENT,
    idSubject INT NOT NULL,         
    idUser INT NOT NULL,            
    comments TEXT,                  
    score DECIMAL(3, 2) CHECK (score >= 1 AND score <= 10),  
    creationDate DATETIME DEFAULT CURRENT_TIMESTAMP, 
    deadline DATE,                  
    FOREIGN KEY (idSubject) REFERENCES subject(id),
    FOREIGN KEY (idUser) REFERENCES user(id),
    UNIQUE (idSubject, idUser)      
);

-- Tabla de chats (conversaciones)
CREATE TABLE chat (
    id INT PRIMARY KEY AUTO_INCREMENT,
    courseId INT NOT NULL,           
    professorId INT NOT NULL,       
    studentId INT NOT NULL,          
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (courseId) REFERENCES course(id) ON DELETE CASCADE,
    FOREIGN KEY (professorId) REFERENCES user(id) ON DELETE CASCADE,
    FOREIGN KEY (studentId) REFERENCES user(id) ON DELETE CASCADE
);

--Tabla de mensaje
CREATE TABLE message (
    id INT PRIMARY KEY AUTO_INCREMENT,
    chatId INT NOT NULL,            
    senderId INT NOT NULL,           
    content TEXT NOT NULL,           
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (chatId) REFERENCES chat(id) ON DELETE CASCADE,
    FOREIGN KEY (senderId) REFERENCES user(id) 
);


--Tabla de notas finales
CREATE TABLE final_grades (
    id INT PRIMARY KEY AUTO_INCREMENT,
    idCourse INT NOT NULL,            
    idStudent INT NOT NULL,          
    finalGrade DECIMAL(3, 2) CHECK (finalGrade >= 1 AND finalGrade <= 10), 
    comments TEXT,              
    creationDate DATETIME DEFAULT CURRENT_TIMESTAMP, 
    FOREIGN KEY (idCourse) REFERENCES course(id),
    FOREIGN KEY (idStudent) REFERENCES user(id),
    UNIQUE (idCourse, idStudent)      
);


-- Tabla de inscripciones de estudiantes a cursos
CREATE TABLE student_course (
    id INT PRIMARY KEY AUTO_INCREMENT,
    idStudent INT NOT NULL,
    idCourse INT NOT NULL,
    enrollmentDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (idStudent) REFERENCES user(id),
    FOREIGN KEY (idCourse) REFERENCES course(id),
    UNIQUE (idStudent, idCourse)  
);

