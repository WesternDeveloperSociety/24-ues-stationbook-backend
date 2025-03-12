CREATE DATABASE ues_stationbook;

USE ues_stationbook;

CREATE TABLE students (
	student_id 			INT(10) UNIQUE NOT NULL PRIMARY KEY,
    email 				VARCHAR(20) UNIQUE NOT NULL,
    first_name			VARCHAR(20) NOT NULL,
    last_name			VARCHAR(20) NOT NULL,
    nickname			VARCHAR(20),
    password_hash		VARCHAR(255) NOT NULL,
    points				INT(30),
    is_admin			BOOLEAN DEFAULT false,
    created_at			TIMESTAMP DEFAULT current_timestamp,
    updated_at			TIMESTAMP DEFAULT current_timestamp ON UPDATE current_timestamp
	);
    
