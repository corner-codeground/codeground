const { Sequelize, DataTypes } = require("sequelize");

class Community extends Sequelize.Model {
  static initiate(sequelize) {
    Community.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        title: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        content: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        viewCount: {
          type: DataTypes.INTEGER,
          defaultValue: 0,
        },
        likes: {
          type: DataTypes.INTEGER,
          defaultValue: 0,
        },
        hashtags: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notEmpty: {
              msg: "해시태그는 필수입니다.",
            },
          },
        },
        category: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        boardId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "boards",
            key: "id",
          },
        },
      },
      {
        sequelize,
        tableName: "communities",
        timestamps: true,
        modelName: "Community",
      }
    );
  }
}

module.exports = Community;