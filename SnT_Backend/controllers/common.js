import { loginStudent, signUpStudent , loginAdmin} from "../model/db.js"
import { createCourse } from "./admin/manageCourse.js"
import { Course, Student } from "../model/db.js";
export const test = (req, res) => {
    res.send("Hello")
}

export const errorTest = (req, res) => {
    throw new Error("Error test")
}

export const signUpHandler = async (req, res,next) => {
    try {
        const { name,emailID, password, rollNo} = req.body
        const user = await signUpStudent(name, emailID, password, rollNo)
        res.json(user._id)
    } catch (error) {
        next(error)
    }
}

export const adminHandler = async (req, res,next) => {
    try {
        const { name,emailID, password} = req.body
        const admin = await signUpAdmin(name, emailID, password)
        res.json(admin._id)
    } catch (error) {
        next(error)
    }
}

export const courseHandler = async (req, res,next) => {
    try {
        const { name,code} = req.body
        const course = await createCourse(name, code)
        res.json(course._id)
    } catch (error) {
        next(error)
    }
}

export const loginHandler = async (req, res, next) => {
    try {
        const { rollNo, password } = req.body
        const b = await loginStudent(rollNo, password)
        if (b=="First Sign up") {
            res.json("First sign up")
            
        } else if(b!="First Sign up" && b!=false) {
            res.json(b)
        } else{
            res.json("Error logging in")
        }
    } catch (error) {
        next(error)
    }
}
export const adminLoginHandler = async (req, res, next) => {
    try {
        const { adminID, password } = req.body
        const b = await loginAdmin(adminID, password)
        if (b=="First Sign up") {
            res.json("First sign up")
            
        } else if(b!="First Sign up" && b!=false) {
            res.json(b)
        } else{
            res.json("Error logging in")
        }
    } catch (error) {
        next(error)
    }
}

export const allStudentsList = async (req,res, next) => {
    const students = await Student.find({})
    res.json(students)
}

export const allCoursesList = async (req,res, next) => {
    const courses = await Course.find({})
    res.json(courses)
}


export const studentData = async (req,res, next) => {
    const {token} = req.body
    const student = await Student.findById(token)
    res.json(student)
}

export const courseData = async (req,res, next) => {
    const {token} = req.body
    const course = await Course.findById(token)
    res.json(course)
}