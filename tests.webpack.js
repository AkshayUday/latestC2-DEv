let context = require.context('./src/test', true, /.test\.js$/);
context.keys().forEach(context);
