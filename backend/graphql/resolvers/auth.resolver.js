const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Models
const User = require('../../models/user');



module.exports = {

    signup: async args => {
        try {
            const isExistingUser = await User.findOne({ email: args.userInput.email });
            if (isExistingUser) throw 'User already exists.'
            const password = await bcrypt.hash(args.userInput.password, 12);
            const user = new User({
                email: args.userInput.email,
                password,
            });
            const res = await user.save();
            delete res._doc.password;
            return { ...res._doc, _id: res.id };
        } catch (err) {
            throw err;
        }
    },

    login: async ({ email, password }) => {
        const user = await User.findOne({ email: email });
        if (!user) throw new Error('Invalid credentials.');
        const isAuth = await bcrypt.compare(password, user.password);
        if (!isAuth) throw new Error('Invalid credentials.');
        const token = jwt.sign({ userId: user.id, email: user.email }, 'threecankeepasecretiftwoaredead', {
            expiresIn: '1h'
        });

        return {
            userId: user.id,
            token,
            tokenExpiration: 1,
        }
    }
}