export interface IProfile {
  name: string;
  surname: string;
  email: string;
  phoneNumber: string;
  pictureUrl: string;
  address: string;
  gender: string;
  department: string;
  title: string;
  accountVerified: boolean;
  accountActive: boolean;
  hireDate: number;
  birthDate: number;
  isOnLeave: boolean;
  role: string;
  companyId: string;
  wage: number;

  managerId?: string;

  isSuperAdmin?: boolean;
}
