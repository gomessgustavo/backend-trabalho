import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UsuarioEntity } from "../model/entitities/Usuario.entity";
import { configDataSource } from "../db/config";
const jwtSecret = process.env.JWT_SECRET || "secret-uni-ads";
export class AuthController {
    constructor() {
        this.repository = configDataSource.getRepository(UsuarioEntity);
    }
    async cadastrar(req, res) {
        const { nome, usuario, senha } = req.body;
        if (!nome || !usuario || !senha) {
            res.status(400).json({ error: "Nome, usuário e senha são obrigatórios" });
            return;
        }
        try {
            const repo = configDataSource.getRepository(UsuarioEntity);
            const usuarioExistente = await repo.findOneBy({ usuario });
            if (usuarioExistente) {
                res.status(400).json({ error: "Nome de usuário já está em uso" });
                return;
            }
            const senhaCrypt = await bcrypt.hash(senha, 10);
            const novoUsuario = this.repository.create({
                nome,
                usuario,
                senha: senhaCrypt,
            });
            await this.repository.save(novoUsuario);
            res.status(201).json({ message: "Usuário registrado com sucesso" });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: "Erro ao registrar usuário" });
        }
    }
    async login(req, res) {
        const { usuario, senha } = req.body;
        if (!usuario || !senha) {
            res.status(400).json({ error: "Email e senha são obrigatórios" });
            return;
        }
        try {
            const usuarioBuscado = await this.repository.findOneBy({ usuario });
            if (!usuarioBuscado) {
                res.status(400).json({ error: "Credenciais inválidas" });
                return;
            }
            const isPasswordValid = await bcrypt.compare(senha, usuarioBuscado.senha);
            if (!isPasswordValid) {
                res.status(400).json({ error: "Credenciais inválidas" });
                return;
            }
            const token = jwt.sign({ id: usuarioBuscado.id, usuario: usuarioBuscado.usuario }, jwtSecret, {
                expiresIn: "1h",
            });
            res.status(200).json({ message: "Login bem-sucedido", token });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: "Erro ao fazer login" });
        }
    }
}
export default new AuthController();
