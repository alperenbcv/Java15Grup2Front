export interface IEmployeeRegisterRequest{
    name: string,
    surname: string,
    email: string,
    department: string,
    token: string | null
}