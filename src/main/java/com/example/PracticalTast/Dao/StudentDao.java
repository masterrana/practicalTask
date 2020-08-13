package com.example.PracticalTast.Dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.PracticalTast.entities.Student;

@Repository
public interface StudentDao extends JpaRepository<Student, Long> {

}
