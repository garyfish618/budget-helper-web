import prisma from "../../lib/prisma";
import express from 'express';
import { BudgetMonthController } from '../controllers/BudgetMonthController';

const router = express.Router()

const budgetMonthController = new BudgetMonthController();

router.get("/budget-months", budgetMonthController.getAllBudgetMonths);
router.get("/budget-months/:id", budgetMonthController.getBudgetMonth);


export default router;
