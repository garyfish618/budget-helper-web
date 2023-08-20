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


const users = [
    {
        email: "demo@test.com",
        password: "$2b$10$VhS0k4cKRTYXyQmd3MBtMenjTm1DunKqMSaF91DYD74T3qG7TWcUK", // password = "password"
        budgetMonths: {
            create: [
                budgetMonths[0]
            ]
        },
        categoryTemplates: {
            create: [
                categoryTemplates[0]
            ]
        }
    }
]


export {
    users
}