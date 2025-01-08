export interface IEmployeeActivationRequest{
    title: string,
    birthDate: string,
    password: string,
    rePassword: string,
    activationToken: string | null,
    gender: string
}