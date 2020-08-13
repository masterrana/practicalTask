package com.example.PracticalTast.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.example.PracticalTast.Service.StudentService;
import com.example.PracticalTast.entities.Student;

@RestController
public class StudentController {

	@Autowired
	private StudentService studentService;

	@GetMapping("/home")
	public String home() {
		return "welcome to student application";
	}

	// get the students
	@GetMapping("/students")
	public List<Student> getStudents() {
		return this.studentService.getStudents();
	}

	

	// add student
	@PostMapping("/student")
	public Student addStudent(@RequestBody Student student) {
		return this.studentService.addStudent(student);
	}

	// Update student using PUT request
	@PutMapping("/student/{id}")
	public ResponseEntity<Student> updateStudent(@PathVariable(value = "id") Long id,
			@RequestBody Student studentDetails) {
		Student stud = studentService.getStudent(id);
		if (stud == null) {
			return ResponseEntity.notFound().build();
		}
		stud.setStudentName(studentDetails.getStudentName());
		stud.setMaths(studentDetails.getMaths());
		stud.setPhysics(studentDetails.getPhysics());
		stud.setChemistry(studentDetails.getChemistry());
		stud.setTotal(studentDetails.getTotal());
		stud.setPercentage(studentDetails.getPercentage());
		Student updatedStudent = studentService.updateStudent(stud);
		return ResponseEntity.ok(updatedStudent);
	}

	// delete student data
	@DeleteMapping("/student/{studentId}")
	public ResponseEntity<HttpStatus> deleteStudent(@PathVariable String studentId) {
		try {
			this.studentService.deleteStudent(Long.parseLong(studentId));
			return new ResponseEntity<HttpStatus>(HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<HttpStatus>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

}
