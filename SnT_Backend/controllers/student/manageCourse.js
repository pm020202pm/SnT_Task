import { Course, Student } from "../../model/db.js";

export const requestCourse = async (req,res, next) => {
    const {rollNo, courseID} = req.body
    const course = await Course.findById(courseID);
    const student = await Student.findOne({rollNo:rollNo})
    const acceptedStudentsList =  course.acceptedStudents
    const pendingStudentsList = course.pendingStudents
    for(let i=0; i<acceptedStudentsList.length; i++) if(acceptedStudentsList[i].rollNo == rollNo) return res.json("Already enrolled in the course")
    for(let i=0; i<pendingStudentsList.length; i++) if(pendingStudentsList[i].rollNo == rollNo) return res.json("Already requested for the course")
    course.pendingStudents.push({
        rollNo: rollNo,
    })
    student.pendingRequests.push({
        name: course.name,
        code: course.code,
    })
    await student.save()
    await course.save()
    res.json("added to pending course successfully")
}




