import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Producto extends Model {
    static associate(models) {
      this.belongsTo(models.Categoria, {
        foreignKey: {
          name: 'CategoriaId',
          allowNull: false
        }
      });
      this.belongsTo(models.Vendedor, { foreignKey: { allowNull: false }, onDelete: 'CASCADE', onUpdate: 'CASCADE' });
      this.hasMany(models.FotosProducto, {
        foreignKey: { allowNull: false },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
      this.belongsToMany(models.CarritoCompra, { through: models.DetallesProducto });
    }
  }

  Producto.init(
    {
      nombre: {
        type: DataTypes.CITEXT
      },
      descripcion: {
        type: DataTypes.CITEXT
      },
      valorUnitario: {
        type: DataTypes.DECIMAL(13, 2)
      },
      detallePromocion: {
        type: DataTypes.CITEXT
      },
      cantidadDisponible: {
        type: DataTypes.INTEGER
      },
      activo: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      }
    },
    { sequelize, modelName: 'Producto' }
  );

  return Producto;
};
