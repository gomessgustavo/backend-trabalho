import { configDataSource } from "../db/config";
import { InteresseEntity } from "../model/entitities/Interesse.entity";
export class InteresseRepository {
    constructor() {
        this.repository = configDataSource.getRepository(InteresseEntity);
    }
    async getInteressePorUsuario(usuario) {
        return await this.repository.findBy({ usuario_id: usuario });
    }
    async insereInteresse(usuarioId, roupaId) {
        const interesse = this.repository.create({
            roupa_id: roupaId,
            usuario_id: usuarioId,
        });
        await this.repository.save(interesse);
    }
}
