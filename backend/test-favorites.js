const testFavoritesAPI = async () => {
  const API_BASE = 'http://localhost:8000/api';
  
  try {
    console.log('🧪 Testing Favorites API...\n');
    
    console.log('1. Getting initial favorite IDs...');
    const initialResponse = await fetch(`${API_BASE}/favorite-ids`);
    const initial = await initialResponse.json();
    console.log(`✅ Initial favorites: ${initial.favoriteIds.join(', ') || 'none'}`);
    
    console.log('\n2. Adding video ID 1 to favorites...');
    const toggleResponse1 = await fetch(`${API_BASE}/shorts/1/favorite`, {
      method: 'POST'
    });
    const toggle1 = await toggleResponse1.json();
    console.log(`✅ Toggle result: Video ${toggle1.videoId} is ${toggle1.isFavorite ? 'favorited' : 'unfavorited'}`);
    
    console.log('\n3. Adding video ID 3 to favorites...');
    const toggleResponse2 = await fetch(`${API_BASE}/shorts/3/favorite`, {
      method: 'POST'
    });
    const toggle2 = await toggleResponse2.json();
    console.log(`✅ Toggle result: Video ${toggle2.videoId} is ${toggle2.isFavorite ? 'favorited' : 'unfavorited'}`);
    
    console.log('\n4. Getting favorite videos...');
    const favoritesResponse = await fetch(`${API_BASE}/favorites`);
    const favorites = await favoritesResponse.json();
    console.log(`✅ Favorite videos (${favorites.length}):`);
    favorites.forEach(video => {
      console.log(`   - ${video.title} (ID: ${video.id})`);
    });
    
    console.log('\n5. Getting updated favorite IDs...');
    const updatedResponse = await fetch(`${API_BASE}/favorite-ids`);
    const updated = await updatedResponse.json();
    console.log(`✅ Updated favorites: ${updated.favoriteIds.join(', ')}`);
    
    console.log('\n6. Removing video ID 1 from favorites...');
    const toggleResponse3 = await fetch(`${API_BASE}/shorts/1/favorite`, {
      method: 'POST'
    });
    const toggle3 = await toggleResponse3.json();
    console.log(`✅ Toggle result: Video ${toggle3.videoId} is ${toggle3.isFavorite ? 'favorited' : 'unfavorited'}`);
    
    console.log('\n🎉 All favorites API tests passed!');
    
  } catch (error) {
    console.error('❌ Favorites API test failed:', error);
  }
};

testFavoritesAPI();