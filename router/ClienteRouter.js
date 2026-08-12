import express from "express";
import { getClientes, getClienteById, filtrarClientes, createCliente, updateCliente } from "../controller/ClienteController.js";

const router = express.Router();

router.get("/clientes/filtrar", filtrarClientes);
router.get("/clientes", getClientes);
router.get("/clientes/:id", getClienteById);
router.post("/clientes", createCliente);
router.put("/clientes/:id", updateCliente);

export default router;