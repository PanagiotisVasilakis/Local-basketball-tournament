'use strict';

const express = require('express');
const router = express.Router();

router.get('/', (req,res) => {
    res.render('index.hbs');
});
router.get('/protatlima', (req,res) => {
    res.render('protatlima.hbs');
});
router.get('/teams', (req,res) => {
    res.render('teams.hbs');
});
router.get('/paiktes', (req,res) => {
    res.render('paiktes.hbs');
});
router.get('/games', (req,res) => {
    res.render('games.hbs');
});
router.get('/contact', (req,res) => {
    res.render('contact.hbs');
});
router.get('/referee', (req,res) => {
    res.render('referee.hbs');
});
router.get('/coaches', (req,res) => {
    res.render('coaches.hbs');
});

module.exports = router; 
