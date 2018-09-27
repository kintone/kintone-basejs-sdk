/**
 * UpdateGeneralSettingsRequest model
 */
class UpdateGeneralSettingsRequest {
  /**
     * @param {Integer} app
     * @param {GeneralSettings } generalSettings
     * @param {Integer} revision
     */
  constructor(app, generalSettings, revision) {
    this.app = app;
    this.generalSettings = generalSettings;
    this.revision = revision;
  }
  /**
     * Get JSON struct of this model
     * @return {JSON}
     */
  toJSON() {
    const data = this.generalSettings ? this.generalSettings : {};
    data.app = this.app;
    data.revision = this.revision;
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
module.exports = UpdateGeneralSettingsRequest;
