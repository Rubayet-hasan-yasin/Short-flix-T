import { Router } from 'express';
import { getShorts, createShort, toggleFavorite, getFavorites, getFavoriteIds } from '../controllers/videoController';

const router = Router();

// Video routes
router.get('/shorts', getShorts);
router.post('/shorts', createShort);
router.post('/shorts/:id/favorite', toggleFavorite);

// Favorites routes
router.get('/favorites', getFavorites);
router.get('/favorite-ids', getFavoriteIds);

// Catch-all route for unknown API endpoints
router.all('*', (req, res) => {
  console.log(`Unknown API endpoint accessed: ${req.method} ${req.path}`);
  res.status(404).json({
    error: 'API endpoint not found',
    path: req.path,
    method: req.method,
    availableEndpoints: [
      'GET /api/shorts',
      'POST /api/shorts', 
      'POST /api/shorts/:id/favorite',
      'GET /api/favorites',
      'GET /api/favorite-ids'
    ]
  });
});

export default router;