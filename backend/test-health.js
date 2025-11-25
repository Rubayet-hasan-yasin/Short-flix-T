import http from 'http';

const testHealthEndpoint = () => {
  const options = {
    hostname: 'localhost',
    port: 8000,
    path: '/health',
    method: 'GET'
  };

  const req = http.request(options, (res) => {
    let data = '';
    
    res.on('data', (chunk) => {
      data += chunk;
    });
    
    res.on('end', () => {
      console.log('✅ Health check endpoint test results:');
      console.log(`Status Code: ${res.statusCode}`);
      console.log(`Response: ${data}`);
    });
  });

  req.on('error', (err) => {
    console.error('❌ Error testing health endpoint:', err);
  });

  req.end();
};

testHealthEndpoint();