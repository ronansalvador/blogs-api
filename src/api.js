const express = require('express');
const routes = require('./routes');
require('express-async-errors');

// ...

const app = express();

app.use(express.json());

app.use('/login', routes.loginRoute);
app.use('/user', routes.userRoute);
app.use('/categories', routes.categoriesRoute);

app.use((err, _req, res, _next) => {
  const [code, message] = err.message.split('|');
  console.log(code, message);
  return res.status(code).json({ message });
});

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
