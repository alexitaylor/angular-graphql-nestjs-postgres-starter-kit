const role = (sequelize, Datatypes) => {
  const Role = sequelize.define('role', {
    name: {
      type: Datatypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  });

  return Role;
};

export default role;
