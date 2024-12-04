
module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    // ...existing code...
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    // ...existing code...
  });

  return Message;
};