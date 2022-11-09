import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Producto extends Model {
    static associate(models) { }
  }

  Producto.init(
    {
      nombre: {
        type: DataTypes.STRING
      },
      valorUnitario: {
        type: DataTypes.DECIMAL(13, 2)
      },
      cantidadDisponible: {
        type: DataTypes.INTEGER
      },
    },
    { sequelize, modelName: 'Producto' }
  );

  return Producto;
};
