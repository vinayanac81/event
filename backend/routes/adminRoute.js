import express from "express"
import { adminLogin, dashboard, getApprovedManagers, getManagers, getUsers, manageAccess, manageManagerApproval, viewManager } from "../controllers/adminController.js"
const router=express.Router()
router.post("/",adminLogin)
router.get("/dashboard",dashboard)
router.get("/users",getUsers)
router.get("/managers",getManagers)
router.get("/approvedManagers",getApprovedManagers)
router.put("/accessManage",manageAccess)
router.put("/manageManagerApproval",manageManagerApproval)
router.get("/managers/view-manager/:id",viewManager)
export default router