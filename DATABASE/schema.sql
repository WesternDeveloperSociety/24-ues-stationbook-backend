CREATE DATABASE ues_stationbook;

USE ues_stationbook;

CREATE TABLE student (
	student_id 			INT(10) UNIQUE NOT NULL PRIMARY KEY,
    email 				VARCHAR(20) UNIQUE NOT NULL,
    first_name			VARCHAR(20) NOT NULL,
    last_name			VARCHAR(20) NOT NULL,
    nickname			VARCHAR(20),
    password_hash		VARCHAR(255) NOT NULL,
    points				INT(30),
    is_admin			BOOLEAN DEFAULT false,
    created_at			TIMESTAMP DEFAULT current_timestamp,
    last_updated		TIMESTAMP DEFAULT current_timestamp ON UPDATE current_timestamp
);

CREATE TABLE conductor_access (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT(10) NOT NULL,
    granted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP NOT NULL,
    FOREIGN KEY (student_id) REFERENCES student(student_id) ON DELETE CASCADE
);

    
CREATE TABLE event (
	event_no		INT(10) UNIQUE NOT NULL PRIMARY KEY,
    name			VARCHAR(20) NOT NULL,
    date			DATE,
    description		VARCHAR(200),
    image			BLOB,
    points			INT(5),
    track			VARCHAR(40)
);

CREATE TABLE scan (
	student_id  INT(10) NOT NULL,
    event_no    INT(10) NOT NULL,
    scanned_at  TIMESTAMP DEFAULT current_timestamp,
    PRIMARY KEY (student_id, event_no),
    FOREIGN KEY (student_id) REFERENCES student(student_id) ON DELETE CASCADE,
    FOREIGN KEY (event_no) REFERENCES event(event_no) ON DELETE CASCADE
);









