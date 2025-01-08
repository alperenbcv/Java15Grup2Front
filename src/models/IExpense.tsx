export interface IExpense{
    id: string,
    title: string,
    personnelId: string,
    managerId: string,
    expenseDate: number,
    description: string,
    expenseState: string,
    employeeName?: string,
    fileUrl?: string,
    imageUrl?: string
}