// Generated by CoffeeScript 1.3.3

/*
  knockback_statistics.js
  (c) 2012 Kevin Malakoff.
  Knockback.Stats is freely distributable under the MIT license.
  See the following for full license details:
    https://github.com/kmalakoff/knockback/blob/master/LICENSE
*/


(function() {
  var kb, _;

  if (typeof require !== 'undefined') {
    _ = require('underscore');
  } else {
    _ = window._;
  }

  if (_ && (_.hasOwnProperty('_'))) {
    _ = _._;
  }

  kb = !window.kb && (typeof require !== 'undefined') ? require('knockback') : window.kb;

  kb.Statistics = (function() {

    function Statistics() {
      this.type_trackers = {};
      this.events = [];
    }

    Statistics.prototype.typeTracker = function(type) {
      var type_tracker;
      if (this.type_trackers.hasOwnProperty(type)) {
        return this.type_trackers[type];
      }
      type_tracker = [];
      this.type_trackers[type] = type_tracker;
      return type_tracker;
    };

    Statistics.prototype.addEvent = function(event) {
      return this.events.push(event);
    };

    Statistics.prototype.register = function(obj) {
      return this.typeTracker(obj.constructor.name).push(obj);
    };

    Statistics.prototype.unregister = function(obj) {
      var index, type_tracker;
      type_tracker = this.typeTracker(obj.constructor.name);
      index = _.indexOf(type_tracker, obj);
      if (index < 0) {
        throw "failed to unregister type: " + obj.constructor.name;
      }
      return type_tracker.splice(index, 1);
    };

    Statistics.prototype.registeredCount = function(type) {
      var count, type_tracker, _ref;
      if (type) {
        return this.typeTracker(type).length;
      }
      count = 0;
      _ref = this.type_trackers[type];
      for (type in _ref) {
        type_tracker = _ref[type];
        count += type_tracker.length;
      }
      return count;
    };

    Statistics.prototype.registeredTypeStatsString = function(success_message) {
      var string, type, type_tracker, written, _ref;
      string = '';
      _ref = this.type_trackers;
      for (type in _ref) {
        type_tracker = _ref[type];
        if (!type_tracker.length) {
          continue;
        }
        if (written) {
          string += ' | ';
        }
        string += "" + type + ": " + type_tracker.length;
        written = true;
      }
      if (string) {
        return string;
      } else {
        return success_message;
      }
    };

    return Statistics;

  })();

}).call(this);
