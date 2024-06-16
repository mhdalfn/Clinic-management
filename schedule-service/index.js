const express = require('express');
const app = express();
const scheduleRoutes = require('./routes');

app.use(express.json());
app.use('/schedules', scheduleRoutes);

const PORT = 3003;
app.listen(PORT, () => {
    console.log(`Schedule service running on port ${PORT}`);
});
