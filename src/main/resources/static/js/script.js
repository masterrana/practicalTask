$(document).ready(function(){

    $("#update").hide();

    assignDataToTable();

    $('table').on('click', 'button[id="delete"]', function(e){
       var id = $(this).closest('tr').children('td:first').text();
       
       $.ajax({
            type:"DELETE",
            url:"http://localhost:9090/student/" + id,
            success: function(data){
                alertUsing("Delete success.", true);
                assignDataToTable();
            },
            error: function(err) {  
                console.log(err);
                alert(err);
            }
        });

    })
$("#maths").keyup(function(){
	
   $("#total").val(parseInt($(this).val())+parseInt($("#physics").val()==''?'0':$("#physics").val())
		   +parseInt($("#chemistry").val()==''?'0':$("#chemistry").val()));
   
   $("#percentage").val(parseInt($("#total").val())/3);
});
    $("#physics").keyup(function(){
    	   $("#total").val(parseInt($(this).val())+parseInt($("#maths").val()==''?'0':$("#maths").val())
    			   +parseInt($("#chemistry").val()==''?'0':$("#chemistry").val()));
    	   $("#percentage").val(parseInt($("#total").val())/3);
    	});
    $("#chemistry").keyup(function(){
 	   $("#total").val(parseInt($(this).val())+parseInt($("#maths").val()==''?'0':$("#maths").val())
			   +parseInt($("#physics").val()==''?'0':$("#physics").val()));
 	   
 	  $("#percentage").val(parseInt($("#total").val())/3);
    	});
    
    $('table').on('click', 'button[id="edit"]', function(e){
       var id = $(this).closest('tr').children('td:first').text();
       var studName = $(this).closest('tr').children('td:nth-child(2)').text(); 
       var maths = $(this).closest('tr').children('td:nth-child(3)').text(); 
       var physics  = $(this).closest('tr').children('td:nth-child(4)').text(); 
       var chemistry = $(this).closest('tr').children('td:nth-child(5)').text(); 
       var total = $(this).closest('tr').children('td:nth-child(6)').text(); 
       var percentage = $(this).closest('tr').children('td:nth-child(7)').text(); 
       

        $("#studentname").val(studName);
        $("#maths").val(maths);
        $("#physics").val(physics);
        $("#chemistry").val(chemistry);
        $("#total").val(total);
        $("#percentage").val(percentage);

        $("#update").show();
        $("#save").hide();

        $("#update").click(function() {


            var jsonVar = {
            	studentName: $("#studentname").val(),
                maths: $("#maths").val(),
                physics: $("#physics").val(),
                chemistry: $("#chemistry").val(),
                total: $("#total").val(),
                percentage: $("#percentage").val(),
            };
            if(jsonVar.studentName && jsonVar.maths && jsonVar.physics & jsonVar.chemistry){
            $.ajax({
                type:"PUT",
                data: JSON.stringify(jsonVar),
                contentType: "application/json",
                url:"http://localhost:9090/student/" + id,
                success: function(data){
                    alertUsing("save", true);
                    $("#update").hide();
                    $("#save").show();

                    $("#studentname").val("");
                    $("#maths").val("");
                    $("#physics").val("");
                    $("#chemistry").val("");
                    $("#total").val("");
                    $("#percentage").val("");
                    assignDataToTable();
                },
                error: function(err) {  
                    console.log(err);
                    alert(err);
                }

        });
            }else{
            	alert("please fill all data")
            }

    });

    })



    $("#save").click(function() {
        var jsonVar = {
        		studentName: $("#studentname").val(),
                maths: $("#maths").val(),
                physics: $("#physics").val(),
                chemistry: $("#chemistry").val(),
                total: $("#total").val(),
                percentage: $("#percentage").val()
        };

        if(jsonVar.studentName && jsonVar.maths && jsonVar.physics & jsonVar.chemistry){
        	
            $.ajax({
                type:"POST",
                url:"http://localhost:9090/student",
                data: JSON.stringify(jsonVar),
                contentType: "application/json",
                success: function(data){
                    assignDataToTable();
                },
                error: function(err) {
                    console.log(err);
                    alert(err);
                }
            });
        }else{
        	alert("please fill all data")
        }
        
    

    });

    function assignDataToTable() {
        $("tbody").empty();
        $.ajax({    
          type:"GET",
          contentType: "application/json",
          url:"http://localhost:9090/students",
          success: function(data) {
            var student = JSON.parse(JSON.stringify(data));
            for (var i in student) {
                $("tbody").
                append("<tr> \
                		  <td>" +  student[i].id+"</td> \
                            <td>" +  student[i].studentName+"</td> \
                            <td>" +  student[i].maths+ "</td> \
                            <td>" +  student[i].physics+ "</td> \
                            <td>" +  student[i].chemistry + "</td> \
                            <td>" +  student[i].total + "</td> \
                            <td>" +  student[i].percentage + "</td> \
                            <td> \ <button id='delete' class='btn btn-danger'>Delete</button> \
                           <button id='edit' class='btn btn-warning'>Update</button> \ </td> \
                        </tr>");
            }
          },
          error: function(data) { 
            console.log(data);
            }
        });
       
    }

function alertUsing(text, flag) {

    var alert = $(".alert");

    if(flag){
        alert.removeClass("alert-danger").addClass("alert-success");
    }else{
        alert.removeClass("alert-success").addClass("alert-danger");
        
    }
    
    alert.fadeIn(400);
    alert.css("display", "block");
    alert.text(text);
    setTimeout(function() {
        alert.fadeOut();
    }, 2000);

  }

});