import { Op } from "sequelize";
import { ClienteModel } from "../models/ClienteModel.js";

export const getClientes = async (req, res) => {
  try {
    const clientes = await ClienteModel.findAll();
    res.status(200).json(clientes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getClienteById = async (req, res) => {
  try {
    const cliente = await ClienteModel.findByPk(req.params.id);
    if (!cliente) {
      return res.status(404).json({ message: "cliente no encontrado" });
    }
    res.status(200).json(cliente);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const filtrarClientes = async (req, res) => {
  try {
    const { nombres, apellidos } = req.query;
    const where = {};
    if (nombres) where.nombres = { [Op.like]: `%${nombres}%` };
    if (apellidos) where.apellidos = { [Op.like]: `%${apellidos}%` };

    const clientes = await ClienteModel.findAll({
      where,
      order: [["id", "ASC"]],
    });
    res.status(200).json(clientes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createCliente = async (req, res) => {
  try {
    const { nombres, apellidos, correo_electronico } = req.body;
    if (!nombres || !apellidos || !correo_electronico) {
      return res.status(400).json({
        message: "nombres, apellidos y correo_electronico son requeridos",
      });
    }

    const existente = await ClienteModel.findOne({ where: { correo_electronico } });
    if (existente) {
      return res.status(409).json({ message: "el correo electronico ya esta registrado" });
    }

    const cliente = await ClienteModel.create(req.body);
    res.status(201).json({ message: "cliente creado", cliente });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateCliente = async (req, res) => {
  try {
    const cliente = await ClienteModel.findByPk(req.params.id);
    if (!cliente) {
      return res.status(404).json({ message: "cliente no encontrado" });
    }

    if (req.body.correo_electronico && req.body.correo_electronico !== cliente.correo_electronico) {
      const existente = await ClienteModel.findOne({
        where: {
          correo_electronico: req.body.correo_electronico,
          id: { [Op.ne]: cliente.id },
        },
      });
      if (existente) {
        return res.status(409).json({ message: "el correo electronico ya esta registrado" });
      }
    }

    cliente.set(req.body);
    await cliente.save();
    res.status(200).json({ message: "cliente actualizado", cliente });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};