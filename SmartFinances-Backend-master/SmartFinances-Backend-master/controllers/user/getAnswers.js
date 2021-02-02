const question = require('../../models/questionnaire');

exports.Answers = (req, res) => {
  question.find((err, questions) => {
    if (err) {
      return res.status(400).json({
        error: 'Not able to store the answer',
      });
    }
    res.json({ question });
  });
};
