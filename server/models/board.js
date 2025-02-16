const { Sequelize, DataTypes } = require("sequelize");

class Board extends Sequelize.Model {
  static initiate(sequelize) {
    Board.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: "boards",
        timestamps: false,
        modelName: "Board",
      }
    );
  }

  static async seedDefaultBoards() {
    const defaultBoards = [
      { name: "프론트엔드" },
      { name: "백엔드" },
      { name: "보안" },
      { name: "미디어" },
      { name: "인공지능" },
      { name: "임베디드 & IoT" },
      { name: "블록체인 & 웹3" },
      { name: "빅데이터" },
      { name: "코드그라운드" },
    ];

    for (const board of defaultBoards) {
      await Board.findOrCreate({ where: { name: board.name } });
    }
  }
}

module.exports = Board;
