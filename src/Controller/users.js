const mongoose = require("mongoose");
const UserModel = require("../Model/users");
const app = require("express");

const addUser = (req, res) => {
    const user = new UserModel(req.body);
    user.save()
        .then(() => res.send("Logado"))
        .catch(err => res.status(400).send(err.message));
}

const updateUser = (req, res) => {
    const user = new UserModel(req.body);
    user.findOneAndUpdate({ nickname: req.body.nickname }, req.Body)
        .then(() => res.send("Alterado"))
        .catch(err => res.status(400).send(err.message));
}

const deleteUser = (req, res) => {
    const user = new UserModel(req.body);
    user.findOneAndDelete({ nickname: req.body.nickname })
        .then(() => res.send("Excluído"))
        .catch(err => res.status(400).send(err.message));
}

const findUser = (req, res) => {
    const user = new UserModel(req.body);
    user.find()
        .then(users => res.send(users))
        .catch(err => res.status(400).send(err.message));
}

const controller = app => app.route("/users/")
    .get(findUser)
    .post(addUser)
    .put(updateUser)
    .delete(deleteUser);

module.exports = controller;