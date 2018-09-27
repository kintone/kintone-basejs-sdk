/**
 * kintone api - nodejs client
 * test app module
 */
const nock = require('nock');
const common = require('../../utils/common');
const {App, Auth, Connection, KintoneAPIException} = require(common.MAIN_PATH);

const URI = 'https://' + common.DOMAIN;
const APP_PREVIEW_SETTINGS_ROUTE = '/k/v1/preview/app/settings.json';
const APP_SETTINGS_ROUTE = '/k/v1/app/settings.json';
const GUEST_APP_PREVIEW_SETTINGS_ROUTE = `/k/guest/${common.GUEST_SPACEID}/v1/preview/app/settings.json`;
const GUEST_APP_SETTINGS_ROUTE = `/k/guest/${common.GUEST_SPACEID}/v1/app/settings.json`;

// Init Connection
const auth = new Auth();
auth.setPasswordAuth(common.USERNAME, common.PASSWORD);
const conn = new Connection(common.DOMAIN, auth);
const appModule = new App(conn);

// Init API Connection
const authAPI = new Auth();
authAPI.setApiToken('testAPIToken');
const connAPI = new Connection(common.DOMAIN, authAPI);
const appModuleAPI = new App(connAPI);

// Init Connection Guest Space
const connGuestSpace = new Connection(common.DOMAIN, auth, common.GUEST_SPACEID);
const appModuleGuestSpace = new App(connGuestSpace);

// Init API Connection Guest Space
const connAPIGuestSpace = new Connection(common.DOMAIN, authAPI, common.GUEST_SPACEID);
const appModuleAPIGuestSpace = new App(connAPIGuestSpace);

describe('getGeneralSettings function', () => {
  describe('common function', () => {
    it('should return promise', () => {
      nock(URI)
        .get(APP_SETTINGS_ROUTE)
        .reply(200, {});
      const getGeneralSettingsResult = appModule.getGeneralSettings();
      expect(getGeneralSettingsResult).toHaveProperty('then');
      expect(getGeneralSettingsResult).toHaveProperty('catch');
    });
    it('should return promise PRE-LIVE', () => {
      const isPreview = true;
      nock(URI)
        .get(APP_PREVIEW_SETTINGS_ROUTE)
        .reply(200, {});
      const getGeneralSettingsResult = appModule.getGeneralSettings(undefined, undefined, isPreview);
      expect(getGeneralSettingsResult).toHaveProperty('then');
      expect(getGeneralSettingsResult).toHaveProperty('catch');
    });
    it('should return promise GUEST SPACE', () => {
      const isPreview = true;
      nock(URI)
        .get(GUEST_APP_PREVIEW_SETTINGS_ROUTE)
        .reply(200, {});
      const getGeneralSettingsResult = appModuleGuestSpace.getGeneralSettings(undefined, undefined, isPreview);
      expect(getGeneralSettingsResult).toHaveProperty('then');
      expect(getGeneralSettingsResult).toHaveProperty('catch');
    });
  });

  describe('success case', () => {
    it('[GeneralSetting-3-6]should get successfully the PRE-LIVE app general settings information', () => {
      const data = {
        'app': 1,
        'lang': 'en'
      };
      const isPreview = true;

      const expectResult = {
        'name': 'San Francisco Lunch Map',
        'description': 'A list of great places to go!',
        'icon': {
          'type': 'PRESET',
          'key': 'APP60'
        },
        'theme': 'WHITE',
        'revision': '24'
      };
      nock(URI)
        .get(`${APP_PREVIEW_SETTINGS_ROUTE}?app=${data.app}&lang=${data.lang}`)
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(common.getPasswordAuth(common.USERNAME, common.PASSWORD));
          return true;
        })
        .reply(200, expectResult);
      const getGeneralSettingsResult = appModule.getGeneralSettings(data.app, data.lang, isPreview);
      return getGeneralSettingsResult.then((rsp) => {
        expect(rsp).toMatchObject(expectResult);
      });
    });
    it('[GeneralSetting-9]should get successfully the PRE-LIVE app general settings information in GUEST SPACE', () => {
      const data = {
        'app': 1,
        'lang': 'en'
      };
      const isPreview = true;
      const expectResult = {
        'name': 'San Francisco Lunch Map',
        'description': 'A list of great places to go!',
        'icon': {
          'type': 'PRESET',
          'key': 'APP60'
        },
        'theme': 'WHITE',
        'revision': '24'
      };
      nock(URI)
        .get(`${GUEST_APP_PREVIEW_SETTINGS_ROUTE}?app=${data.app}&lang=${data.lang}`)
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(common.getPasswordAuth(common.USERNAME, common.PASSWORD));
          return true;
        })
        .reply(200, expectResult);
      const getGeneralSettingsResult = appModuleGuestSpace.getGeneralSettings(data.app, data.lang, isPreview);
      return getGeneralSettingsResult.then((rsp) => {
        expect(rsp).toMatchObject(expectResult);
      });
    });
    it('[GeneralSetting-4]should get successfully the app general settings information', () => {
      const data = {
        'app': 1,
        'lang': 'en'
      };
      const isPreview = false;

      const expectResult = {
        'name': 'San Francisco Lunch Map',
        'description': 'A list of great places to go!',
        'icon': {
          'type': 'PRESET',
          'key': 'APP60'
        },
        'theme': 'WHITE',
        'revision': '24'
      };
      nock(URI)
        .get(`${APP_SETTINGS_ROUTE}?app=${data.app}&lang=${data.lang}`)
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(common.getPasswordAuth(common.USERNAME, common.PASSWORD));
          return true;
        })
        .reply(200, expectResult);
      const getGeneralSettingsResult = appModule.getGeneralSettings(data.app, data.lang, isPreview);
      return getGeneralSettingsResult.then((rsp) => {
        expect(rsp).toMatchObject(expectResult);
      });
    });
    it('[GeneralSetting-9]should get successfully the app general settings information in GUEST SPACE', () => {
      const data = {
        'app': 1,
        'lang': 'en'
      };
      const isPreview = false;
      const expectResult = {
        'name': 'San Francisco Lunch Map',
        'description': 'A list of great places to go!',
        'icon': {
          'type': 'PRESET',
          'key': 'APP60'
        },
        'theme': 'WHITE',
        'revision': '24'
      };
      nock(URI)
        .get(`${GUEST_APP_SETTINGS_ROUTE}?app=${data.app}&lang=${data.lang}`)
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(common.getPasswordAuth(common.USERNAME, common.PASSWORD));
          return true;
        })
        .reply(200, expectResult);
      const getGeneralSettingsResult = appModuleGuestSpace.getGeneralSettings(data.app, data.lang, isPreview);
      return getGeneralSettingsResult.then((rsp) => {
        expect(rsp).toMatchObject(expectResult);
      });
    });
    it('[GeneralSetting-7]should get successfully the app general settings information without isPreview param', () => {
      const data = {
        'app': 1,
        'lang': 'en'
      };
      const expectResult = {
        'name': 'San Francisco Lunch Map',
        'description': 'A list of great places to go!',
        'icon': {
          'type': 'PRESET',
          'key': 'APP60'
        },
        'theme': 'WHITE',
        'revision': '24'
      };
      nock(URI)
        .get(`${APP_SETTINGS_ROUTE}?app=${data.app}&lang=${data.lang}`)
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(common.getPasswordAuth(common.USERNAME, common.PASSWORD));
          return true;
        })
        .reply(200, expectResult);
      const getGeneralSettingsResult = appModule.getGeneralSettings(data.app, data.lang);
      return getGeneralSettingsResult.then((rsp) => {
        expect(rsp).toMatchObject(expectResult);
      });
    });
    it('[GeneralSetting-9]should get successfully the app general settings information in GUEST SPACE without isPreview param', () => {
      const data = {
        'app': 1,
        'lang': 'en'
      };
      const expectResult = {
        'name': 'San Francisco Lunch Map',
        'description': 'A list of great places to go!',
        'icon': {
          'type': 'PRESET',
          'key': 'APP60'
        },
        'theme': 'WHITE',
        'revision': '24'
      };
      nock(URI)
        .get(`${GUEST_APP_SETTINGS_ROUTE}?app=${data.app}&lang=${data.lang}`)
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(common.getPasswordAuth(common.USERNAME, common.PASSWORD));
          return true;
        })
        .reply(200, expectResult);
      const getGeneralSettingsResult = appModuleGuestSpace.getGeneralSettings(data.app, data.lang);
      return getGeneralSettingsResult.then((rsp) => {
        expect(rsp).toMatchObject(expectResult);
      });
    });
    it('[GeneralSetting-5]should get successfully the PRE-LIVE app general settings information with DEFAULT language', () => {
      const data = {
        'app': 1,
        'lang': 'default'
      };
      const isPreview = true;
      const expectResult = {
        'name': 'San Francisco Lunch Map',
        'description': 'A list of great places to go!',
        'icon': {
          'type': 'PRESET',
          'key': 'APP60'
        },
        'theme': 'WHITE',
        'revision': '24'
      };
      nock(URI)
        .get(`${APP_PREVIEW_SETTINGS_ROUTE}?app=${data.app}&lang=${data.lang}`)
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(common.getPasswordAuth(common.USERNAME, common.PASSWORD));
          return true;
        })
        .reply(200, expectResult);
      const getGeneralSettingsResult = appModule.getGeneralSettings(data.app, data.lang, isPreview);
      return getGeneralSettingsResult.then((rsp) => {
        expect(rsp).toMatchObject(expectResult);
      });
    });
    it('[GeneralSetting-5]should get successfully the PRE-LIVE app general settings information with ZH language', () => {
      const data = {
        'app': 1,
        'lang': 'ZH'
      };
      const isPreview = true;
      const expectResult = {
        'name': 'San Francisco Lunch Map',
        'description': 'A list of great places to go!',
        'icon': {
          'type': 'PRESET',
          'key': 'APP60'
        },
        'theme': 'WHITE',
        'revision': '24'
      };
      nock(URI)
        .get(`${APP_PREVIEW_SETTINGS_ROUTE}?app=${data.app}&lang=${data.lang}`)
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(common.getPasswordAuth(common.USERNAME, common.PASSWORD));
          return true;
        })
        .reply(200, expectResult);
      const getGeneralSettingsResult = appModule.getGeneralSettings(data.app, data.lang, isPreview);
      return getGeneralSettingsResult.then((rsp) => {
        expect(rsp).toMatchObject(expectResult);
      });
    });
    it('[GeneralSetting-5]should get successfully the PRE-LIVE app general settings information with JA language', () => {
      const data = {
        'app': 1,
        'lang': 'JA'
      };
      const isPreview = true;
      const expectResult = {
        'name': 'San Francisco Lunch Map',
        'description': 'A list of great places to go!',
        'icon': {
          'type': 'PRESET',
          'key': 'APP60'
        },
        'theme': 'WHITE',
        'revision': '24'
      };
      nock(URI)
        .get(`${APP_PREVIEW_SETTINGS_ROUTE}?app=${data.app}&lang=${data.lang}`)
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(common.getPasswordAuth(common.USERNAME, common.PASSWORD));
          return true;
        })
        .reply(200, expectResult);
      const getGeneralSettingsResult = appModule.getGeneralSettings(data.app, data.lang, isPreview);
      return getGeneralSettingsResult.then((rsp) => {
        expect(rsp).toMatchObject(expectResult);
      });
    });
    it('[GeneralSetting-5]should get successfully the PRE-LIVE app general settings information with USER language', () => {
      const data = {
        'app': 1,
        'lang': 'USER'
      };
      const isPreview = true;
      const expectResult = {
        'name': 'San Francisco Lunch Map',
        'description': 'A list of great places to go!',
        'icon': {
          'type': 'PRESET',
          'key': 'APP60'
        },
        'theme': 'WHITE',
        'revision': '24'
      };
      nock(URI)
        .get(`${APP_PREVIEW_SETTINGS_ROUTE}?app=${data.app}&lang=${data.lang}`)
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(common.getPasswordAuth(common.USERNAME, common.PASSWORD));
          return true;
        })
        .reply(200, expectResult);
      const getGeneralSettingsResult = appModule.getGeneralSettings(data.app, data.lang, isPreview);
      return getGeneralSettingsResult.then((rsp) => {
        expect(rsp).toMatchObject(expectResult);
      });
    });
    it('[GeneralSetting-5]should get successfully the PRE-LIVE app general settings information with DEFAULT language in GUEST SPACE', () => {
      const data = {
        'app': 1,
        'lang': 'default'
      };
      const isPreview = true;
      const expectResult = {
        'name': 'San Francisco Lunch Map',
        'description': 'A list of great places to go!',
        'icon': {
          'type': 'PRESET',
          'key': 'APP60'
        },
        'theme': 'WHITE',
        'revision': '24'
      };
      nock(URI)
        .get(`${GUEST_APP_PREVIEW_SETTINGS_ROUTE}?app=${data.app}&lang=${data.lang}`)
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(common.getPasswordAuth(common.USERNAME, common.PASSWORD));
          return true;
        })
        .reply(200, expectResult);
      const getGeneralSettingsResult = appModuleGuestSpace.getGeneralSettings(data.app, data.lang, isPreview);
      return getGeneralSettingsResult.then((rsp) => {
        expect(rsp).toMatchObject(expectResult);
      });
    });
    it('[GeneralSetting-5]should get successfully the PRE-LIVE app general settings information with ZH language in GUEST SPACE', () => {
      const data = {
        'app': 1,
        'lang': 'ZH'
      };
      const isPreview = true;
      const expectResult = {
        'name': 'San Francisco Lunch Map',
        'description': 'A list of great places to go!',
        'icon': {
          'type': 'PRESET',
          'key': 'APP60'
        },
        'theme': 'WHITE',
        'revision': '24'
      };
      nock(URI)
        .get(`${GUEST_APP_PREVIEW_SETTINGS_ROUTE}?app=${data.app}&lang=${data.lang}`)
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(common.getPasswordAuth(common.USERNAME, common.PASSWORD));
          return true;
        })
        .reply(200, expectResult);
      const getGeneralSettingsResult = appModuleGuestSpace.getGeneralSettings(data.app, data.lang, isPreview);
      return getGeneralSettingsResult.then((rsp) => {
        expect(rsp).toMatchObject(expectResult);
      });
    });
    it('[GeneralSetting-5]should get successfully the PRE-LIVE app general settings information with JA language in GUEST SPACE', () => {
      const data = {
        'app': 1,
        'lang': 'JA'
      };
      const isPreview = true;
      const expectResult = {
        'name': 'San Francisco Lunch Map',
        'description': 'A list of great places to go!',
        'icon': {
          'type': 'PRESET',
          'key': 'APP60'
        },
        'theme': 'WHITE',
        'revision': '24'
      };
      nock(URI)
        .get(`${GUEST_APP_PREVIEW_SETTINGS_ROUTE}?app=${data.app}&lang=${data.lang}`)
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(common.getPasswordAuth(common.USERNAME, common.PASSWORD));
          return true;
        })
        .reply(200, expectResult);
      const getGeneralSettingsResult = appModuleGuestSpace.getGeneralSettings(data.app, data.lang, isPreview);
      return getGeneralSettingsResult.then((rsp) => {
        expect(rsp).toMatchObject(expectResult);
      });
    });
    it('[GeneralSetting-5]should get successfully the PRE-LIVE app general settings information with USER language in GUEST SPACE', () => {
      const data = {
        'app': 1,
        'lang': 'USER'
      };
      const isPreview = true;
      const expectResult = {
        'name': 'San Francisco Lunch Map',
        'description': 'A list of great places to go!',
        'icon': {
          'type': 'PRESET',
          'key': 'APP60'
        },
        'theme': 'WHITE',
        'revision': '24'
      };
      nock(URI)
        .get(`${GUEST_APP_PREVIEW_SETTINGS_ROUTE}?app=${data.app}&lang=${data.lang}`)
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(common.getPasswordAuth(common.USERNAME, common.PASSWORD));
          return true;
        })
        .reply(200, expectResult);
      const getGeneralSettingsResult = appModuleGuestSpace.getGeneralSettings(data.app, data.lang, isPreview);
      return getGeneralSettingsResult.then((rsp) => {
        expect(rsp).toMatchObject(expectResult);
      });
    });
    it('[GeneralSetting-5]should get successfully the app general settings information with DEFAULT language', () => {
      const data = {
        'app': 1,
        'lang': 'default'
      };
      const isPreview = false;
      const expectResult = {
        'name': 'San Francisco Lunch Map',
        'description': 'A list of great places to go!',
        'icon': {
          'type': 'PRESET',
          'key': 'APP60'
        },
        'theme': 'WHITE',
        'revision': '24'
      };
      nock(URI)
        .get(`${APP_SETTINGS_ROUTE}?app=${data.app}&lang=${data.lang}`)
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(common.getPasswordAuth(common.USERNAME, common.PASSWORD));
          return true;
        })
        .reply(200, expectResult);
      const getGeneralSettingsResult = appModule.getGeneralSettings(data.app, data.lang, isPreview);
      return getGeneralSettingsResult.then((rsp) => {
        expect(rsp).toMatchObject(expectResult);
      });
    });
    it('[GeneralSetting-5]should get successfully the app general settings information with ZH language', () => {
      const data = {
        'app': 1,
        'lang': 'ZH'
      };
      const isPreview = false;
      const expectResult = {
        'name': 'San Francisco Lunch Map',
        'description': 'A list of great places to go!',
        'icon': {
          'type': 'PRESET',
          'key': 'APP60'
        },
        'theme': 'WHITE',
        'revision': '24'
      };
      nock(URI)
        .get(`${APP_SETTINGS_ROUTE}?app=${data.app}&lang=${data.lang}`)
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(common.getPasswordAuth(common.USERNAME, common.PASSWORD));
          return true;
        })
        .reply(200, expectResult);
      const getGeneralSettingsResult = appModule.getGeneralSettings(data.app, data.lang, isPreview);
      return getGeneralSettingsResult.then((rsp) => {
        expect(rsp).toMatchObject(expectResult);
      });
    });
    it('[GeneralSetting-5]should get successfully the app general settings information with JA language', () => {
      const data = {
        'app': 1,
        'lang': 'JA'
      };
      const isPreview = false;
      const expectResult = {
        'name': 'San Francisco Lunch Map',
        'description': 'A list of great places to go!',
        'icon': {
          'type': 'PRESET',
          'key': 'APP60'
        },
        'theme': 'WHITE',
        'revision': '24'
      };
      nock(URI)
        .get(`${APP_SETTINGS_ROUTE}?app=${data.app}&lang=${data.lang}`)
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(common.getPasswordAuth(common.USERNAME, common.PASSWORD));
          return true;
        })
        .reply(200, expectResult);
      const getGeneralSettingsResult = appModule.getGeneralSettings(data.app, data.lang, isPreview);
      return getGeneralSettingsResult.then((rsp) => {
        expect(rsp).toMatchObject(expectResult);
      });
    });
    it('[GeneralSetting-5]should get successfully the app general settings information with USER language', () => {
      const data = {
        'app': 1,
        'lang': 'USER'
      };
      const isPreview = false;
      const expectResult = {
        'name': 'San Francisco Lunch Map',
        'description': 'A list of great places to go!',
        'icon': {
          'type': 'PRESET',
          'key': 'APP60'
        },
        'theme': 'WHITE',
        'revision': '24'
      };
      nock(URI)
        .get(`${APP_SETTINGS_ROUTE}?app=${data.app}&lang=${data.lang}`)
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(common.getPasswordAuth(common.USERNAME, common.PASSWORD));
          return true;
        })
        .reply(200, expectResult);
      const getGeneralSettingsResult = appModule.getGeneralSettings(data.app, data.lang, isPreview);
      return getGeneralSettingsResult.then((rsp) => {
        expect(rsp).toMatchObject(expectResult);
      });
    });
    it('[GeneralSetting-5]should get successfully the app general settings information with DEFAULT language without isPreview param', () => {
      const data = {
        'app': 1,
        'lang': 'default'
      };
      const expectResult = {
        'name': 'San Francisco Lunch Map',
        'description': 'A list of great places to go!',
        'icon': {
          'type': 'PRESET',
          'key': 'APP60'
        },
        'theme': 'WHITE',
        'revision': '24'
      };
      nock(URI)
        .get(`${APP_SETTINGS_ROUTE}?app=${data.app}&lang=${data.lang}`)
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(common.getPasswordAuth(common.USERNAME, common.PASSWORD));
          return true;
        })
        .reply(200, expectResult);
      const getGeneralSettingsResult = appModule.getGeneralSettings(data.app, data.lang);
      return getGeneralSettingsResult.then((rsp) => {
        expect(rsp).toMatchObject(expectResult);
      });
    });
    it('[GeneralSetting-5]should get successfully the app general settings information with DEFAULT language in GUEST SPACE', () => {
      const data = {
        'app': 1,
        'lang': 'default'
      };
      const isPreview = false;
      const expectResult = {
        'name': 'San Francisco Lunch Map',
        'description': 'A list of great places to go!',
        'icon': {
          'type': 'PRESET',
          'key': 'APP60'
        },
        'theme': 'WHITE',
        'revision': '24'
      };
      nock(URI)
        .get(`${GUEST_APP_SETTINGS_ROUTE}?app=${data.app}&lang=${data.lang}`)
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(common.getPasswordAuth(common.USERNAME, common.PASSWORD));
          return true;
        })
        .reply(200, expectResult);
      const getGeneralSettingsResult = appModuleGuestSpace.getGeneralSettings(data.app, data.lang, isPreview);
      return getGeneralSettingsResult.then((rsp) => {
        expect(rsp).toMatchObject(expectResult);
      });
    });
    it('[GeneralSetting-5]should get successfully the app general settings information with ZH language in GUEST SPACE', () => {
      const data = {
        'app': 1,
        'lang': 'ZH'
      };
      const isPreview = false;
      const expectResult = {
        'name': 'San Francisco Lunch Map',
        'description': 'A list of great places to go!',
        'icon': {
          'type': 'PRESET',
          'key': 'APP60'
        },
        'theme': 'WHITE',
        'revision': '24'
      };
      nock(URI)
        .get(`${GUEST_APP_SETTINGS_ROUTE}?app=${data.app}&lang=${data.lang}`)
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(common.getPasswordAuth(common.USERNAME, common.PASSWORD));
          return true;
        })
        .reply(200, expectResult);
      const getGeneralSettingsResult = appModuleGuestSpace.getGeneralSettings(data.app, data.lang, isPreview);
      return getGeneralSettingsResult.then((rsp) => {
        expect(rsp).toMatchObject(expectResult);
      });
    });
    it('[GeneralSetting-5]should get successfully the app general settings information with JA language in GUEST SPACE', () => {
      const data = {
        'app': 1,
        'lang': 'JA'
      };
      const isPreview = false;
      const expectResult = {
        'name': 'San Francisco Lunch Map',
        'description': 'A list of great places to go!',
        'icon': {
          'type': 'PRESET',
          'key': 'APP60'
        },
        'theme': 'WHITE',
        'revision': '24'
      };
      nock(URI)
        .get(`${GUEST_APP_SETTINGS_ROUTE}?app=${data.app}&lang=${data.lang}`)
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(common.getPasswordAuth(common.USERNAME, common.PASSWORD));
          return true;
        })
        .reply(200, expectResult);
      const getGeneralSettingsResult = appModuleGuestSpace.getGeneralSettings(data.app, data.lang, isPreview);
      return getGeneralSettingsResult.then((rsp) => {
        expect(rsp).toMatchObject(expectResult);
      });
    });
    it('[GeneralSetting-5]should get successfully the app general settings information with USER language in GUEST SPACE', () => {
      const data = {
        'app': 1,
        'lang': 'USER'
      };
      const isPreview = false;
      const expectResult = {
        'name': 'San Francisco Lunch Map',
        'description': 'A list of great places to go!',
        'icon': {
          'type': 'PRESET',
          'key': 'APP60'
        },
        'theme': 'WHITE',
        'revision': '24'
      };
      nock(URI)
        .get(`${GUEST_APP_SETTINGS_ROUTE}?app=${data.app}&lang=${data.lang}`)
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(common.getPasswordAuth(common.USERNAME, common.PASSWORD));
          return true;
        })
        .reply(200, expectResult);
      const getGeneralSettingsResult = appModuleGuestSpace.getGeneralSettings(data.app, data.lang, isPreview);
      return getGeneralSettingsResult.then((rsp) => {
        expect(rsp).toMatchObject(expectResult);
      });
    });
    it(`[GeneralSetting-5]should get successfully the app general settings information with DEFAULT language without isPreview param
        in GUEST SPACE`, () => {
      const data = {
        'app': 1,
        'lang': 'default'
      };
      const expectResult = {
        'name': 'San Francisco Lunch Map',
        'description': 'A list of great places to go!',
        'icon': {
          'type': 'PRESET',
          'key': 'APP60'
        },
        'theme': 'WHITE',
        'revision': '24'
      };
      nock(URI)
        .get(`${GUEST_APP_SETTINGS_ROUTE}?app=${data.app}&lang=${data.lang}`)
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(common.getPasswordAuth(common.USERNAME, common.PASSWORD));
          return true;
        })
        .reply(200, expectResult);
      const getGeneralSettingsResult = appModuleGuestSpace.getGeneralSettings(data.app, data.lang);
      return getGeneralSettingsResult.then((rsp) => {
        expect(rsp).toMatchObject(expectResult);
      });
    });
  });

  describe('error case', () => {
    it('[GeneralSetting-2]should return error when use API token PRE-LIVE', () => {
      const data = {
        app: 1,
        lang: 'EN'
      };
      const isPreview = true;
      const expectResult = {
        'code': 'GAIA_NO01',
        'id': 'RIQcWU4VAOSt0SXMlcMp',
        'message': 'Using this API token, you cannot run the specified API.'
      };
      nock(URI)
        .get(`${APP_PREVIEW_SETTINGS_ROUTE}?app=${data.app}&lang=${data.lang}`)
        .matchHeader(common.API_TOKEN, (authHeader) => {
          expect(authHeader).toBe(authAPI.getApiToken());
          return true;
        })
        .reply(403, expectResult);
      const getGeneralSettingsResult = appModuleAPI.getGeneralSettings(data.app, data.lang, isPreview);
      return getGeneralSettingsResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    it('[GeneralSetting-10]should return error when input no PRE-LIVE appID', () => {
      const isPreview = true;
      const expectResult = {
        'code': 'CB_VA01',
        'id': 'GmKAGRS3J2dH3UdG0bsx',
        'message': 'Missing or invalid input.',
        'errors': {
          'app': {
            'messages': [
              'Required field.'
            ]
          }
        }
      };
      nock(URI)
        .get(`${APP_PREVIEW_SETTINGS_ROUTE}`)
        .reply(400, expectResult);
      const getGeneralSettingsResult = appModule.getGeneralSettings(undefined, undefined, isPreview);
      return getGeneralSettingsResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    it('[GeneralSetting-7-12]should return error when the PRE-LIVE appID is none exist', () => {
      const appID = 444444;
      const isPreview = true;
      const expectResult = {
        'code': 'GAIA_AP01',
        'id': 'K45k0CEPV5802MKyPcu1',
        'message': 'The app (ID: 444444) not found. The app may have been deleted.'
      };

      nock(URI)
        .get(`${APP_PREVIEW_SETTINGS_ROUTE}?app=${appID}`)
        .reply(404, expectResult);
      const getGeneralSettingsResult = appModule.getGeneralSettings(appID, undefined, isPreview);

      return getGeneralSettingsResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    it('[GeneralSetting-12]should return error when input the negative PRE-LIVE appID', () => {
      const appID = -1;
      const isPreview = true;
      const expectResult = {
        'code': 'CB_VA01',
        'id': 'G5MOiPwnRgN4x7VsQBzC',
        'message': 'Missing or invalid input.',
        'errors': {
          'app': {
            'messages': [
              'must be greater than or equal to 1'
            ]
          }
        }
      };
      nock(URI)
        .get(`${APP_PREVIEW_SETTINGS_ROUTE}?app=${appID}`)
        .reply(400, expectResult);
      const getGeneralSettingsResult = appModule.getGeneralSettings(appID, undefined, isPreview);

      return getGeneralSettingsResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    it('[GeneralSetting-12]should return error when input the zero PRE-LIVE appID', () => {
      const appID = 0;
      const isPreview = true;
      const expectResult = {
        'code': 'CB_VA01',
        'id': 'G5MOiPwnRgN4x7VsQBzC',
        'message': 'Missing or invalid input.',
        'errors': {
          'app': {
            'messages': [
              'must be greater than or equal to 1'
            ]
          }
        }
      };
      nock(URI)
        .get(`${APP_PREVIEW_SETTINGS_ROUTE}?app=${appID}`)
        .reply(404, expectResult);
      const getGeneralSettingsResult = appModule.getGeneralSettings(appID, undefined, isPreview);

      return getGeneralSettingsResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    it('[GeneralSetting-13]should return error when input the invalid PRE-LIVE language', () => {
      const data = {
        app: 1,
        lang: 'invalid'
      };
      const isPreview = true;
      const expectResult = {
        'code': 'CB_VA01',
        'id': 'G5MOiPwnRgN4x7VsQBzC',
        'message': 'Missing or invalid input.',
        'errors': {
          'app': {
            'messages': [
              'must be greater than or equal to 1'
            ]
          }
        }
      };
      nock(URI)
        .get(`${APP_PREVIEW_SETTINGS_ROUTE}?app=${data.app}&lang=${data.lang}`)
        .reply(400, expectResult);
      const getGeneralSettingsResult = appModule.getGeneralSettings(data.app, data.lang, isPreview);

      return getGeneralSettingsResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    it('[GeneralSetting-2]should return error when use API token PRE-LIVE in GUEST SPACE', () => {
      const data = {
        app: 1,
        lang: 'EN'
      };
      const isPreview = true;
      const expectResult = {
        'code': 'GAIA_NO01',
        'id': 'RIQcWU4VAOSt0SXMlcMp',
        'message': 'Using this API token, you cannot run the specified API.'
      };
      nock(URI)
        .get(`${GUEST_APP_PREVIEW_SETTINGS_ROUTE}?app=${data.app}&lang=${data.lang}`)
        .matchHeader(common.API_TOKEN, (authHeader) => {
          expect(authHeader).toBe(authAPI.getApiToken());
          return true;
        })
        .reply(403, expectResult);
      const getGeneralSettingsResult = appModuleAPIGuestSpace.getGeneralSettings(data.app, data.lang, isPreview);

      return getGeneralSettingsResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    it('[GeneralSetting-10]should return error when input no PRE-LIVE appID in GUEST SPACE', () => {
      const isPreview = true;
      const expectResult = {
        'code': 'CB_VA01',
        'id': 'GmKAGRS3J2dH3UdG0bsx',
        'message': 'Missing or invalid input.',
        'errors': {
          'app': {
            'messages': [
              'Required field.'
            ]
          }
        }
      };
      nock(URI)
        .get(`${GUEST_APP_PREVIEW_SETTINGS_ROUTE}`)
        .reply(400, expectResult);
      const getGeneralSettingsResult = appModuleGuestSpace.getGeneralSettings(undefined, undefined, isPreview);

      return getGeneralSettingsResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    it('[GeneralSetting-7-12]should return error when the PRE-LIVE appID is none exist in GUEST SPACE', () => {
      const appID = 444444;
      const isPreview = true;
      const expectResult = {
        'code': 'GAIA_AP01',
        'id': 'K45k0CEPV5802MKyPcu1',
        'message': 'The app (ID: 444444) not found. The app may have been deleted.'
      };
      nock(URI)
        .get(`${GUEST_APP_PREVIEW_SETTINGS_ROUTE}?app=${appID}`)
        .reply(404, expectResult);
      const getGeneralSettingsResult = appModuleGuestSpace.getGeneralSettings(appID, undefined, isPreview);

      return getGeneralSettingsResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    it('[GeneralSetting-12]should return error when input the negative PRE-LIVE appID in GUEST SPACE', () => {
      const appID = -1;
      const isPreview = true;
      const expectResult = {
        'code': 'CB_VA01',
        'id': 'G5MOiPwnRgN4x7VsQBzC',
        'message': 'Missing or invalid input.',
        'errors': {
          'app': {
            'messages': [
              'must be greater than or equal to 1'
            ]
          }
        }
      };
      nock(URI)
        .get(`${GUEST_APP_PREVIEW_SETTINGS_ROUTE}?app=${appID}`)
        .reply(400, expectResult);
      const getGeneralSettingsResult = appModuleGuestSpace.getGeneralSettings(appID, undefined, isPreview);

      return getGeneralSettingsResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    it('[GeneralSetting-12]should return error when input the zero PRE-LIVE appID in GUEST SPACE', () => {
      const appID = 0;
      const isPreview = true;
      const expectResult = {
        'code': 'CB_VA01',
        'id': 'G5MOiPwnRgN4x7VsQBzC',
        'message': 'Missing or invalid input.',
        'errors': {
          'app': {
            'messages': [
              'must be greater than or equal to 1'
            ]
          }
        }
      };
      nock(URI)
        .get(`${GUEST_APP_PREVIEW_SETTINGS_ROUTE}?app=${appID}`)
        .reply(404, expectResult);
      const getGeneralSettingsResult = appModuleGuestSpace.getGeneralSettings(appID, undefined, isPreview);

      return getGeneralSettingsResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    it('[GeneralSetting-13]should return error when input the invalid PRE-LIVE language in GUEST SPACE', () => {
      const data = {
        app: 1,
        lang: 'invalid'
      };
      const isPreview = true;
      const expectResult = {
        'code': 'CB_VA01',
        'id': 'G5MOiPwnRgN4x7VsQBzC',
        'message': 'Missing or invalid input.',
        'errors': {
          'app': {
            'messages': [
              'must be greater than or equal to 1'
            ]
          }
        }
      };
      nock(URI)
        .get(`${GUEST_APP_PREVIEW_SETTINGS_ROUTE}?app=${data.app}&lang=${data.lang}`)
        .reply(400, expectResult);
      const getGeneralSettingsResult = appModuleGuestSpace.getGeneralSettings(data.app, data.lang, isPreview);

      return getGeneralSettingsResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    it('[GeneralSetting-15]should return error permission deny PRE-LIVE in GUEST SPACE', () => {
      const data = {
        'app': 1,
        'lang': 'en'
      };
      const isPreview = true;

      const expectResult = {
        'code': 'CB_NO02',
        'id': 'FHQHE7Q3MtXFOIe2QslJ',
        'message': 'No privilege to proceed.',
        'errors': '{}'
      };
      nock(URI)
        .get(`${GUEST_APP_PREVIEW_SETTINGS_ROUTE}?app=${data.app}&lang=${data.lang}`)
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(common.getPasswordAuth(common.USERNAME, common.PASSWORD));
          return true;
        })
        .reply(403, expectResult);
      const getGeneralSettingsResult = appModuleGuestSpace.getGeneralSettings(data.app, data.lang, isPreview);
      return getGeneralSettingsResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    it('[GeneralSetting-2]should return error when use API token', () => {
      const data = {
        app: 1,
        lang: 'EN'
      };
      const isPreview = false;
      const expectResult = {
        'code': 'GAIA_NO01',
        'id': 'RIQcWU4VAOSt0SXMlcMp',
        'message': 'Using this API token, you cannot run the specified API.'
      };
      nock(URI)
        .get(`${APP_SETTINGS_ROUTE}?app=${data.app}&lang=${data.lang}`)
        .matchHeader(common.API_TOKEN, (authHeader) => {
          expect(authHeader).toBe(authAPI.getApiToken());
          return true;
        })
        .reply(403, expectResult);
      const getGeneralSettingsResult = appModuleAPI.getGeneralSettings(data.app, data.lang, isPreview);

      return getGeneralSettingsResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    it('[GeneralSetting-10]should return error when input no appID', () => {
      const expectResult = {
        'code': 'CB_VA01',
        'id': 'GmKAGRS3J2dH3UdG0bsx',
        'message': 'Missing or invalid input.',
        'errors': {
          'app': {
            'messages': [
              'Required field.'
            ]
          }
        }
      };
      nock(URI)
        .get(`${APP_SETTINGS_ROUTE}`)
        .reply(400, expectResult);
      const getGeneralSettingsResult = appModule.getGeneralSettings(undefined);

      return getGeneralSettingsResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    it('[GeneralSetting-12]should return error when the appID is none exist', () => {
      const appID = 444444;
      const isPreview = false;
      const expectResult = {
        'code': 'CB_VA01',
        'id': 'gR0woWPqBAIUpgxe98J4',
        'message': 'Missing or invalid input.',
        'errors': {
          'app': {
            'messages': [
              'Required field.'
            ]
          }
        }
      };
      nock(URI)
        .get(`${APP_SETTINGS_ROUTE}?app=${appID}`)
        .reply(404, expectResult);
      const getGeneralSettingsResult = appModule.getGeneralSettings(appID, undefined, isPreview);

      return getGeneralSettingsResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    it('[GeneralSetting-12]should return error when input the negative appID', () => {
      const appID = -1;
      const isPreview = false;
      const expectResult = {
        'code': 'CB_VA01',
        'id': 'G5MOiPwnRgN4x7VsQBzC',
        'message': 'Missing or invalid input.',
        'errors': {
          'app': {
            'messages': [
              'must be greater than or equal to 1'
            ]
          }
        }
      };
      nock(URI)
        .get(`${APP_SETTINGS_ROUTE}?app=${appID}`)
        .reply(400, expectResult);
      const getGeneralSettingsResult = appModule.getGeneralSettings(appID, undefined, isPreview);

      return getGeneralSettingsResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    it('[GeneralSetting-12]should return error when input the zero appID', () => {
      const appID = 0;
      const isPreview = false;
      const expectResult = {
        'code': 'CB_VA01',
        'id': 'G5MOiPwnRgN4x7VsQBzC',
        'message': 'Missing or invalid input.',
        'errors': {
          'app': {
            'messages': [
              'must be greater than or equal to 1'
            ]
          }
        }
      };
      nock(URI)
        .get(`${APP_SETTINGS_ROUTE}?app=${appID}`)
        .reply(400, expectResult);
      const getGeneralSettingsResult = appModule.getGeneralSettings(appID, undefined, isPreview);

      return getGeneralSettingsResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    it('[GeneralSetting-13]should return error when input the invalid language', () => {
      const data = {
        app: 1,
        lang: 'invalid'
      };
      const isPreview = false;
      const expectResult = {
        'code': 'CB_VA01',
        'id': 'G5MOiPwnRgN4x7VsQBzC',
        'message': 'Missing or invalid input.',
        'errors': {
          'app': {
            'messages': [
              'must be greater than or equal to 1'
            ]
          }
        }
      };
      nock(URI)
        .get(`${APP_SETTINGS_ROUTE}?app=${data.app}&lang=${data.lang}`)
        .reply(400, expectResult);
      const getGeneralSettingsResult = appModule.getGeneralSettings(data.app, data.lang, isPreview);
      return getGeneralSettingsResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    it('[GeneralSetting-2]should return error when use API token without isPreview param', () => {
      const data = {
        app: 1,
        lang: 'EN'
      };
      const expectResult = {
        'code': 'GAIA_NO01',
        'id': 'RIQcWU4VAOSt0SXMlcMp',
        'message': 'Using this API token, you cannot run the specified API.'
      };
      nock(URI)
        .get(`${APP_SETTINGS_ROUTE}?app=${data.app}&lang=${data.lang}`)
        .matchHeader(common.API_TOKEN, (authHeader) => {
          expect(authHeader).toBe(authAPI.getApiToken());
          return true;
        })
        .reply(403, expectResult);
      const getGeneralSettingsResult = appModuleAPI.getGeneralSettings(data.app, data.lang);

      return getGeneralSettingsResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
    it('[GeneralSetting-14]should return error permission deny in GUEST SPACE', () => {
      const data = {
        'app': 1,
        'lang': 'en'
      };
      const isPreview = false;
      const expectResult = {
        'code': 'CB_NO02',
        'id': 'FHQHE7Q3MtXFOIe2QslJ',
        'message': 'No privilege to proceed.'
      };
      nock(URI)
        .get(`${GUEST_APP_SETTINGS_ROUTE}?app=${data.app}&lang=${data.lang}`)
        .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
          expect(authHeader).toBe(common.getPasswordAuth(common.USERNAME, common.PASSWORD));
          return true;
        })
        .reply(403, expectResult);
      const getGeneralSettingsResult = appModuleGuestSpace.getGeneralSettings(data.app, data.lang, isPreview);
      return getGeneralSettingsResult.catch((err) => {
        expect(err).toBeInstanceOf(KintoneAPIException);
        expect(err.get()).toMatchObject(expectResult);
      });
    });
  });
});
