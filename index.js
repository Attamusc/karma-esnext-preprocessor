var esnext = require('esnext');

var createEsnextPreprocessor = function(args, config, logger, helper) {
  config = config || {};

  var log = logger.create('preprocessor.esnext');
  var options = helper.merge({}, args.options || {}, config.options || {});

  return function(content, file, done) {
    var code;
    log.debug('Processing "%s"', file.originalPath);

    try {
      code = esnext.compile(content, options).code;
      done(null, code);
    } catch(e) {
      log.error(e);
      done(e, null);
    }
  };
};

createEsnextPreprocessor.$inject = ['args', 'config.esnextPreprocessor', 'logger', 'helper'];

module.exports = {
  'preprocessor:esnext': ['factory', createEsnextPreprocessor]
};
