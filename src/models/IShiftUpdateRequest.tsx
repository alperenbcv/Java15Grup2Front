export interface IShiftUpdateRequest {
    shiftId: string,
    startDate: string,
    endDate: string,
    emailList : string[],
    shiftType : string,
}