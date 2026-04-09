const { DataTypes } = require('sequelize');
const sequelize = require('./db');

const Campanha = sequelize.define('Campanha', {
    nome: { type: DataTypes.STRING, allowNull: false },
    dataInicio: { type: DataTypes.DATE, allowNull: false, field: 'data_inicio' },
    dataFim: { type: DataTypes.DATE, allowNull: false, field: 'data_fim' }
}, {
    tableName: 'campanhas', 
    timestamps: false
});

module.exports = Campanha;