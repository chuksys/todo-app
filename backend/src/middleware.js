
function requestLogger(req, res, next) {
    res.once('finish', () => {
      const log = [req.method, req.path];
      if (req.body && Object.keys(req.body).length > 0) {
        log.push(JSON.stringify(req.body));
      }
      log.push('->', res.statusCode);
      console.log(log.join(' '));
    });
    next();
}

module.exports = {
    requestLogger
}