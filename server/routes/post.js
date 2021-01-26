require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const MailService = require("../mail-service");
const mailService = new MailService();

const router = express.Router();

// database conection
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});
// Get
router.get('/db', (req, res) => {
    pool.query('SELECT * FROM test_table', (err, results) => {
        if (err) throw err

        res.status(200).json(results.rows);
    })
});

// Post
router.post('/', (req, res) => {
    const email = req.body.email;
    const name = req.body.name;
    const tel = req.body.tel;
    const date = req.body.date;
    const selected = req.body.selected;
    const lang =req.body.lang;
    var created_at = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const insert = "INSERT INTO appointments (email, name, tel, date, time, created_at) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *";
    const values = [email, name, tel, date, selected, created_at];
    // validations
    const validEmail = /\S+@\S+\.\S+/.test(email);
    const validName = /^[A-Za-z\s]+$/.test(name);

    pool.query("SELECT COUNT(*) FROM appointments WHERE date = $1 AND time = $2", [date, selected], (err, result) => {
        if (err) throw err

        if (result.rows[0].count >= '3') {
            res.status(202).send();

        } else if (!email || !name || !tel || !date || !selected || isNaN(tel) == true || validEmail === false || validName === false) {
            res.status(400).send();

        } else {
            pool.query(insert, values, (err) => {
                if (err) throw err

                const appointment = {
                    date: date,
                    name: name,
                    time: selected
                };

                const en_mailInfo = {
                    from: '"John Doe 🧒" <company_name@example.com>',
                    to: email,
                    subject: "Greetings, Your Appointment with Company",
                    template: "appConfirmation",
                    context: appointment
                };

                const es_mailInfo = {
                    from: '"John Doe 🧒" <company_name@example.com>',
                    to: email,
                    subject: "Hola, Tu cita fue aceptada.",
                    template: "es_appConfirmation",
                    context: appointment
                };

                const mailInfo = (lang === 'en') ? en_mailInfo : es_mailInfo;

                mailService.sendMail(mailInfo
                ).catch(err => {
                    console.log(err);
                });

                res.status(201).json({ date: date, time: selected });
            })
        }
    })
});

module.exports = router;
