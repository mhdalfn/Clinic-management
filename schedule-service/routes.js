const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const schedulesFilePath = path.join(__dirname, 'data', 'schedules.json');

const getSchedules = () => JSON.parse(fs.readFileSync(schedulesFilePath, 'utf-8'));
const saveSchedules = (schedules) => fs.writeFileSync(schedulesFilePath, JSON.stringify(schedules, null, 2));

// Menambahkan Jadwal Praktek Baru
router.post('/add', (req, res) => {
    const schedules = getSchedules();
    const newSchedule = req.body;
    schedules.push(newSchedule);
    saveSchedules(schedules);
    res.status(201).send(newSchedule);
});

// Mengedit Informasi Jadwal Praktek
router.put('/edit/:id', (req, res) => {
    const schedules = getSchedules();
    const scheduleIndex = schedules.findIndex(s => s.id === req.params.id);
    if (scheduleIndex >= 0) {
        schedules[scheduleIndex] = { ...schedules[scheduleIndex], ...req.body };
        saveSchedules(schedules);
        res.send(schedules[scheduleIndex]);
    } else {
        res.status(404).send({ message: 'Schedule not found' });
    }
});

// Menampilkan Daftar Jadwal Praktek
router.get('/', (req, res) => {
    const schedules = getSchedules();
    res.send(schedules);
});

// Menghapus Jadwal Praktek
router.delete('/delete/:id', (req, res) => {
    let schedules = getSchedules();
    schedules = schedules.filter(s => s.id !== req.params.id);
    saveSchedules(schedules);
    res.send({ message: 'Schedule deleted' });
});

module.exports = router;
