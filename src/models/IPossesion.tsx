export interface IPossession{
    id: string,
    title: string,
    description: string,
    personnelId: string,
    companyId: string,
    managerId: string,
    lendingDate: number,
    returnDate: number,
    confirmationState: string
}