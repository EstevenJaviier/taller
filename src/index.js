import app from './app';
import models from './models';

const port = process.env.PORT || 8000;

(async () => {
  app.listen(port, async () => {
    console.log(`listening on *: ${port}!✨`);
  });

  try {
    await models.sequelize.sync({ alter: false });
    console.log(`DB connection has been established successfully.✨`);
  } catch (err) {
    console.log(`Unable to connect to the database: ${err.message}`);
  }
})();
