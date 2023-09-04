import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());

app.post('/getDecision', (req, res) => {
  const { loanAmount } = req.body.businessDetails;
  const { preAssessment } = req.body;

  if (preAssessment === 100) {
    res.status(200).json({
      data:
        'Congratulations! You are eligible for 100% loan approval on your requested amount of Rs.' +
        loanAmount +
        '/- only. Contact us for more details.',
      type: 'success',
    });
  } else if (preAssessment === 60) {
    res.status(200).json({
      data:
        'Voila! You are eligible for 60% of the requested loan amount that is Rs.' +
        loanAmount * 0.6 +
        '/- only. Contact us for more details.',
      type: 'success',
    });
  } else {
    res.status(200).json({
      data:
        'Sorry! You are not eligible for any loan approval on your requested amount of Rs.' +
        loanAmount +
        '/- only. Contact us for more details.',
      type: 'error',
    });
  }
});

app.get('/', (req, res) => {
  res.send('Hey this is my API running 🥳');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
