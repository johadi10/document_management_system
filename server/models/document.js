module.exports = (sequelize, DataTypes) => {
  const Document = sequelize.define('Document', {
    creatorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: {
          msg: 'creatorId must be an integer'
        }
      }
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [3, 254],
          msg: 'Title length should range between 3 - 254 characters'
        }
      },
      set(value) {
        this.setDataValue('title', value.trim());
      }
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Content cannot be empty'
        }
      }
    },
    access: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'private',
      validate: {
        isIn: {
          args: [['private', 'public', 'role']],
          msg: 'Access can only be private, public or role'
        }
      }
    }
  }, {
    classMethods: {
      // associations can be defined here
      associate: (models) => {
        Document.belongsTo(models.User, {
          foreignKey: 'creatorId',
          onDelete: 'CASCADE'
        });
      }
    }
  });
  return Document;
};
