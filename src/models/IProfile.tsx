export interface IProfile{
    name: string,
    surname: string,
    email: string,
    phoneNumber: string,
    pictureUrl: string,
    address: string,
    gender: string,
    department: string,
    title: string,
    isAccountVerified: boolean,
    isAccountActive: boolean,
    hireDate: number,
    birthDate: number,
    isOnLeave: boolean,
    companyId: string,

    managerId?: string,
    
    isSuperAdmin?: boolean
}