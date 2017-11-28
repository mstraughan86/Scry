const mongoose = require('../utilities/mongoose.js');

// This was to initialize MongoDB in a separate process in order to facilitate
// proper database functionality.
// This appears to be deprecated, as proper shutdown timing avoids this need.
const main = () => {
  mongoose.initialize();
};

main();