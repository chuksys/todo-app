const http = require('http');

async function main(app, database) {
    const port = Number(process.env.PORT || '3001');
    app.set('port', port);
  
    try {
      await database.connect();
      console.log('connected to database');
    } catch (error) {
      onError(error);
    }

    const server = http.createServer(app);
    server.listen(port);

    require('./api')
  
    server.on('error', onError);
  
    server.on('listening', () => {
      const addr = server.address();
      const bind = typeof addr === 'string'
        ? `pipe ${addr}`
        : `port ${addr.port}`;
      console.log(`Listening on ${bind}`);
    });

    return server;
  }

  function onError(error) {
    console.error(`Failed to start server:\n${error.stack}`);
    process.exit(1);
  }
  
  module.exports = main
  
