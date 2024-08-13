import express from 'express';
import mfController from '../../controller/mfController.js';

const router = express.Router();

router.get('/topMf', mfController.topMf);

router.get('/filteredMF', mfController.filteredmf);

router.get('/analyze', mfController.analyze);

router.get('/goal', mfController.goal);

router.post('./mutualFund', mfController.mutualFund );
export default router;
