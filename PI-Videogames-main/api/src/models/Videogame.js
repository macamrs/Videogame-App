const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id: {
      type: DataTypes.UUID, // Genera un nro ramdom
      defaultValue: DataTypes.UUIDV4, // Me genera automaticamente un UUIDV4
      allowNull: false, // No permite que este vacio
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    launch_date: {
      type: DataTypes.STRING,
      allowNull: true
    },
    rating: {
      type: DataTypes.FLOAT
    },
    image: {
      type: DataTypes.STRING
    },
    platforms: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    vg_created_db: { // Para distinguir entre juego en base de datos y api
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false
    }
  });
};
