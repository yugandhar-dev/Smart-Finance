const tesseract = require('../../lib/tesseract');

const totalRegex = new RegExp(/total[ $]+([\d]+\.[\d]{2})/ig);
const eftRegex = new RegExp(/eft[ $]+([\d]+\.[\d]{2})/ig);
const numericRegex = new RegExp(/([\d]+\.[\d]{2})/ig);

/**
 * Receive an image (that the user will upload) and extract text information from it
 */
exports.getReceiptValue = async (req, res) => {
  const { data: { text } } = await tesseract.worker.recognize(req.files.files.data);

  const eftMatch = text.match(eftRegex);
  if (eftMatch) {
    const numericText = eftMatch[0].match(numericRegex);

    if (numericText) {
      return res.status(200).json({
        success: true,
        value: numericText[0],
      });
    }
  }

  // The if above might have failed, just keep trying to find the total value
  const totalMatch = text.match(totalRegex);
  if (totalMatch) {
    const numericText = totalMatch[0].match(numericRegex);

    if (numericText) {
      return res.status(200).json({
        success: true,
        value: numericText[0],
      });
    }
  }

  return res.status(404).json({
    success: false,
  });
};
