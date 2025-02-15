const config = {
  groqApiKey: process.env.GROQ_API_KEY || '',
  websiteUrl: process.env.WEBSITE_URL || 'http://localhost:3000',
  appName: process.env.APP_NAME || 'Gita AI',
};

module.exports = config; 