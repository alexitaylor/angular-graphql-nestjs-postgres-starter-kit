const role = (sequelize, Datatypes) => {
  const Role = sequelize.define('roles', {
    name: {
      type: Datatypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  });

  Role.associate = models => {
    Role.hasMany(models.User);
  };

  return Role;
};

export default role;
