import prisma from "../../lib/prisma"
import express from 'express'
import { BudgetMonthController } from '../controllers/BudgetMonthController'
import { BudgetCategoryTemplateController, BudgetCategoryTemplateController } from "../controllers/BudgetCategoryTemplateController" 
import { validateNewBudgetMonth, validateNonExistingBudgetMonth, validateUpdateBudgetMonth, validateValidBudgetMonthId } from "../validators/BudgetMonthValidators"

const router = express.Router()

const budgetMonthController = new BudgetMonthController()
const budgetCategoryTemplateController = new BudgetCategoryTemplateController()

router.get("/budget-months", budgetMonthController.getAllBudgetMonths)
router.post("/budget-months", validateNewBudgetMonth, validateNonExistingBudgetMonth, budgetMonthController.createBudgetMonth)
router.get("/budget-months/:id", validateValidBudgetMonthId, budgetMonthController.getBudgetMonth)
router.patch("/budget-months/:id", validateValidBudgetMonthId, validateUpdateBudgetMonth, budgetMonthController.updateBudgetMonth)
router.get("/budget-category-templates", budgetCategoryTemplateController.getAllCategoryTemplates)

export default router;
