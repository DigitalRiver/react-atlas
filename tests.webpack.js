var context = require.context('./components', true, /(.spec\.cjs?|.spec\.js?)$/);
context.keys().forEach(context);
