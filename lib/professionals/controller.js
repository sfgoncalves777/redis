const services = require('./services');

const findProfessionals = async (req, res) => {
  const professionals = await services.findAll()
  return res.json(professionals)
};

const findProfessional = async (req, res) => {
  const { id } = req.params;
  const professional = await services.findOne(id);
  return res.json(professional);
};

module.exports = { findProfessional, findProfessionals };
