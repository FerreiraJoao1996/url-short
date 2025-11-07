

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('url', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'users', key: 'id' },
        onDelete: 'CASCADE',
      },
      original_url: {
        type: Sequelize.STRING(2048),
        allowNull: false,
        defaultValue: '',
      },
      short_url: {
        type: Sequelize.STRING(30),
        allowNull: false,
        unique: true,
      },
      number_clicks: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue: null,
      }
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('url');
  }
};
