const { DataTypes } = require('sequelize');
const sequelize = require('./db');

const Metrica = sequelize.define('Metrica', {
    produtoId: { type: DataTypes.INTEGER, allowNull: false, field: 'produto_id' },
    campanhaId: { type: DataTypes.INTEGER, allowNull: false, field: 'campanha_id' },
    vendas: { type: DataTypes.INTEGER, defaultValue: 0, field: 'vendas' },
    impressoes: {type: DataTypes.INTEGER,allowNull:false,defaultValue:0 ,field:'impressoes'},
    cliques:{type:DataTypes.INTEGER,allowNull:false,defaultValue:0,field:'cliques'}
}, {
    tableName: 'metricas',
    timestamps: false
});

module.exports = Metrica;