require('dotenv').config();
const express = require('express');
const fs = require('fs');
const path = require('path');
const https = require('https');
const app = express();

// Robust HTTP/HTTPS POST helper mimicking fetch API to ensure compatibility across all Node versions
function requestHttps(urlStr, method, data, customHeaders = {}) {
    return new Promise((resolve, reject) => {
        try {
            const url = new URL(urlStr);
            const payload = data ? JSON.stringify(data) : null;
            
            const headers = {
                'Content-Type': 'application/json',
                ...customHeaders
            };
            
            if (payload) {
                headers['Content-Length'] = Buffer.byteLength(payload);
            }

            const options = {
                hostname: url.hostname,
                port: url.port || (url.protocol === 'https:' ? 443 : 80),
                path: url.pathname + url.search,
                method: method.toUpperCase(),
                headers: headers
            };

            const req = https.request(options, (res) => {
                let body = '';
                res.on('data', (chunk) => body += chunk);
                res.on('end', () => {
                    resolve({
                        ok: res.statusCode >= 200 && res.statusCode < 300,
                        status: res.statusCode,
                        headers: res.headers,
                        text: async () => body,
                        json: async () => {
                            if (!body) return {};
                            return JSON.parse(body);
                        }
                    });
                });
            });

            req.on('error', (err) => {
                reject(err);
            });

            if (payload) {
                req.write(payload);
            }
            req.end();
        } catch (err) {
            reject(err);
        }
    });
}

// Middleware
app.use(express.json());

// Serve static assets
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Simple Jekyll Liquid Tag Simulator for Preview Purposes
function renderJekyll(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Strip YAML frontmatter
        content = content.replace(/---[\s\S]*?---/, '');
        
        let layout = fs.readFileSync(path.join(__dirname, '_layouts', 'default.html'), 'utf8');
        let header = fs.readFileSync(path.join(__dirname, '_includes', 'header.html'), 'utf8');
        let footer = fs.readFileSync(path.join(__dirname, '_includes', 'footer.html'), 'utf8');
        
        // Inject includes and content
        layout = layout.replace('{% include header.html %}', header);
        layout = layout.replace('{% include footer.html %}', footer);
        layout = layout.replace('{{ content }}', content);
        
        // Replace basic Liquid variables
        layout = layout.replace(/{{ site\.title }}/g, 'CRM Bázis');
        layout = layout.replace(/{{ site\.description }}/g, 'Modern, magyar nyelvű CRM platform.');
        layout = layout.replace(/{{ site\.api_endpoint }}/g, 'https://jsonplaceholder.typicode.com/posts');
        
        // Handle relative_url filter
        layout = layout.replace(/{{ '([^']+)' \| relative_url }}/g, '$1');
        
        // Handle page.title
        layout = layout.replace(/{% if page\.title %}{{ page\.title }} \| {% endif %}/g, '');
        
        return layout;
    } catch (e) {
        return `<h1>Preview Error</h1><p>${e.message}</p>`;
    }
}

// Routes
app.get('/', (req, res) => res.send(renderJekyll(path.join(__dirname, 'index.html'))));
app.get('/index.html', (req, res) => res.send(renderJekyll(path.join(__dirname, 'index.html'))));

app.get('/shop', (req, res) => res.send(renderJekyll(path.join(__dirname, 'shop.md'))));
app.get('/shop.html', (req, res) => res.send(renderJekyll(path.join(__dirname, 'shop.md'))));

app.get('/learn', (req, res) => res.send(renderJekyll(path.join(__dirname, 'learn.md'))));
app.get('/learn.html', (req, res) => res.send(renderJekyll(path.join(__dirname, 'learn.md'))));

app.get('/about', (req, res) => res.send(renderJekyll(path.join(__dirname, 'about.md'))));
app.get('/about.html', (req, res) => res.send(renderJekyll(path.join(__dirname, 'about.md'))));

app.get('/kapcsolat', (req, res) => res.send(renderJekyll(path.join(__dirname, 'kapcsolat.md'))));
app.get('/kapcsolat.html', (req, res) => res.send(renderJekyll(path.join(__dirname, 'kapcsolat.md'))));

app.get('/a-csapatrol', (req, res) => res.send(renderJekyll(path.join(__dirname, 'a-csapatrol.md'))));
app.get('/a-csapatrol.html', (req, res) => res.send(renderJekyll(path.join(__dirname, 'a-csapatrol.md'))));

app.get('/alap-csomag', (req, res) => res.send(renderJekyll(path.join(__dirname, 'alap-csomag.html'))));
app.get('/alap-csomag.html', (req, res) => res.send(renderJekyll(path.join(__dirname, 'alap-csomag.html'))));

app.get('/pro-csomag', (req, res) => res.send(renderJekyll(path.join(__dirname, 'pro-csomag.html'))));
app.get('/pro-csomag.html', (req, res) => res.send(renderJekyll(path.join(__dirname, 'pro-csomag.html'))));

app.get('/premium-csomag', (req, res) => res.send(renderJekyll(path.join(__dirname, 'premium-csomag.html'))));
app.get('/premium-csomag.html', (req, res) => res.send(renderJekyll(path.join(__dirname, 'premium-csomag.html'))));

app.get('/araink', (req, res) => res.send(renderJekyll(path.join(__dirname, 'araink.html'))));
app.get('/araink.html', (req, res) => res.send(renderJekyll(path.join(__dirname, 'araink.html'))));

app.get('/tudasbazis', (req, res) => res.send(renderJekyll(path.join(__dirname, 'tudasbazis.html'))));
app.get('/tudasbazis.html', (req, res) => res.send(renderJekyll(path.join(__dirname, 'tudasbazis.html'))));

app.get('/regisztracio', (req, res) => res.send(renderJekyll(path.join(__dirname, 'regisztracio.html'))));
app.get('/regisztracio.html', (req, res) => res.send(renderJekyll(path.join(__dirname, 'regisztracio.html'))));

app.get('/ajanlatkeres', (req, res) => res.redirect(301, '/regisztracio.html'));
app.get('/ajanlatkeres.html', (req, res) => res.redirect(301, '/regisztracio.html'));

// API Routes
app.post('/api/register', async (req, res) => {
    try {
        const { company_name, last_name, first_name, email, mobile } = req.body;
        
        if (!company_name || !last_name || !first_name || !email || !mobile) {
            return res.status(400).json({ error: 'Minden mező kitöltése kötelező.' });
        }

        // Generate subdomain from company name
        const cleanCompanyName = company_name.toLowerCase().replace(/[^a-z0-9]/g, '');
        const subdomain = `${cleanCompanyName}.opensoft.hu`;

        // Log the registration
        console.log('New Registration Received:', {
            subdomain,
            company_name,
            last_name,
            first_name,
            email,
            mobile
        });

        // Call the n8n webhook
        try {
            const n8nWebhookUrl = 'https://n8n.opensoft.hu/webhook/aa7b377c-dfec-4a07-8561-996d022d2a9e';
            const n8nResponse = await requestHttps(n8nWebhookUrl, 'POST', {
                subdomain,
                company_name,
                last_name,
                first_name,
                email,
                mobile,
                "Cégnév": company_name,
                "Vezetéknév": last_name,
                "Keresztnév": first_name,
                "Email cím": email,
                "Telefonszám": mobile,
                "cegnev": company_name,
                "vezeteknev": last_name,
                "keresztnev": first_name,
                "email_cim": email,
                "telefonszam": mobile
            });
            if (!n8nResponse.ok) {
                console.error('n8n Webhook error:', n8nResponse.status, await n8nResponse.text().catch(() => ''));
            } else {
                console.log('n8n Webhook call successful');
            }
        } catch (webhookError) {
            console.error('Error calling n8n Webhook:', webhookError);
        }

        // Call GitHub REST API
        const githubToken = process.env.GITHUB_TOKEN;
        if (githubToken) {
            try {
                const githubResponse = await requestHttps('https://api.github.com/repos/Monesz1/vtiger-opensoft/dispatches', 'POST', {
                    event_type: 'display-contact',
                    client_payload: {
                        subdomain,
                        company_name,
                        last_name,
                        first_name,
                        email,
                        mobile
                    }
                }, {
                    'Authorization': `Bearer ${githubToken}`,
                    'Accept': 'application/vnd.github+json',
                    'User-Agent': 'vTiger-Opensoft-App'
                });

                if (!githubResponse.ok) {
                    const errorText = await githubResponse.text();
                    console.error('GitHub API error:', githubResponse.status, errorText);
                } else {
                    console.log('GitHub API call successful');
                }
            } catch (githubError) {
                console.error('Error calling GitHub API:', githubError);
            }
        } else {
            console.warn('GITHUB_TOKEN is not set in environment variables.');
        }

        res.json({ success: true, message: 'Sikeres regisztráció!', subdomain });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Hiba történt a regisztráció során. Kérjük, próbálja újra később.' });
    }
});

const PORT = 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Preview server running on port ${PORT}`);
});
