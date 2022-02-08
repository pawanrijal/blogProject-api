"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const type = Sequelize.DataTypes;
    await queryInterface.createTable("blogs", {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: type.STRING,
      },
      body: {
        type: type.STRING,
        allowNull: false,
      },
      category: {
        type: type.STRING,
        allowNull: false,
      },
      author_name: {
        type: type.STRING,
      },
    });
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
