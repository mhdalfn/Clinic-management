const express = require('express');
const app = express();
const patientRoutes = require('./routes');

app.use(express.json());
app.use('/patients', patientRoutes);

const PORT = 3002;
app.listen(PORT, () => {
    console.log(`Patient service running on port ${PORT}`);
});
