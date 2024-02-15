let apiUrl
const apiUrls = {
    // MUST CHANGE PRODUCTION URL WHEN DEPLOYING
	production: 'https://health-api-rlk.fly.dev',
	development: 'http://localhost:8000',
}

if (window.location.hostname === 'localhost') {
	apiUrl = apiUrls.development
} else {
	apiUrl = apiUrls.production
}

export default apiUrl
