/**
 * AddPreviewAppRequest model
 */
class AddPreviewAppRequest {
  /**
     * constructor for AddPreviewAppRequest
     * @param {integer} appID
     * @param {HashTable<String, FieldValue>} recordHashTableData
     */
  constructor(name, space, thread) {
    this.name = name;
    this.space = space;
    this.thread = thread;
  }
  /**
     * Get app name
     * @return {String}
     */
  getAppName() {
    return this.name;
  }
  /**
     * Set app name
     * @return {this} AddPreviewAppRequest
     */
  setAppName(name) {
    this.name = name;
    return this;
  }
  /**
     * Get space of app
     * @return {String}
     */
  getSpace() {
    return this.space;
  }
  /**
     * Set space of app
     * @return {this} AddPreviewAppRequest
     */
  setSpace(space) {
    this.space = space;
    return this;
  }
  /**
     * Get thread
     * @return {String}
     */
  getThread() {
    return this.thread;
  }
  /**
     * Set Thread of app
     * @return {this} AddPreviewAppRequest
     */
  setThread(thread) {
    this.thread = thread;
    return this;
  }
  /**
     * Get JSON struct of this model
     * @return {JSON}
     */
  toJSON() {
    return {
      name: this.getAppName(),
      space: this.getSpace(),
      thread: this.getThread(),
    };
  }
  /**
     * Convert this model to JSON string
     * @return {String}
     */
  toJSONString() {
    return JSON.stringify(this.toJSON());
  }
}
module.exports = AddPreviewAppRequest;
