import User from './User';
import UserDetails from './UserDetails';

export default function setupAssociations() {
  User.hasOne(UserDetails, {
    foreignKey: 'userId',
    as: 'details',
  });

  UserDetails.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user',
  });
}
