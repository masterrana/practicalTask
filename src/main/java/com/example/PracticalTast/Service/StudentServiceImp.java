package com.example.PracticalTast.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.PracticalTast.Dao.StudentDao;
import com.example.PracticalTast.entities.Student;

@Service
public class StudentServiceImp implements StudentService {

	@Autowired
	private StudentDao studentDao;

	@Override
	public List<Student> getStudents() {
		return studentDao.findAll();
	}

	@Override
	public Student getStudent(Long studentId) {
		return studentDao.getOne(studentId);
	}

	@Override
	public Student addStudent(Student student) {
		return studentDao.save(student);
	}

	@Override
	public Student updateStudent(Student student) {
		return studentDao.save(student);
	}

	@Override
	public void deleteStudent(long parseLong) {
		Student enitty = studentDao.getOne(parseLong);
		studentDao.delete(enitty);
	}

	

}
