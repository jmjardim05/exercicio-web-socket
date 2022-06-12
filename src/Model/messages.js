const mongoose = require("mongoose");
const UserModel = require("./users");

const messages = new mongoose.Schema({
    user: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    message: {
        type: String,
        required: true
    },
    date: Date
}, {
    timestamps: {
        createdAt: true
    },
    toJSON: { // opções para conversao em JSON
        virtuals: true,
        transform(doc, ret) { //regras de conversão do documento para JSON
            ret.id = ret._id
            delete ret._id
        }
    },
    // versionKey: false, // faz com que o mogoose não versione os documentos, é true por padrão
    // não declarar explicitamente se vc quer que o version key seja true
    optimisticConcurrency: true // verifica antes de salvar se não houve alteração no documento
});

const MessageModel = mongoose.model("Message", messages);

module.export = MessageModel;