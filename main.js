const app = require('./server');
const PORT = app.listen(process.env.PORT || 3000);

app.listen(PORT, () => console.log(`your canvas awaits at port ${PORT}`));
