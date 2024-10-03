import { BrechoRepository } from "../repository/Brecho.repository";
import { InteresseRepository } from "../repository/Interesse.repository";
export class BrechoService {
    constructor(repository, interesseRepository) {
        this.repository = repository;
        this.interesseRepository = interesseRepository;
    }
    async getRoupas() {
        return await this.repository.getRoupas();
    }
    async insereRoupa(roupa, idToUpdate) {
        if (idToUpdate)
            return this.repository.atualizaRoupa(roupa, idToUpdate);
        return this.repository.insereNovaRoupa(roupa);
    }
    async insereInteresse(roupaId, usuarioId) {
        const interesses = await this.buscaInteresses(usuarioId);
        const temInteresse = interesses.some((interesse) => interesse.roupa_id === roupaId);
        if (temInteresse) {
            throw new Error("Já possui interesse na roupa");
        }
        await this.interesseRepository.insereInteresse(usuarioId, roupaId);
    }
    async buscaInteresses(usuario) {
        return await this.interesseRepository.getInteressePorUsuario(usuario);
    }
}
export default new BrechoService(new BrechoRepository(), new InteresseRepository());
