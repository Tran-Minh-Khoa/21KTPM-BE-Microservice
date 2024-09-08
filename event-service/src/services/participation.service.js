const db = require('../models/index.model.js');
const Participation = db.participation;
const { Op, Sequelize } = require('sequelize');

exports.addParticipation = async (participationData) => {
  try {
    // Ensure the keys in participationData match the model fields
    const newParticipation = await Participation.create({
      event_id: participationData.event_id,
      brand_id: participationData.brand_id,
      user_id: participationData.user_id,
      created_date: participationData.created_date
    });
    return newParticipation;
  } catch (error) {
    throw new Error('Failed to add participation: ' + error.message);
  }
};

exports.getParticipationByEventId = async (event_id) => {
  try {
    const participations = await Participation.findAll({ where: { event_id } });
    return participations;
  } catch (error) {
    throw new Error('Failed to retrieve participations by event ID: ' + error.message);
  }
};

exports.getParticipationByUserId = async (user_id) => {
  try {
    const participations = await Participation.findAll({ where: { user_id } });
    return participations;
  } catch (error) {
    throw new Error('Failed to retrieve participations by user ID: ' + error.message);
  }
};

exports.countParticipationsByDate = async (startDate, endDate, brand_id, event_id) => {
  console.log(new Date(startDate));
  console.log(new Date(endDate));
  console.log(brand_id);
  console.log(event_id);

  const whereClause = {
    brand_id: brand_id,
    created_date: {
      [Op.between]: [new Date(startDate), new Date(endDate)]
    }
  };

  if (event_id) {
    whereClause.event_id = event_id;
  }

  const participationData = await Participation.findAll({
    where: whereClause,
    attributes: [
      [Sequelize.fn('DATE', Sequelize.col('created_date')), 'date'],
      [Sequelize.fn('COUNT', Sequelize.col('user_id')), 'count']
    ],
    group: ['date'],
    order: [['date', 'ASC']]
  });

  return participationData;
};
