package com.example.PracticalTast.Service;

import java.util.List;

import com.example.PracticalTast.entities.Student;


public interface StudentService {

	public List<Student> getStudents();
	
	public Student getStudent(Long studentId);
	
	public Student addStudent(Student student);
	
	public Student updateStudent(Student student);
	
	public void deleteStudent(long parseLong);  
}
