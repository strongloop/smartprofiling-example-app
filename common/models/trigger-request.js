module.exports = function(TriggerRequest) {

  TriggerRequest.trigger = function(timeout, count, cb) {
    var now = new Date();
    var then = new Date(now.getTime() + timeout);

    while (now < then) {
      now = new Date();
    }

    cb(null, 'timeout ' + timeout + ', count ' + count);

    return true;
  };

  TriggerRequest.remoteMethod('trigger', {
    accepts: [
      { arg: 'timeout', type: 'number' },
      { arg: 'count', type: 'number' }
    ],
    returns: {
      arg: 'msg', type: 'string'
    }
  });

};
