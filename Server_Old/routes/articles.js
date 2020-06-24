import express from 'express';
import articles from '../models/articles';
const router = express.Router();
import { newsSchema, sanitized, isAdmin, unallowedCharacters } from '../utils/validations';

router.get('/getCountedNews', async(req,res) => {
  const number = await articles.estimatedDocumentCount({});
  res.json(number);
});

router.get('/fetchOne/:slug', async(req, res) => {
  articles.findOne({ slug: req.params.slug }).populate('author')
  .then((doc) => res.json(doc))
  .catch(() => res.status(500).send())
});

router.get('/fetchAll/:page', async (req, res) => {
  const result = await articles.find({}, null, { skip: parseInt(req.params.page - 1) * 10, limit: 10}).sort({ date: -1 }).populate('author');
  res.json(result);
});

router.post('/create', async (req, res) => {
  const form = req.body.form;
  const valid = await newsSchema.isValid(form);
  if(!req.session.user) return res.json({ error: 'You must be logged in in order to post articles.'});
  if(!isAdmin(req.session.user, 1)) return res.status(500).json({ error: `Only administrators can post articles.` });
  if(!valid) return res.status(500).json({ error: 'Error occured during validation on the server.' });
	if(!sanitized({ title: form.title })) res.status(500).json({ error: 'Please avoid using HTML tags inside inputs.' });
  if(unallowedCharacters([form.title], ['#', '?', '&'])) return res.status(500).json({ error: `Please avoid using '#, ?, &' in title.` });
  const article = new articles({
		title: form.title,
		shortContent: form.shortContent,
		fullContent: form.fullContent,
    author: req.session.user,
    date: new Date(),
    slug: form.title.split(" ").join("-")
	});
  article.save(() => res.status(200).send()); 
});

export default router;