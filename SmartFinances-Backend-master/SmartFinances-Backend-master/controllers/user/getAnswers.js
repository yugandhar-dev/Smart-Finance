const question = require('../../models/questionnaire');

exports.Answers = async (req, res) => {
  try {
    const data = await question.find();
    return res.json(data);
  } catch (error) {
    return res.status(400).json({
      error: 'Not able to store the answer',
    });
  }
};
