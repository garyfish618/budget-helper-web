import prisma from "../../lib/prisma"
import express from 'express'
import { BudgetMonthController } from '../controllers/BudgetMonthController'
import { CategoryTemplateController } from "../controllers/CategoryTemplateController" 
import { UserController } from "../controllers/UserController"
import { validateNewBudgetMonth, validateNonExistingBudgetMonth, validateUpdateBudgetMonth, validateValidBudgetMonthId } from "../validators/BudgetMonthValidators"
import { validateUser, validateNonExistingUser } from "../validators/UserValidators"
import { validateNewCategoryTemplate, validateNonExistingCategoryTemplate } from "../validators/CategoryTemplateValidators"
import passport from '../index'

const router = express.Router()

const budgetMonthController = new BudgetMonthController()
const categoryTemplateController = new CategoryTemplateController()
const userController = new UserController()

router.post("/register", validateUser, validateNonExistingUser, userController.createUser)
router.post("/login", passport.authenticate('local', {session: false}), userController.loginUser)
router.get("/budget-months", passport.authenticate('jwt', { session: false }), budgetMonthController.getAllBudgetMonths)
router.post("/budget-months", validateNewBudgetMonth, validateNonExistingBudgetMonth, budgetMonthController.createBudgetMonth)
router.get("/budget-months/:id", validateValidBudgetMonthId, budgetMonthController.getBudgetMonth)
router.patch("/budget-months/:id", validateValidBudgetMonthId, validateUpdateBudgetMonth, budgetMonthController.updateBudgetMonth)
router.get("/category-templates", categoryTemplateController.getAllCategoryTemplates)
router.post("/category-templates", validateNewCategoryTemplate, validateNonExistingCategoryTemplate, validateNonExistingCategoryTemplate, categoryTemplateController.createCategoryTemplate)

export default router;
