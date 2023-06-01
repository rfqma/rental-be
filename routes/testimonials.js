const express = require('express');
const router = express.Router();

//import express validator
const { body, validationResult } = require('express-validator');

//import database
const connection = require('../config/database');

/**
 * INDEX POSTS
 */
router.get('/', function (req, res) {
    //query
    connection.query('SELECT * FROM testimonials ORDER BY id desc', function (err, rows) {
        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Internal Server Error',
            })
        } else {
            return res.status(200).json({
                status: true,
                message: 'List Data Testimonials',
                data: rows
            })
        }
    });
});

/**
 * STORE POST
 */
router.post('/store', [

    //validation
    body('name').notEmpty(),
    body('description').notEmpty()

], (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array()
        });
    }

    //define formData
    let formData = {
        name: req.body.name,
        description: req.body.description
    }

    // insert query
    connection.query('INSERT INTO testimonials SET ?', formData, function (err, rows) {
        //if(err) throw err
        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Internal Server Error',
            })
        } else {
            return res.status(201).json({
                status: true,
                message: 'Insert Data Successfully',
                data: rows[0]
            })
        }
    })

});

/**
 * SHOW POST
 */
router.get('/(:id)', function (req, res) {

    let id = req.params.id;

    connection.query(`SELECT * FROM testimonials WHERE id = ${id}`, function (err, rows) {

        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Internal Server Error',
            })
        }

        // if testimonial not found
        if (rows.length <= 0) {
            return res.status(404).json({
                status: false,
                message: 'Data Testimonial Not Found!',
            })
        }
        // if testimonial found
        else {
            return res.status(200).json({
                status: true,
                message: 'Detail Data Testimonial',
                data: rows[0]
            })
        }
    })
});

/**
 * UPDATE POST
 */
router.patch('/update/:id', [

    //validation
    body('name').notEmpty(),
    body('description').notEmpty()

], (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array()
        });
    }

    //id testimonial
    let id = req.params.id;

    //data testimonial
    let formData = {
        name: req.body.name,
        description: req.body.description
    }

    // update query
    connection.query(`UPDATE testimonials SET ? WHERE id = ${id}`, formData, function (err, rows) {
        //if(err) throw err
        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Internal Server Error',
            })
        } else {
            return res.status(200).json({
                status: true,
                message: 'Update Data Successfully!'
            })
        }
    })

});

/**
 * DELETE POST
 */
router.delete('/delete/(:id)', function (req, res) {

    let id = req.params.id;

    connection.query(`DELETE FROM testimonials WHERE id = ${id}`, function (err, rows) {
        //if(err) throw err
        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Internal Server Error',
            })
        } else {
            return res.status(200).json({
                status: true,
                message: 'Delete Data Successfully!',
            })
        }
    })
});

module.exports = router;