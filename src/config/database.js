module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'postgres',
  database: 'taskList',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
