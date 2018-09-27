/**
 * kintone api - nodejs client
 * test record module
 */
const nock = require('nock');
const common = require('../../utils/common');
const {
  Connection,
  Auth,
  Record
} = require(common.MAIN_PATH);
const auth = new Auth().setPasswordAuth(common.USERNAME, common.PASSWORD);
const conn = new Connection(common.DOMAIN, auth);
if (common.hasOwnProperty('proxy') && common.proxy) {
  conn.addRequestOption('proxy', common.proxy);
}

const URI = 'https://' + common.DOMAIN;
const ROUTE = '/k/v1/record/comment.json';
const recordModule = new Record(conn);

describe('deleteComment function', () => {
  describe('common cases', () => {
    it('should return a promise', () => {
      nock(URI)
        .intercept(ROUTE, 'DELETE')
        .reply(200, {});

      const actualResult = recordModule.deleteComment();
      expect(actualResult).toHaveProperty('then');
      expect(actualResult).toHaveProperty('catch');
    });
  });

  describe('success cases', () => {
    it('[RecordModule-256] should delete comment with valid appId, recordId, commentId', () => {
      const data = {
        app: 1,
        record: 1,
        comment: 1
      };

      nock(URI)
        .intercept(ROUTE, 'DELETE', reqBody => {
          expect(reqBody).toHaveProperty('app');
          return true;
        })
        .matchHeader(common.PASSWORD_AUTH, authHeader => {
          expect(authHeader).toBe(
            common.getPasswordAuth(common.USERNAME, common.PASSWORD)
          );
          return true;
        })
        .reply(200, {});

      const actualResult = recordModule.deleteComment(
        data.app,
        data.record,
        data.comment
      );
      return actualResult.then(response => {
        expect(response).toMatchObject({});
      });
    });
  });

  describe('error cases', () => {
    describe('invalid comment id', () => {
      it('[RecordModule-257] should return error when the comment is invalid', () => {
        const data = {
          app: 1,
          record: 1,
          comment: 444
        };
        const expectedResult = {
          code: 'GAIA_RE02',
          id: '3wYeQRwubqOzNISfmYSZ',
          message:
            '指定したコメントが存在しません。削除された可能性があります。'
        };
        nock(URI)
          .intercept(ROUTE, 'DELETE', reqBody => {
            expect(reqBody).toMatchObject(data);
            return true;
          })
          .reply(520, expectedResult);

        const actualResult = recordModule.deleteComment(
          data.app,
          data.record,
          data.comment
        );
        return actualResult.catch(err => {
          expect(err.get()).toMatchObject(expectedResult);
        });
      });
    });

    it('[RecordModule-261] should return an error when using invalid appId', () => {
      const data = {app: -1, record: 2, comment: 3};
      const expectedResult = {};
      nock(URI)
        .delete(ROUTE, reqBody => {
          expect(reqBody).toHaveProperty('app');
          expect(reqBody.app).toBeLessThan(0);
          return true;
        })
        .reply(400, expectedResult);
      const actualResult = recordModule.deleteComment(
        data.app,
        data.record,
        data.comment
      );
      return actualResult.catch(err => {
        expect(err.get()).toMatchObject(expectedResult);
      });
    });

    it('[RecordModule-262] should return an error when using invalid recordId', () => {
      const data = {app: 1, record: -2, comment: 3};
      const expectedResult = {};
      nock(URI)
        .delete(ROUTE, reqBody => {
          expect(reqBody).toHaveProperty('app');
          expect(reqBody.record).toBeLessThan(0);
          return true;
        })
        .reply(400, expectedResult);
      const actualResult = recordModule.deleteComment(
        data.app,
        data.record,
        data.comment
      );
      return actualResult.catch(err => {
        expect(err.get()).toMatchObject(expectedResult);
      });
    });

    it('[RecordModule-263] should return an error when missing appId', () => {
      const data = {app: undefined, record: 2, comment: 3};
      const expectedResult = {
        code: 'CB_VA01',
        id: 'C0eMANZsPODsEVCLteRZ',
        message: '入力内容が正しくありません。',
        errors: {
          app: {
            messages: ['必須です。']
          }
        }
      };
      nock(URI)
        .delete(ROUTE, reqBody => {
          expect(reqBody).not.toHaveProperty('app');
          return true;
        })
        .reply(400, expectedResult);
      const actualResult = recordModule.deleteComment(
        data.app,
        data.record,
        data.comment
      );
      return actualResult.catch(err => {
        expect(err.get()).toMatchObject(expectedResult);
      });
    });

    it('[RecordModule-264] should return an error when missing recordId', () => {
      const data = {app: 1, record: undefined, comment: 3};
      const expectedResult = {
        code: 'CB_VA01',
        id: 'HLJWkVzILtZtArvWrTxk',
        message: '入力内容が正しくありません。',
        errors: {
          record: {
            messages: ['必須です。']
          }
        }
      };
      nock(URI)
        .delete(ROUTE, reqBody => {
          expect(reqBody).not.toHaveProperty('record');
          return true;
        })
        .reply(400, expectedResult);
      const actualResult = recordModule.deleteComment(
        data.app,
        data.record,
        data.comment
      );
      return actualResult.catch(err => {
        expect(err.get()).toMatchObject(expectedResult);
      });
    });

    it('[RecordModule-265] should return an error when missing commentId', () => {
      const data = {app: 1, record: 2, comment: undefined};
      const expectedResult = {
        code: 'CB_VA01',
        id: '59WMdpRoaC9Z6N5Hy1xe',
        message: '入力内容が正しくありません。',
        errors: {
          comment: {
            messages: ['必須です。']
          }
        }
      };
      nock(URI)
        .delete(ROUTE, reqBody => {
          expect(reqBody).not.toHaveProperty('comment');
          return true;
        })
        .reply(400, expectedResult);
      const actualResult = recordModule.deleteComment(
        data.app,
        data.record,
        data.comment
      );
      return actualResult.catch(err => {
        expect(err.get()).toMatchObject(expectedResult);
      });
    });
  });
});
