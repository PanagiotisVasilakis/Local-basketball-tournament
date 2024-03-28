const app = require('./app');

let port = process.env.PORT || '3030';

const server = app.listen(port, () => { console.log("Listening to port " + port) });
