const Sequelize =require ("sequelize");

const sequelize= new Sequelize (
       "dashboard_db",
       "root",
        "",
    {
    host:"localHost",
    dialect:"mysql",
    logging:false


}
);

sequelize.authenticate().then ((function(){
    console.log("Banco de dados conectado com sucesso");
})).catch(function (erro){
    console.log("Erro ao se conectar com o Banco de Dados" +erro)

});

module.exports=sequelize;

 