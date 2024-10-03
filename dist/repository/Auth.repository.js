import { configDataSource } from "../db/config";
import { UsuarioEntity } from "../model/entitities/Usuario.entity";
export class AuthRepository {
    constructor() {
        this.repository = configDataSource.getRepository(UsuarioEntity);
    }
    async procuraUsuario(usuario) {
        return await this.repository.findOneBy({ usuario });
    }
    async registrarUsuario(nome, usuario, senhaCrypt) {
        const novoUsuario = this.repository.create({
            nome,
            usuario,
            senha: senhaCrypt,
        });
        await this.repository.save(novoUsuario);
    }
}
