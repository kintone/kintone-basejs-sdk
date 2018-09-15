
/**
 * kintone api - nodejs client
 * test app module
 */
const nock = require('nock');

const common = require('../../utils/common');

const KintoneAPIException = require('../../../src/exception/KintoneAPIException');
const Connection = require('../../../src/connection/Connection');
const Auth = require('../../../src/authentication/Auth');
const App = require('../../../src/module/app/App');

const URI = 'https://' + common.DOMAIN;

const auth = new Auth();
auth.setPasswordAuth(common.USERNAME, common.PASSWORD);

const conn = new Connection(common.DOMAIN, auth);

const appModule = new App(conn);

describe('getViews function', () => {
  describe('common function', () => {
    it('should return promise', () => {
      nock(URI)
        .get('/k/v1/app/views.json')
        .reply(200, {});

      const getViewsResult = appModule.getViews();
      expect(getViewsResult).toHaveProperty('then');
      expect(getViewsResult).toHaveProperty('catch');
    });
  });

  describe('success case', () => {
    describe('Valid request', () => {
      it('should get successfully the app views information', () => {
        const data = {
          'app': 1,
          'lang': 'en'
        };
        const isPreview = true;

        const expectResult = {
          'views': {
            'View1': {
              'type': 'LIST',
              'name': 'View1',
              'id': '20733',
              'filterCond': 'Date_2 > LAST_WEEK()',
              'sort': 'Record_number asc',
              'index': '1',
              'fields': ['Record_number', 'Author']
            }
          }
        };
        nock(URI)
          .get('/k/v1/preview/app/views.json', (rqBody) => {
            expect(rqBody).toMatchObject(data);
            return true;
          })
          .matchHeader(common.PASSWORD_AUTH, (authHeader) => {
            expect(authHeader).toBe(common.getPasswordAuth(common.USERNAME, common.PASSWORD));
            return true;
          })
          .matchHeader('Content-Type', (type) => {
            expect(type).toBe('application/json');
            return true;
          })
          .reply(200, expectResult);
        const getViewsResult = appModule.getViews(data.app, data.lang, isPreview);
        return getViewsResult.then((rsp) => {
          expect(rsp).toMatchObject(expectResult);
        });
      });
    });
    /**
     * Todo: Implement another success case
     */
  });

  describe('error case', () => {
    describe('Invalid request', () => {
      it('should return error when the appID is unexist', () => {
        const appID = '444444';
        const expectResult = {
          'code': 'GAIA_AP01',
          'id': 'K45k0CEPV5802MKyPcu1',
          'message': 'The app (ID: 444444) not found. The app may have been deleted.'
        };

        nock(URI)
          .get('/k/v1/app/views.json', (rqBody) => {
            expect(rqBody.app).toEqual(appID);
            return true;
          })
          .reply(404, expectResult);
        const getViewsResult = appModule.getViews(appID);
        return getViewsResult.catch((err) => {
          expect(err).toBeInstanceOf(KintoneAPIException);
          expect(err.get()).toMatchObject(expectResult);
        });
      });
    });
  });

  /**
     * Todo: Implement another error case
     */
});
