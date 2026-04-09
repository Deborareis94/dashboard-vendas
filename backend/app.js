const express = require('express');
const cors = require('cors');

const Produto = require('./models/produto');
const Campanha = require('./models/campanha');
const Metrica = require('./models/metrica');
const Venda = require('./models/venda');

const app = express();

app.use(cors());
app.use(express.json());

async function startServer() {
    try {

        await Produto.sync();
        await Campanha.sync();
        await Metrica.sync();
        await Venda.sync();

        console.log('Todos os modelos sincronizados com sucesso!');

       

        app.get('/produtos', async (req, res) => {
            try {
                const produtos = await Produto.findAll();
                res.json(produtos);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        });

        app.post('/produtos', async (req, res) => {
            try {

                const { nome, preco, estoque } = req.body;

                const produtoExistente = await Produto.findOne({
                    where: { nome }
                });

                if (produtoExistente) {

                    produtoExistente.estoque =
                        Number(produtoExistente.estoque) + Number(estoque);

                    await produtoExistente.save();

                    return res.json(produtoExistente);
                }

                const novoProduto = await Produto.create({
                    nome,
                    preco,
                    estoque
                });

                res.json(novoProduto);

            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        });

        app.delete('/produtos/:id', async (req, res) => {
            try {

                const produto = await Produto.findByPk(req.params.id);

                if (!produto) {
                    return res.status(404).json({ error: 'Produto não encontrado' });
                }

                await produto.destroy();

                res.json({ message: 'Produto deletado com sucesso' });

            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        });

        app.put('/produtos/:id', async (req, res) => {
            try {

                const produto = await Produto.findByPk(req.params.id);

                if (!produto) {
                    return res.status(404).json({ error: 'Produto não encontrado' });
                }

                await produto.update(req.body);

                res.json(produto);

            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        });

        

        app.get('/produtos/estoque', async (req, res) => {
            try {

                const produtos = await Produto.findAll({
                    attributes: ['nome', 'estoque'],
                    order: [['estoque', 'DESC']]
                });

                res.json(produtos);

            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        });

       

        app.get('/produtos/valor', async (req, res) => {
            try {

                const produtos = await Produto.findAll({
                    attributes: [
                        'nome',
                        [Produto.sequelize.literal('estoque * preco'), 'valor_total']
                    ],
                    order: [[Produto.sequelize.literal('valor_total'), 'DESC']]
                });

                res.json(produtos);

            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        });

       

        app.get('/campanhas', async (req, res) => {
            try {
                const campanhas = await Campanha.findAll();
                res.json(campanhas);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        });

        app.post('/campanhas', async (req, res) => {
            try {
                const campanha = await Campanha.create(req.body);
                res.json(campanha);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        });

        

        app.get('/metricas', async (req, res) => {
            try {
                const metricas = await Metrica.findAll();
                res.json(metricas);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        });

        app.post('/metricas', async (req, res) => {
            try {
                const metrica = await Metrica.create(req.body);
                res.json(metrica);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        });

        

        app.get('/vendas', async (req, res) => {
            try {
                const vendas = await Venda.findAll();
                res.json(vendas);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        });

        app.post('/vendas', async (req, res) => {
            try {
                const venda = await Venda.create(req.body);
                res.json(venda);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        });

       

        app.get('/vendas/faturamento', async (req, res) => {
            try {

                const vendas = await Venda.findAll();

                const faturamento = vendas.reduce((total, v) => {
                    return total + Number(v.valor);
                }, 0);

                res.json({ faturamento });

            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        });

       

        app.listen(8081, () => {
            console.log('Servidor rodando na porta 8081');
        });

    } catch (err) {
        console.error('Erro ao sincronizar os modelos:', err);
    }
}

startServer();