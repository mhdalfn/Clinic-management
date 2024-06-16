const express = require('express');
const app = express();
const doctorRoutes = require('./routes');

app.use(express.json());
app.use('/doctors', doctorRoutes);

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Doctor service running on port ${PORT}`);
});
