const mongoose = require("mongoose");

// usando mongoose todo modelo é derivado de um schema com as definições (propriedade, metodos)
// Schema( { definição }, { opções })
const usersSchema = new mongoose.Schema(
    {
        nickname: {
            type: String,
            required: true,
            unique: true, // unique: true => define como chave única
        }, 
        email: { // nome: objeto => define uma propriedade com opções (constraints, validações...)
            type: String, // type: tipo => tipo do atributo
            required: [true, "E-mail é obrigatório"], // required: [true, msg] => definie como obrigatório com msg de erro
            unique: true, // unique: true => define como chave única, não vai poder repetir e-mail para outro usuário
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'E-mail inválido'] // match: [regex, msg] => define uma validação contra um expressão regular com msg de erro
        }
    },
    {
        timestamps: { createdAt: true, updatedAt: true }, // cria os campos de log, data da criação e ultima alteração
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
    }
);

const UserModel = mongoose.model("User", usersSchema);

module.exports = UserModel;