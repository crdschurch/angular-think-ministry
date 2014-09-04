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

ngThinkMinistry.factory('thinkMinistry', function(ThinkMinistry, $http, $q) {
  var encode = require('think-ministry/transform-request'),
      decode = require('think-ministry/transform-response');

  return {
    get: function(path) {
      var url = ThinkMinistry.baseUrl + path,
          deferred = $q.defer();

      $http.get(url).success(function(data) {
        deferred.resolve(decode(data));
      }).error(function(data) {
        deferred.reject(data);
      });

      return deferred.promise;
    },

    post: function(path, obj) {
      var url = ThinkMinistry.baseUrl + path,
          headers = { 'Content-Type': 'application/json' },
          data = encode(obj),
          deferred = $q.defer();

      $http.post(url, JSON.stringify(data), headers).success(function() {
        deferred.resolve();
      }).error(function() {
        deferred.reject();
      });

      return deferred.promise;
    }
  }
});
