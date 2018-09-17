
/**
 * kintone api - nodejs client
 * test record module
 */
const nock = require('nock');

const common = require('../../utils/common');

const KintoneAPIException = require('../../../src/exception/KintoneAPIException');
const Connection = require('../../../src/connection/Connection');
const Auth = require('../../../src/authentication/Auth');
const Record = require('../../../src/module/record/Record');

const auth = new Auth();
auth.setPasswordAuth(common.USERNAME, common.PASSWORD);

const conn = new Connection(common.DOMAIN, auth);


const recordModule = new Record(conn);

describe('deleteRecordsWithRevision function', () => {
  describe('common case', () => {
    it('should return the promise', () => {
      const data = {
        appID: 1,
        idsWithRevision: {
          1: 1,
          2: 1
        }
      };
      nock('https://' + common.DOMAIN)
        .intercept('/k/v1/records.json', 'DELETE')
        .reply(200, {});
      const deleteRecordsWithRevisionResult = recordModule.deleteRecordsWithRevision(data.appID, data.idsWithRevision);
      expect(deleteRecordsWithRevisionResult).toHaveProperty('then');
      expect(deleteRecordsWithRevisionResult).toHaveProperty('catch');
    });
  });

  describe('success case', () => {
    describe('Multiple delete', () => {
      it('should delete successfully the records', () => {
        const data = {
          appID: 1,
          idsWithRevision: {
            '1': 1,
            '2': 4
          }
        };

        const expectBody =
        {
          'app': 1,
          'ids': ['1', '2'],
          'revisions': [1, 4]
        };


        nock('https://' + common.DOMAIN)
          .intercept('/k/v1/records.json', 'DELETE', (rqBody) => {
            expect(rqBody).toMatchObject(expectBody);
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
          .reply(200, {});

        const deleteRecordsWithRevisionResult = recordModule.deleteRecordsWithRevision(data.appID, data.idsWithRevision);
        return deleteRecordsWithRevisionResult.then((rsp) => {
          expect(rsp).toEqual({});
        });
      });
    });
    /**
    * Todo: implement another success case
    */
  });

  describe('error case', () => {
    describe('Invalid id', () => {
      it('should return an error when the record id is unexist', () => {
        const data = {
          appID: 1,
          idsWithRevision: {
            2: 4,
            4444: 1
          }
        };

        const expectBody =
        {
          'app': 1,
          'ids': ['2', '4444'],
          'revisions': [4, 1]
        };
        const expectResult = {'code': 'GAIA_RE01', 'id': 'IBcz0R6tmn0b06i88cdt', 'message': 'The specified record (ID: 4444) is not found.'};

        nock('https://' + common.DOMAIN)
          .intercept('/k/v1/records.json', 'DELETE', (rqBody) => {
            expect(rqBody).toMatchObject(expectBody);
            return true;
          })
          .reply(404, expectResult);

        const deleteRecordsWithRevisionResult = recordModule.deleteRecordsWithRevision(data.appID, data.idsWithRevision);
        return deleteRecordsWithRevisionResult.catch((err) => {
          expect(err).toBeInstanceOf(KintoneAPIException);
          expect(err.get()).toMatchObject(expectResult);
        });
      });
    });
    /**
    * Todo: implement another error case
    */
  });
});
