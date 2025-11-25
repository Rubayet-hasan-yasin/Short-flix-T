import { Router } from 'express';
import { getShorts, createShort, toggleFavorite, getFavorites, getFavoriteIds } from '../controllers/videoController';

const router = Router();

router.get('/shorts', getShorts);
router.post('/shorts', createShort);
router.post('/shorts/:id/favorite', toggleFavorite);
router.get('/favorites', getFavorites);
router.get('/favorite-ids', getFavoriteIds);

export default router;