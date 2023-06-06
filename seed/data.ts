const budgetMonths = [
    {
        month: 1,
        year: 2023,
        extraIncome: "50.00",
        categories: {
            create: [
                {
                    name: "Food",
                    amountBudgeted: "50.00",
                    transactions: {
                        create: [ 
                            {
                                description: "Vons Groceries",
                                amount: "20.00",
                                date: new Date("2023-01-12"),
                                transactionType: "AMEX"
                            },
                            {
                                description: "Target",
                                amount: "5.00",
                                date: new Date("2023-01-13"),
                                transactionType: "NFCUCredit"
                            },
                            {
                                description: "Trader Joes",
                                amount: "5.00",
                                date: new Date("2023-01-14"),
                                transactionType: "NFCUDebit"
                            }
                        ],
                        
                    }
                }                
            ]
        }

    }
]

const categoryTemplates = [
    {
        name: "Food",
        amountBudgeted: "50.00"
    }
]

export {
    budgetMonths,
    categoryTemplates
}