// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

/*export const environment = {
  apiUrl: 'https://ngapi.testing.clowdwork.com',
  production: false,
  appVersion: 'v723demo1',
  USERDATA_KEY: 'authf649fc9a5f55',
  isMockEnabled: true
};*/

;

export const environment = {
  apiUrl: location.hostname  == 'localhost' ? 'https://app2testing.clowdwork.com/app' : location.origin+'/app',  //Production
  //apiUrl: 'http://tests.clowdwork.com:8000',
  production: false,
  appVersion: 'v723demo1',
  USERDATA_KEY: 'authf649fc9a5f55',
  isMockEnabled: true
};

export const dtOptions = {
  pagingType: 'full_numbers',
  pageLength: 10,
  processing: true,
  language: {
    emptyTable: 'No data.',
    info: '_START_ - _END_  _TOTAL_ ',
    infoEmpty: '0',
    infoPostFix: ' (updated)',
    lengthMenu: '_MENU_',
    loadingRecords: 'Loading...',
    processing: 'Processing...',
    zeroRecords: 'None',
    paginate: {
      first: '<<',
      last: '>>',
      next: '>',
      previous: '<',
    },
    aria: {
      sortAscending: 'asc',
      sortDescending: 'desc',
    },
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
