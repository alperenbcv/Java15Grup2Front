import { ILeave } from "./ILeave";

export interface IAddLeave{
    startDate: number,
    endDate: number,
    description: string,
    leaveType: string,
    token: string
}