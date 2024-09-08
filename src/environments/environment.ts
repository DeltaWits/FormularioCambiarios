// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
export const environment = {
  production: false,
  API_URL: 'http://localhost:8080',
  CODE_ACCESS: 'Corfi_form_1002334%$',
  URL_DOMAIN: 'http://localhost:4200',
  SECRET: 'kEY_FTCORIF_2023',
  EMAIL: {
    EMAILADMIN: '',
    DOMAIN_HOST: 'smtp-relay.sendinblue.com',
    EMAIL_SUPPORT: '',

    PORT_SMTP: '587',
    PASS_EMAIL: '5PLIfR6EC8qDbpUW',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
