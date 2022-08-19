/*
|-------------------------------------------------------------------------------------------------------
| Constants File
|-------------------------------------------------------------------------------------------------------
| In this file all the constants set to globals for using them through out the project.
|
*/

global.appPort = 9300;

global.DEBUG_MODE = false; // true in developement | false in production mode

global.WRITE_DEBUG_JSON_FILE = false;

global.securityKey = '__gogetthat';

global.appName = 'Go Get That';

global.appShortName = 'OS';

global.appFavUrl = '/assets/img/logo/logo.png';

global.appLogoUrl = '/assets/img/logo/logo.png';

global.appVersion = '0.0.1';

global.companyName = 'Go Get That Pvt Ltd';

global.companyUrl = 'javascript:void(0)';

global.copyrightYear = '2021';

global.jwtSecretKey = 'asafdadfa1231asdfaakf123124o1i24bcd';

global.model = '';

global.modelTitle = '';

global.currentModule = '';

global.currentSubModule = '';

global.currentSubModuleSidebar = '';

global.moduleRoles = {
    0: 'admin',
    3: 'sellerAdmin'
}

global.roleTypes = {
    0: 'Admin',
    1: 'User',
    2: 'Driver',
    3: 'Vendor',
    4: 'Vendor Employee',
    1: 'Vendor Manager',

}

global.userRoleModels = {

    0: 'adminDetail',
    1: 'userDetail',
    2: 'driverDetail',
    3: 'vendorDetail',
    4: 'vendorStaffDetail',
    5: 'vendorStaffDetail',


}

/*
|-------------------------------------------------------------------------------------------------------
| Global Functions
|-------------------------------------------------------------------------------------------------------
| 
|
*/
global.log = function (value, key) {
    // const key = Object.keys(this)[0];
    // const value = this[key];
    console.log(JSON.stringify(value, null, 2), `:=======================================================>${key}`);
}
/*
|-------------------------------------------------------------------------------------------------------
| Mail Auth Configuration
|-------------------------------------------------------------------------------------------------------
| In this section mail auth configuration object is set.
|
*/

global.mailAuth = {
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    service: 'gmail',
    auth: {
        user: 'noreply.tamamapp@gmail.com',
        pass: '@@Tamam123'
    }
};


/*
|-------------------------------------------------------------------------------------------------------
| Color Classes
|-------------------------------------------------------------------------------------------------------
| In this section color classes suffixes for bg-color & text-color, for example bg-orange & text-orange.
|
*/

global.colorClasses = [
    'orange',
    'yellow',
    'indigo',
    'blue',
    'green',
    'red',
    'purple',
    'cyan',
    'gray',
    'teal',
    'pink',
    'gray-dark',
];

/*
|-------------------------------------------------------------------------------------------------------
| NPM modules set to globals
|-------------------------------------------------------------------------------------------------------
| In this section NPM modules set to globals
|
*/

global.moment = require('moment');

module.exports = global;