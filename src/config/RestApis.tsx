const testUrl = 'http://localhost:9090/v1/test';
const devUrl = 'http://localhost:9090/v1/dev';

const server = devUrl;

const apis = {
    authService: server + '/auth',
    userService: server + '/user',
    authCompanyService: server + '/auth/company',
    authManagerService: server + '/auth/manager',
    authEmployeeService: server + '/auth/employee',
    authShiftService : server + '/auth/shift',
    authAdminService: server + '/auth/admin',
    leaveService: server + '/leave',
    possessionService: server + '/possession',
    expenseService: server + '/expense',
    commentService: server + '/comment',
    mediaFileService: server + '/media-file',
    personnelFileService: server + '/personnel-file'
}

export default apis;