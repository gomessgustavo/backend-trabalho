import { configDataSource } from "../db/config";
import { BrechoRoupaEntity } from "../model/entitities/BrechoRoupa.entity";
export class BrechoRepository {
    constructor() {
        this.repository = configDataSource.getRepository(BrechoRoupaEntity);
    }
    async getRoupas() {
        return await this.repository.find();
    }
    async insereNovaRoupa(roupa) {
        const roupaNova = this.repository.create({
            imagemBase64: roupa.imagemBase64,
            descricao: roupa.descricao,
            titulo: roupa.titulo,
            preco: roupa.preco,
        });
        await this.repository.save(roupaNova);
    }
    async atualizaRoupa(roupa, usuario) {
        const roupaAtualizada = await this.getRoupa(usuario);
        roupaAtualizada.descricao = roupa.descricao;
        roupaAtualizada.imagemBase64 = roupa.imagemBase64;
        roupaAtualizada.titulo = roupa.titulo;
        roupaAtualizada.preco = roupa.preco;
        await this.repository.save(roupaAtualizada);
    }
    async deletarRoupa(usuario) {
        await this.repository.delete(usuario);
    }
    async getRoupa(id) {
        const roupa = await this.repository.findOneBy({ id });
        if (!roupa)
            throw new Error();
        return roupa;
    }
}
