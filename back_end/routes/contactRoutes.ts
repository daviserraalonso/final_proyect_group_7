import express from 'express';
import { handleContactForm } from '../controllers/contactController';

const router = express.Router();

// route to work with contact form
router.post('/send-email', handleContactForm);

module.exports = router;

