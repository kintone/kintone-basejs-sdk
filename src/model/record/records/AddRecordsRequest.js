/**
 * AddRecordsRequest model
 */
class AddRecordsRequest {
  /**
     * @param {Integer} appID
     */
  constructor(appID) {
    this.app = appID;
    this.records = [];
  }
  /**
     * @return {Integer} appID
     */
  getAppID() {
    return this.app;
  }
  /**
     * Add record item to execute the add multi records function
     * @param {Record} record
     * @return {this} AddRecordsRequest
     */
  addRecord(record) {
    this.records.push(record);
    return this;
  }
  /**
     * @param {Array<Record>} recordsData
     * @return {this} AddRecordsRequest
     */
  setRecords(recordsData) {
    this.records = recordsData;
    return this;
  }
  /**
     * @return {Array<Record>} Records
     */
  getRecordsData() {
    return this.records;
  }
  /**
     * Get JSON struct of this model
     * @return {JSON}
     */
  toJSON() {
    return {
      app: this.getAppID(),
      records: this.getRecordsData(),
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
module.exports = AddRecordsRequest;
