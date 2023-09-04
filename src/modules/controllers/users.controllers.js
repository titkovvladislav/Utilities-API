const User = require('../../db/models/users.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const { secret } = require('../../../config')
const { v4: uuidv4 } = require('uuid');

const generateAccessToken = (id) => {
    const payload = {
        id
    }
    return jwt.sign(payload, secret, {expiresIn: "24h"})
}

module.exports.createNewUser = async (req, res) => {

    try {
        const { email, password, organization, role, fullName } = req.body;
        const login = email.split('@')[0]
        const candidate = await User.findOne({login});

        if (candidate) {
            return res.status(422).send({message: "Пользователь с таким именем уже существует"})
        } else {
            id = uuidv4();
            const hashPassword = bcrypt.hashSync(password, 3);
            const user = new User({
                login: login,
                password: hashPassword,
                id,
                organization: 'SuperCompany',
                role: 'User',
                fullName: 'Иванов Иван Иванович'
            })

            await user.save();
            const token = generateAccessToken(user.id);
            return res.json({token, id});
        }

    } catch(e) {
        console.log(e);
        return res.status(422).send('Error! Params not correct');
    }
};

module.exports.loginUser = async (req, res) => {
    try {

        const { email, password } = req.body;
        const login = email.split('@')[0];
        const user = await User.findOne({login});
        if (!user){
            return res.status(422).json({message: `Пользователь ${login} не найден`});
        }
        const validPassword = bcrypt.compareSync(password, user.password);

        if (!validPassword) {
            return res.status(422).json({message: "Введён неверный пароль"})
        }

        const idToken = generateAccessToken(user.id);
        return res.json({
            email,
            login,
            organization: user.organization,
            fullName: user.fullName,
            idToken,
        });
    } catch(e) {
        console.log(e);
        return res.status(422).send('Error! Params not correct');
    }
}

module.exports.allUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);

    } catch(e) {
        console.log(e);
        return res.status(422).send('Error! Params not correct');
    }
}
