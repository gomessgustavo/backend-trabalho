import "reflect-metadata";
import express from "express";
import dotenv from "dotenv";
import rotasBrecho from "./routes/Brecho.route";
import authRotas from "./routes/Auth.route";

dotenv.config();

const app = express();

app.use(express.json());

app.use("/brecho", rotasBrecho);
app.use("/auth", authRotas);

const startServer = async (): Promise<void> => {
  try {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.error(`Erro ao iniciar o servidor: ${error}`);
  }
};

startServer();
