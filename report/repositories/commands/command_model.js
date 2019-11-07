
const report = () => {
  const model = {
    report_id: '',
    title: '',
    category: '',
    location: '',
    description: '',
    author: '',
    status: '',
    created_at: ''
  };
  return model;
};


const resultReport = () => {
  const model = {
    reportId: '',
    title: '',
    category: '',
    location: '',
    description: '',
    author: '',
    status: '',
    createdAt: ''
  };
  return model;
};

module.exports = {
  report,
  resultReport
};
