const Sequelize = require('sequelize');
const db = require('./db');

const Venda = db.define('venda', {
    produtoId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    produtoNome:{
        type: Sequelize.STRING,
        allowNull: false


    }, 
    quantidade:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    valor:{
        type: Sequelize.DECIMAL(10,2),
        allowNull: false
    },
    data:{
        type: Sequelize.DATE,
        allowNull: false
    }
});

module.exports = Venda;