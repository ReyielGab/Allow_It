const expenseStatus = {
    inProgress : 0,
    submitted: 1,
    rejected: 2,
    approved: 3
}

const expenseHeader = [
    'date',
    'description',
    'remarks',
    'status',
    'total'
]

const incomeHeader = [
    'date',
    'category',
    'remarks',
    'total amount'
]


const constantsHelper = {
    expenseStatus: expenseStatus,
    expenseHeader: expenseHeader,
    incomeHeader: incomeHeader
};

export default constantsHelper;