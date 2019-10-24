const CONFIG = require('./config/config');
const app = require('./app');



app.listen(CONFIG.PORT, () => {
    console.log("Server initialized on port:" + CONFIG.PORT);
});