const testUrl = 'http://localhost:9090/v1/test';
const devUrl = 'http://localhost:9090/v1/dev';

const server = devUrl;

const apis = {
    authCompanyService: server + '/auth/company',
    authManagerService: server + '/auth/manager',
    authEmployeeService: server + '/auth/employee',
    authAdminService: server + '/auth/admin',
}

export default apis;