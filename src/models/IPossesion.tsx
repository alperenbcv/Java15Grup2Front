export interface IPossession{
    id: string,
    title: string,
    description: string,
    companyId: string,
    lendingDate: number,
    returnDate: number,
    confirmationState: string,
    employeeName?: string,
    employeeMail?: string
}