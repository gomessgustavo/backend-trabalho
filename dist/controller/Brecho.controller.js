import BrechoService from "../service/Brecho.service";
class BrechoController {
    constructor() {
        this.service = BrechoService;
    }
    async getRoupas(req, res) {
        try {
            const result = await this.service.getRoupas();
            res.json(result);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: "Erro ao buscar usuários" });
        }
    }
    async insereNovaRoupa(req, res) {
        try {
            const { body } = req;
            await this.service.insereRoupa({
                descricao: body.descricao,
                imagemBase64: body.imagemBase64,
                preco: body.preco,
                titulo: body.titulo,
            });
            res.status(200);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: "Erro ao buscar usuários" });
        }
    }
    async atualizaRoupa(req, res) {
        try {
            const { body } = req;
            await this.service.insereRoupa({
                descricao: body.descricao,
                imagemBase64: body.imagemBase64,
                preco: body.preco,
                titulo: body.titulo,
            }, Number(req.params.id));
            res.status(200);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: "Erro ao buscar usuários" });
        }
    }
    async insereInteresse(req, res) {
        try {
            const { body } = req;
            await this.service.insereInteresse(Number(body.roupaId), Number(body.usuarioId));
            res.status(200);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: "Erro ao buscar usuários" });
        }
    }
    async buscaInteresses(req, res) {
        try {
            await this.service.buscaInteresses(Number(req.params.id));
            res.status(200);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: "Erro ao buscar usuários" });
        }
    }
}
export default new BrechoController();
