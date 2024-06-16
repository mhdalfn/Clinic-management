const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const patientsFilePath = path.join(__dirname, 'data', 'patients.json');

const getPatients = () => JSON.parse(fs.readFileSync(patientsFilePath, 'utf-8'));
const savePatients = (patients) => fs.writeFileSync(patientsFilePath, JSON.stringify(patients, null, 2));

// Menambahkan Pasien Baru
router.post('/add', (req, res) => {
    const patients = getPatients();
    const newPatient = req.body;
    patients.push(newPatient);
    savePatients(patients);
    res.status(201).send(newPatient);
});

// Mengedit Data Pasien
router.put('/edit/:id', (req, res) => {
    const patients = getPatients();
    const patientIndex = patients.findIndex(p => p.id === req.params.id);
    if (patientIndex >= 0) {
        patients[patientIndex] = { ...patients[patientIndex], ...req.body };
        savePatients(patients);
        res.send(patients[patientIndex]);
    } else {
        res.status(404).send({ message: 'Patient not found' });
    }
});

// Menampilkan Daftar Pasien
router.get('/', (req, res) => {
    const patients = getPatients();
    res.send(patients);
});

// Menghapus Data Pasien
router.delete('/delete/:id', (req, res) => {
    let patients = getPatients();
    patients = patients.filter(p => p.id !== req.params.id);
    savePatients(patients);
    res.send({ message: 'Patient deleted' });
});

module.exports = router;
