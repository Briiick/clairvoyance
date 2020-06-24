import express from 'express';
import accounts from '../models/accounts';

const router = express.Router();

router.get('/getAccount', async (req, res) => {
  if (!req.session.user) return res.status(500);
  const acc = await accounts.findOne({ _id: req.session.user });
  if (!acc) return res.status(500).send();
  res.json(acc);
});

export default router;