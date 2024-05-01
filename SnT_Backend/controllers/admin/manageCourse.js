import { Course, Student } from "../../model/db.js";

export const createCourse = async (name, code) => {
    try {
        const course = new Course({name, code})
        await course.save()
        return course
    } catch (err) {
        console.error("Error creating course:", err);
        throw new Error("Error creating course");
    }
}
export const acceptCourse = async (req,res, next) => {
    const {rollNo, courseID} = req.body
    const course = await Course.findById(courseID);
    const student = await Student.findOne({rollNo:rollNo})
    const acceptedStudentsList =  course.acceptedStudents
    const pendingStudentsList = course.pendingStudents
    for(let i=0; i<acceptedStudentsList.length; i++){
        if(acceptedStudentsList[i].rollNo == rollNo) return res.json("Already enrolled in the course")
    }
    for(let i=0; i<pendingStudentsList.length; i++){
        if(pendingStudentsList[i].rollNo != rollNo) return res.json("Not requested for the course")
    }
        course.acceptedStudents.push({
            rollNo: rollNo,
        })
        student.courses.push({
            name: course.name,
            code: course.code,
        })
        student.pendingRequests = student.pendingRequests.filter(code => code.code != course.code)
        course.pendingStudents = course.pendingStudents.filter(student => student.rollNo != rollNo)
   
    await course.save()
    await student.save()
    res.json("added to course successfully")
}

export const deleteCourse = async (req,res, next) => {
    const {courseID} = req.body
        const course = await Course.findById(courseID);
        if(course==null) return res.json("Course not found")
        const pendingStudents = course.pendingStudents
        const acceptedStudents = course.acceptedStudents
        if (pendingStudents!=null) for(let i=0; i<pendingStudents.length; i++){
            const student = await Student.findOne({rollNo:pendingStudents[i].rollNo})
            student.pendingRequests = student.pendingRequests.filter(code => code.code != course.code)
            await student.save()
        }
        if (acceptedStudents!=null) for(let i=0; i<acceptedStudents.length; i++){
            const student = await Student.findOne({rollNo:acceptedStudents[i].rollNo})
            student.courses = student.courses.filter(code => code.code != course.code)
            await student.save()
        }
        await course.deleteOne()
        res.json("deleted course successfully")
}

