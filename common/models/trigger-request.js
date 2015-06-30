module.exports = function(TriggerRequest) {

  function doWork(seed) {
    return seed + 1;
  }

  TriggerRequest.trigger = function(timeout, count, cb) {
    var now = new Date();
    var then = new Date(now.getTime() + timeout);
    var seed = 0;

    while (now < then) {
      now = new Date();
      seed = doWork(seed);
    }

    cb(null, {
      workAmount: seed
    });

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
