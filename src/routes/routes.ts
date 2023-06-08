import prisma from "../../lib/prisma"
import express from 'express'
import { BudgetMonthController } from '../controllers/BudgetMonthController'
import { validateNewBudgetMonth} from "../validators/BudgetMonthValidators"

const router = express.Router()

const budgetMonthController = new BudgetMonthController()

router.get("/budget-months", budgetMonthController.getAllBudgetMonths)
router.post("/budget-months", validateNewBudgetMonth, budgetMonthController.createBudgetMonth)
router.get("/budget-months/:id", budgetMonthController.getBudgetMonth)
// router.patch("/buudget-months/:id", h, budgetMonthController.updateBudgetMonth)

export default router;
