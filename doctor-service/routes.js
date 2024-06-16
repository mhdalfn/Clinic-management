const express = require('express');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const router = express.Router();

const doctorsFilePath = path.join(__dirname, 'data', 'doctors.json');

const getDoctors = () => JSON.parse(fs.readFileSync(doctorsFilePath, 'utf-8'));
const saveDoctors = (doctors) => fs.writeFileSync(doctorsFilePath, JSON.stringify(doctors, null, 2));

// Menambahkan Dokter Baru
router.post('/add', (req, res) => {
    const doctors = getDoctors();
    const newDoctor = req.body;
    doctors.push(newDoctor);
    saveDoctors(doctors);
    res.status(201).send(newDoctor);
});

// Mengedit Data Dokter
router.put('/edit/:id', (req, res) => {
    const doctors = getDoctors();
    const doctorIndex = doctors.findIndex(d => d.id === req.params.id);
    if (doctorIndex >= 0) {
        doctors[doctorIndex] = { ...doctors[doctorIndex], ...req.body };
        saveDoctors(doctors);
        res.send(doctors[doctorIndex]);
    } else {
        res.status(404).send({ message: 'Doctor not found' });
    }
});

// Menampilkan Daftar Dokter
router.get('/', (req, res) => {
    const doctors = getDoctors();
    res.send(doctors);
});

// Menghapus Data Dokter
router.delete('/delete/:id', (req, res) => {
    let doctors = getDoctors();
    doctors = doctors.filter(d => d.id !== req.params.id);
    saveDoctors(doctors);
    res.send({ message: 'Doctor deleted' });
});

// Mendapatkan Jadwal Praktek Dokter Tertentu
router.get('/:id/schedules', async (req, res) => {
    try {
        const doctorId = req.params.id;
        const response = await axios.get(`http://localhost:3003/schedules`);
        const schedules = response.data.filter(schedule => schedule.doctorId === doctorId);
        res.send(schedules);
    } catch (error) {
        res.status(500).send({ message: 'Error fetching schedules' });
    }
});

module.exports = router;
