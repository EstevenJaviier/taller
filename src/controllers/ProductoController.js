import models from '../models';
import paginate from '../services/paginate';
import { Op } from 'sequelize';

export const index = async (req, res, next) => {
  try {
    // get the query params
    const { q, page, limit } = req.query;

    const search = {
      where: { nombre: { [Op.like]: `%${q}%` }, activo: true }
    };

    const [productos, err] = await paginate(models.Producto, page, limit, search, {
      attributes: [
        'id',
        'nombre',
        'descripcion',
        'cantidadDisponible',
        'detallePromocion',
        'valorUnitario',
        'createdAt'
      ],
      include: [{ model: models.FotosProducto, attributes: ['path'] }],
      order: [['createdAt', 'DESC']]
    });

    if (err) {
      return next(err);
    }

    return res.json(productos);
  } catch (err) {
    return next(err);
  }
};

export const getProducto = async (req, res, next) => {
  try {
    const producto = await models.Producto.findByPk(req.params.id, {
      attributes: { exclude: ['createdAt', 'updatedAt', 'CategoriaId', 'VendedorId', 'activo'] },
      include: [
        { model: models.FotosProducto, attributes: ['path'] },
        { model: models.Categoria, attributes: ['nombre', 'id'] },
        {
          model: models.Vendedor,
          attributes: ['sitioWeb', 'razonSocial']
        }
      ]
    });

    if (!producto) {
      return res.status(404).json({ message: 'Not Found.' });
    }

    return res.json(producto);
  } catch (err) {
    return next(err);
  }
};

export const getProductosByCategoria = async (req, res, next) => {
  try {
    const categoria = await models.Categoria.findOne({
      where: { nombre: req.params.nombre }
    });

    if (!categoria) {
      return res.status(404).json({ message: 'Not Found.' });
    }

    // get the query params
    const { q, page, limit } = req.query;

    const search = {
      where: { nombre: { [Op.like]: `%${q}%` }, activo: true, CategoriaId: categoria.id }
    };

    const [productos, err] = await paginate(models.Producto, page, limit, search, {
      attributes: [
        'id',
        'nombre',
        'descripcion',
        'cantidadDisponible',
        'detallePromocion',
        'valorUnitario',
        'createdAt'
      ],
      include: [{ model: models.FotosProducto, attributes: ['path'] }],
      order: [['createdAt', 'DESC']]
    });

    if (err) {
      return next(err);
    }

    return res.json(productos);
  } catch (err) {
    return next(err);
  }
};
