//Models Imports
const Product = require('../models/products');
const fs = require('fs');

//Controller Logical Exports
exports.createProduct = (req, res, next) => {
    const productObject = JSON.parse(req.body.sauce);
    delete productObject._id;
    const product = new Product({
      ...productObject,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` //URL de l'image
    });

    product.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
    .catch(error => res.status(400).json({ error }));
};

exports.modifyProduct = (req, res, next) => {
    const productObject = req.file ?
    {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` //URL de l'image
    } : { ...req.body };

    Product.updateOne({ _id: req.params.id }, { ...productObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet modifié !'}))
    .catch(error => res.status(400).json({ error }));
};

exports.deleteProduct = (req, res, next) => {
    Product.findOne({ _id: req.params.id })
    .then(sauce => {
        const filename = sauce.imageUrl.split('/images/')[1];

        fs.unlink(`images/${filename}`, () => {
            Product.deleteOne({ _id: req.params.id })
            .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
            .catch(error => res.status(400).json({ error }));
        });
    })
    .catch(error => res.status(400).json({ error }) );
};

exports.getProduct = (req, res, next) => {
    Product.findOne({ _id: req.params.id })
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(404).json({ error }));
};

exports.getProductAll = (req, res, next) => {
    Product.find()
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(400).json({ error }));
};

exports.likeProduct = (req, res, next) => {
    const sauceId = req.params.id;
    const productObject = req.body;
    const userId = productObject.userId;
    const like = productObject.like;

    // L'ID de l'utilisateur doit être ajouté ou retiré du tableau approprié
    // usersLiked et usersDisliked
    Product.findOne({ _id: sauceId })
    .then(product => {
        
        let msg = '';
        let usersLikedArray = []
        let usersDislikedArray = [];

        usersLikedArray = product.usersLiked;
        usersDislikedArray = product.usersDisliked;

        if (like == 1) {
            msg = 'Le user vient de liker';
            usersLikedArray.push(userId);
        }
        if (like == -1) {
            msg = 'Le user vient de disliker !';
            usersDislikedArray.push(userId);
        }
        if (like == 0) {
            msg = 'Le user vient de retirer son like...';
            usersLikedArray.remove(userId);
            usersDislikedArray.remove(userId);
        }

        Product.updateOne({ _id: sauceId }, { 
            usersLiked: usersLikedArray,
            usersDisliked: usersDislikedArray,
            likes: usersLikedArray.length,
            dislikes: usersDislikedArray.length
        })
        .then(() => res.status(200).json({ message: msg}))
        .catch(error => res.status(404).json({ error }));

    })
    .catch(error => res.status(400).json({ error }) );
};