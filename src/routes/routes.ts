import prisma from "../../lib/prisma"
import express from 'express'
import { BudgetMonthController } from '../controllers/BudgetMonthController'
import { CategoryTemplateController } from "../controllers/CategoryTemplateController" 
import { UserController } from "../controllers/UserController"
import { validateUpdates, validateValidId } from "../validators/UtilValidators"
import { validateNewBudgetMonth, validateNonExistingBudgetMonth } from "../validators/BudgetMonthValidators"
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
router.get("/budget-months/:id", passport.authenticate('jwt', {session: false}), validateValidId, budgetMonthController.getBudgetMonth)
router.post("/budget-months", passport.authenticate('jwt', {session: false}), validateNewBudgetMonth, validateNonExistingBudgetMonth, budgetMonthController.createBudgetMonth)
router.patch("/budget-months/:id", passport.authenticate('jwt', {session: false}), validateValidId, validateUpdates, budgetMonthController.updateBudgetMonth)

router.get("/category-templates", passport.authenticate('jwt', {session: false}), categoryTemplateController.getAllCategoryTemplates)
router.post("/category-templates", passport.authenticate('jwt', {session: false}), validateNewCategoryTemplate, validateNonExistingCategoryTemplate, categoryTemplateController.createCategoryTemplate)
router.patch("/category-templates/:id", passport.authenticate('jwt', {session: false}), validateValidId, validateUpdates, categoryTemplateController.updateCategoryTemplate)

export default router;
