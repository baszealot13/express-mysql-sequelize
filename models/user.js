'use strict';
const {
    Model
} = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        passwordCheck(password) {
            return bcrypt.compareSync(password, this.password);
        }
        static associate(models) {
            // define association here
        }
    };
    User.init({
        username: DataTypes.STRING,
        password: {
            type: DataTypes.STRING,
            set(value) {
                const salt = bcrypt.genSaltSync(10);
                const hash = bcrypt.hashSync(value, salt);
                this.setDataValue('password', hash);
            }
        },
        user_email: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'User',
    });
    return User;
};