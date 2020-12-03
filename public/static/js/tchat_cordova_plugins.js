try {
  if(navigator.userAgent.includes('teamwork')){
    cordova.define("cordova/plugin_list", function(require, exports, module) {
      module.exports = [];
      module.exports.metadata =
        // TOP OF METADATA
        {};
      // BOTTOM OF METADATA
    });
    var moniterViewAppear = () => {};
  }
} catch (error) {}
