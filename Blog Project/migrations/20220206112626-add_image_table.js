"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    let type = Sequelize.DataTypes;
    await queryInterface.addColumn("blogs", "image", {
      type: type.STRING(200),
      allowNull: true,
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
