import prisma from "../../lib/prisma"
import express from 'express'
import { BudgetMonthController } from '../controllers/BudgetMonthController'
import { CategoryTemplateController } from "../controllers/CategoryTemplateController" 
import { UserController } from "../controllers/UserController"
import { validateUpdates, validateValidId } from "../validators/UtilValidators"
import { validateNewBudgetMonth, validateNonExistingBudgetMonth } from "../validators/BudgetMonthValidators"
import { validateUser, validateNonExistingUser } from "../validators/UserValidators"
import { validateNewCategoryTemplate, validateNonExistingCategoryTemplate } from "../validators/CategoryTemplateValidators"
import { validateNewTransaction } from "../validators/TransactionValidators"
import passport from '../index'
import { TransactionController } from "../controllers/TransactionController"

const router = express.Router()

const budgetMonthController = new BudgetMonthController()
const categoryTemplateController = new CategoryTemplateController()
const userController = new UserController()
const transactionController = new TransactionController()

router.post("/register", validateUser, validateNonExistingUser, userController.createUser)
router.post("/login", passport.authenticate('local', {session: false}), userController.loginUser)

router.get("/budget-months", passport.authenticate('jwt', { session: false }), budgetMonthController.getAllBudgetMonths)
router.get("/budget-months/:id", passport.authenticate('jwt', {session: false}), validateValidId, budgetMonthController.getBudgetMonth)
router.post("/budget-months", passport.authenticate('jwt', {session: false}), validateNewBudgetMonth, validateNonExistingBudgetMonth, budgetMonthController.createBudgetMonth)
router.patch("/budget-months/:id", passport.authenticate('jwt', {session: false}), validateValidId, validateUpdates, budgetMonthController.updateBudgetMonth)

router.get("/category-templates", passport.authenticate('jwt', {session: false}), categoryTemplateController.getAllCategoryTemplates)
router.post("/category-templates", passport.authenticate('jwt', {session: false}), validateNewCategoryTemplate, validateNonExistingCategoryTemplate, categoryTemplateController.createCategoryTemplate)
router.patch("/category-templates/:id", passport.authenticate('jwt', {session: false}), validateValidId, validateUpdates, categoryTemplateController.updateCategoryTemplate)

router.post("/transactions", passport.authenticate('jwt', {session: false}), validateNewTransaction,  transactionController.createTransaction)

export default router;
