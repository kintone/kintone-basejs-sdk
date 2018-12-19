/**
 * kintone api - nodejs client
 */

const AUTH_CONST = require('./constant');
const KintoneCredential = require('../model/authentication/credential');
const KintoneHTTPHeader = require('../model/http/httpHeader');

let basicAuth = new WeakMap();
let passwordAuth = new WeakMap();
let apiToken = new WeakMap();
let accessToken = new WeakMap();
/**
 * Authentication module
 */
class Auth {
    /**
     * setBasicAuth
     * @param {String} username
     * @param {String} password
     * @return {this}
     */
    setBasicAuth(username, password) {
        basicAuth.set(this, new KintoneCredential(username, password));
        return this;
    }

    /**
     * getBasicAuth
     * @return {KintoneCredential}
     */
    getBasicAuth() {
        return basicAuth.get(this);
    }

    /**
     * setPasswordAuth
     * @param {String} username
     * @param {String} password
     * @return {this}
     */
    setPasswordAuth(username, password) {
        passwordAuth.set(this, new KintoneCredential(username, password));
        return this;
    }

    /**
     * getPasswordAuth
     * @return {KintoneCredential}
     */
    getPasswordAuth() {
        return passwordAuth.get(this);
    }

    /**
     * setApiToken
     * @param {String} apiTokenString
     * @return {this}
     */
    setApiToken(apiTokenString) {
        apiToken.set(this, apiTokenString);
        return this;
    }

    /**
     * getApiToken
     * @return {String}
     */
    getApiToken() {
        return apiToken.get(this);
    }

    /**
     * setAccessToken
     * @param {String} accessTokenString
     * @return {this}
     */
    setAccessToken(accessTokenString) {
        accessToken.set(this, accessTokenString);
        return this;
    }

    /**
     * getAccessToken
     * @return {String}
     */
    getAccessToken() {
        return accessToken.get(this);
    }

    /**
     * createHeaderCredentials
     * @return {Array<HTTPHeader>}
     */
    createHeaderCredentials() {
        let headerCredentials = [];
        if (accessToken.get(this)) {
            headerCredentials.push(new KintoneHTTPHeader(
                AUTH_CONST.HEADER_KEY_AUTH_BASIC,
                'Bearer ' + accessToken.get(this)));
        }
        if (apiToken.get(this)) {
            headerCredentials.push(new KintoneHTTPHeader(
                AUTH_CONST.HEADER_KEY_AUTH_APITOKEN, apiToken.get(this)));
        }
        if (basicAuth.get(this)) {
            headerCredentials.push(new KintoneHTTPHeader(
                AUTH_CONST.HEADER_KEY_AUTH_BASIC,
                'Basic ' + (new Buffer(
                    basicAuth.get(this).getUsername() +
                    ':' + basicAuth.get(this).getPassword()).toString('base64'))
            ));
        }
        if (passwordAuth.get(this)) {
            headerCredentials.push(new KintoneHTTPHeader(
                AUTH_CONST.HEADER_KEY_AUTH_PASSWORD,
                new Buffer(
                    passwordAuth.get(this).getUsername() +
                    ':' +
                    passwordAuth.get(this).getPassword()).toString('base64')
            ));
        }
        return headerCredentials;
    }
}

module.exports = Auth;
