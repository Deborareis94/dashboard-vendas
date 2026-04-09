const { DataTypes } = require('sequelize');
const sequelize = require('./db');

const Produto = sequelize.define('Produto', {
    nome: { type: DataTypes.STRING, allowNull: false },
    estoque: { type: DataTypes.INTEGER, defaultValue: 0 },
    preco: { type: DataTypes.FLOAT, allowNull: false }
}, {
    tableName: 'produtos',
    timestamps: false       
});
module.exports = Produto;