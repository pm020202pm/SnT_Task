import { Router } from "express";

import { errorTest, signUpHandler, test, loginHandler, courseHandler, adminHandler, adminLoginHandler, courseData, studentData, allCoursesList, allStudentsList} from "../controllers/common.js";
import { authMiddleware } from "../middleware/authorize.js";
import { checkLogin} from "../controllers/collections.js";
import { acceptCourse, deleteCourse } from "../controllers/admin/manageCourse.js";
import { requestCourse } from "../controllers/student/manageCourse.js";

export const router = Router()

router.get("/test", test)
router.get("/error", errorTest)

// Admin
router.post('/createAdmin', adminHandler)
router.post('/adminSignin', adminLoginHandler)
router.post('/createCourse',authMiddleware, courseHandler)
router.post("/acceptCourse",authMiddleware,acceptCourse)
router.post("/deleteCourse",authMiddleware, deleteCourse)

//Student
router.post('/signup', signUpHandler)
router.post('/signin', loginHandler)
router.post("/requestCourse", requestCourse)


router.post('/allStudentsList', allStudentsList)
router.get('/allCoursesList', allCoursesList)
router.post('/studentData', studentData)
router.post('/courseData', courseData)

router.get("/checkLogin",authMiddleware,checkLogin)



