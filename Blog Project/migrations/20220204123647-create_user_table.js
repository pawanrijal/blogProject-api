"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    let type = Sequelize.DataTypes;
    await queryInterface.createTable(
      "users",
      {
        id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        username: {
          type: type.STRING(100),
          unique: true,
          allowNull: false,
        },
        password: {
          type: type.STRING(200),
          allowNull: false,
        },
        profile_pic: {
          type: type.STRING(200),
        },
      },
      {
        timestamps: false,
      }
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
