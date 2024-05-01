import { Schema, connect, model } from "mongoose";
import { createHash } from "node:crypto";
import { dbUri } from "../config.js";

const courseSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
        unique: true,
    },
    acceptedStudents: {
        type: Array,
        default: [],
    },
    pendingStudents:{
        type: Array,
        default: [],
    }
})

const studentSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    emailID: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    rollNo: {
        type: String,
        required: true,
        unique: true,
    },
    courses: {
        type: Array,
        default: [],
    },
    pendingRequests: {
        type: Array,
        default: [],
    }

})


const adminSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    emailID: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
})

connect(dbUri).then(console.log("Connected to DATABASE")).catch(err => console.error(err))

export const Student = model('Student', studentSchema)
export const Course = model('Course', courseSchema)
const Admin = model('Admin', adminSchema)   

export const signUpStudent = async (name, emailID, password, rollNo) => {
    try {
        const passHash = createHash('sha256').update(password).digest('hex')
        const student = new Student({name, emailID,password:passHash,rollNo})
        await student.save()
        return student
    } catch (err) {
        console.error("Error signing up:", err);
        throw new Error("Error Signing Up");
    }
}

export const signUpAdmin = async (name, emailID, password) => {
    try {
        const passHash = createHash('sha256').update(password).digest('hex')
        const admin = new Admin({name, emailID,password:passHash})
        await admin.save()
        return admin
    } catch (err) {
        console.error("Error signing up:", err);
        throw new Error("Error Signing Up");
    }
}






export const loginStudent = async (rollNo, password) => {
    try {
        const student = await Student.findOne({ rollNo})
        const passHash = createHash('sha256').update(password).digest('hex');
        if(student==null) return "First Sign up";
        if (student.password === passHash) return student._id;
        return false;
    } catch (error) {
        throw new Error("Error Logging in")
    }
}

export const loginAdmin = async (adminID, password) => {
    try {
        const admin = await Admin.findById(adminID);
        console.log(admin)
        const passHash = createHash('sha256').update(password).digest('hex');
        if(admin==null) return "First Sign up";
        if (admin.password === password) return admin._id;
        return false;
    } catch (error) {
        throw new Error("Error Logging in")
    }
}

export const tokenDb = async (token) => {
    try {
        const admin = await Admin.findById(token);
        return admin
    } catch (error) {
        throw new Error("Error Occured")
    }
}