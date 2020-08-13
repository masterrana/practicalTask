package com.example.PracticalTast.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@Entity
@Table(name="Student_info_tab")
public class Student {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	
	@Column(name="student_name")
	private String studentName;

	@Column(name="maths")
	private float  maths;

	@Column(name="physics")
	private float physics;

	@Column(name="chemistry")
	private float chemistry;

	@Column(name="total")
	private float total;
	
	@Column(name="percentage")
	private float percentage;
}
