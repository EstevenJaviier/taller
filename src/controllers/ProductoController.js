import models from '../models';
import paginate from '../services/paginate';

export const index = async (req, res, next) => {
  try {
    // get the query params
    const { page, limit } = req.query;
    const [productos, err] = await paginate(models.Producto, page, limit, search, {
      attributes: ['id', 'nombre', 'cantidadDisponible', 'valorUnitario', 'createdAt'],
      order: [['createdAt', 'DESC']]
    });

    if (err) return next(err);

    return res.json(productos);
  } catch (err) {
    return next(err);
  }
};

export const show = async (req, res, next) => {
  try {
    const producto = await models.Producto.findOne({ where: { id: req.params.id } });
    if (!producto) return res.status(400).json({ message: 'Not Found.' });

    return res.json(producto);
  } catch (err) {
    return next(err);
  }
};

export const store = async (req, res, next) => {
  try {
    const producto = await models.Producto.create(req.body);

    return res.json(producto);
  } catch (err) {
    return next(err);
  }
};

export const update = async (req, res, next) => {
  try {
    const producto = await models.Producto.findOne({ where: { id: req.params.id } });
    if (!producto) return res.status(400).json({ message: 'Not Found.' });

    const updated = await producto.update(req.body);

    return res.json(updated);
  } catch (err) {
    return next(err);
  }
};
export const destroy = async (req, res, next) => {
  try {
    const producto = await models.Producto.destroy({ where: { id: req.params.id } });
    if (!producto) return res.status(400).json({ message: 'Not Found.' });

    return res.json({ message: '¡Eliminación éxitosa!' });
  } catch (err) {
    return next(err);
  }
};
