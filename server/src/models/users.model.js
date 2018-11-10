const bcrypt = require("bcryptjs");

const user = (sequelize, DataTypes) => {
  const User = sequelize.define("user", {
    firstName: {
      type: DataTypes.STRING
    },
    lastName: {
      type: DataTypes.STRING
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [7, 100]
      }
    },
    role: {
      type: DataTypes.STRING
    }
  });

  User.beforeCreate(async user => {
    user.password = await user.generatePasswordHash();
  });

  // Possible to execute on each user instance and have the user
  // available within the method as this.
  User.prototype.generatePasswordHash = async function() {
    const salt = bcrypt.genSaltSync(10);
    return await bcrypt.hashSync(this.password, salt);
  };

  User.prototype.validatePassword = async function(password) {
    return await bcrypt.compareSync(password, this.password);
  };

  User.associate = models => {
    User.hasMany(models.Message, { onDelete: "CASCADE" });
  };

  User.findByLogin = async login => {
    let user = await User.findOne({
      where: { username: login }
    });

    if (!user) {
      user = await User.findOne({
        where: { email: login }
      });
    }

    return user;
  };

  return User;
};

export default user;
