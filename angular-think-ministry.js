var ngThinkMinistry = angular.module('ngThinkMinistry', []);

ngThinkMinistry.provider('ThinkMinistry', function() {
  this.baseUrl = null;

  this.$get = function() {
    var _this = this;

    return {
      baseUrl: _this.baseUrl
    }
  };
});

ngThinkMinistry.factory('thinkMinistry', function(ThinkMinistry, $http) {
  var encode = require('think-ministry/transform-request');

  return {
    post: function(path, obj) {
      var url = ThinkMinistry.baseUrl + path,
          headers = { 'Content-Type': 'application/json' },
          data = encode(obj);

      $http.post(url, JSON.stringify(data), headers);
    }
  }
});
