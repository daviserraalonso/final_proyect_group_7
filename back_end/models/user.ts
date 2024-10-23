import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js'; // Aquí importas la instancia de Sequelize

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  roleId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING
  },
  isValidated: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  lat: {
    type: DataTypes.DECIMAL(9, 6)
  },
  lng: {
    type: DataTypes.DECIMAL(9, 6)
  }
}, {
  tableName: 'user',
  timestamps: true
});

export default User;
