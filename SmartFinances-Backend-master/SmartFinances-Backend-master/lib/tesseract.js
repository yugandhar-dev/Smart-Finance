const { createWorker } = require('tesseract.js');

const worker = createWorker();

const initWorker = async () => {
  await worker.load();
  await worker.loadLanguage('eng');
  await worker.initialize('eng');
};

module.exports = {
  initWorker,
  worker,
};
