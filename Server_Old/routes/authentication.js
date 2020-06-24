import express from 'express';
import passwordHash from 'password-hash';
import accounts from '../models/accounts';
import { loginSchema, registerSchema, sanitized } from '../utils/validations';

const router = express.Router();

router.get('/resume', async (req, res) => {
	if (!req.session.user) return res.status(500).send();
	let acc = await accounts.findOne({ _id: req.session.user });
	if(!acc) return res.status(500).send();
	res.json(acc);
});

router.post('/register', async (req, res) => {
	const form = req.body.form;
	const valid = await registerSchema.isValid(form);
	if(!valid) return res.status(500).json({ error: 'Error occured during validation on the server.' });
	if(!sanitized(form)) res.status(500).json({ error: 'Please avoid using HTML tags inside inputs.' });
	const acc = await accounts.findOne({ $or: [{ email: form.email }, { username: form.username }] });
	if(acc) return res.status(500).json({ error: 'Email or username already in use.' });
	const account = new accounts({
		username: form.username,
		email: form.email,
		password: passwordHash.generate(form.password),
		admin: null
	});
	const saved = await account.save();
	req.session.user = saved._id;
	res.json(saved);
});

router.post('/login', async(req, res) => {
	const form = req.body.form;
	const valid = await loginSchema.isValid(form);
	if(!valid) return res.status(500).json({ error: 'Error occured during validation on the server.' });
	if(!sanitized(form)) res.status(500).json({ error: 'Please avoid using HTML tags inside inputs.' });
	const acc = await accounts.findOne({ username: form.username});	
	if(!acc) return res.status(500).json({ error: `Username is not registered on this website.` });
	if (!passwordHash.verify(form.password, acc.password)) return res.status(500).json({ error: `Password is incorrect.` });
	req.session.user = acc._id;
	res.json(acc);
});	

export default router;