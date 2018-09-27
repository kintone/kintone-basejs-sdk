const RecordUpdateItem = require('./RecordUpdateItem');

/**
 * UpdateRecordRequest model
 */
class UpdateRecordRequest extends RecordUpdateItem {
  /**
     * @param {String} appID
     */
  constructor(appID) {
    super();
    this.app = appID;
  }
  /**
     * Get JSON struct of this model
     * @return {JSON}
     */
  toJSON() {
    const data = super.toJSON();
    data.app = this.app;
    return data;
  }
  /**
     * Convert this model to JSON string
     * @return {String}
     */
  toJSONString() {
    return JSON.stringify(this.toJSON());
  }
}
module.exports = UpdateRecordRequest;
