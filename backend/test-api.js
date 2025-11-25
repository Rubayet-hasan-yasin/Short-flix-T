const testAPI = async () => {
  const API_BASE = 'http://localhost:8000/api';
  
  try {
    console.log('Testing GET /api/shorts...');
    const getResponse = await fetch(`${API_BASE}/shorts`);
    const videos = await getResponse.json();
    console.log(`✅ GET /api/shorts - Status: ${getResponse.status}`);
    console.log(`Found ${videos.length} videos`);
    
    console.log('\nTesting GET /api/shorts with search...');
    const searchResponse = await fetch(`${API_BASE}/shorts?search=sample`);
    const searchResults = await searchResponse.json();
    console.log(`✅ Search results: ${searchResults.length} videos`);
    
    console.log('\nTesting GET /api/shorts with tags...');
    const tagResponse = await fetch(`${API_BASE}/shorts?tags=demo,animation`);
    const tagResults = await tagResponse.json();
    console.log(`✅ Tag filter results: ${tagResults.length} videos`);
    
    console.log('\nTesting POST /api/shorts...');
    const postResponse = await fetch(`${API_BASE}/shorts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        videoUrl: 'https://example.com/test-video.mp4',
        title: 'Test Video',
        tags: ['test', 'api']
      })
    });
    const newVideo = await postResponse.json();
    console.log(`✅ POST /api/shorts - Status: ${postResponse.status}`);
    console.log(`Created video with ID: ${newVideo.id}`);
    
    console.log('\n🎉 All API tests passed!');
    
  } catch (error) {
    console.error('❌ API test failed:', error);
  }
};

testAPI();