const router = require('express').Router();
let Product = require('../models/product.model');

router.route('/').get((req, res) => {
    Product.find()
    .then(products => res.json(products))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const username = req.body.username;
    const prodname = req.body.prodname;
    const proddate = Date.parse(req.body.proddate);
    const exdate = Date.parse(req.body.exdate);
    const quantity = req.body.quantity;
    const category = req.body.category;
    
    const newProduct = new Product({
        username,
        prodname,
        proddate,
        exdate,
        quantity,
        category
    });

    newProduct.save()
        .then(() => res.json('Product added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Product.findById(req.params.id)
        .then(product => res.json(product))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Product.findByIdAndDelete(req.params.id)
        .then(() => res.json('Product deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Product.findById(req.params.id)
        .then(product => {
            product.username = req.body.username;
            product.prodname = req.body.prodname;
            product.proddate = Date.parse(req.body.proddate);
            product.exdate = Date.parse(req.body.exdate);
            product.quantity = req.body.quantity;
            product.category = req.body.category;

            product.save()
                .then(() => res.json('Product updated!'))
                .catch(err => {res.status(400).json('Error: ' + err)});
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;