const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

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
        layout = layout.replace(/{{ site\.baseurl }}/g, '');
        
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

        const githubToken = process.env.GITHUB_PAT;
        if (!githubToken) {
            console.error('Missing GITHUB_PAT environment variable');
            throw new Error('A szerver nincs megfelelően konfigurálva a GitHub integrációhoz.');
        }

        const response = await fetch('https://api.github.com/repos/Monesz1/vtiger-opensoft/dispatches', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${githubToken}`,
                'Accept': 'application/vnd.github+json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                event_type: 'display-contact',
                client_payload: {
                    subdomain: subdomain,
                    company_name: company_name,
                    last_name: last_name,
                    first_name: first_name,
                    email: email,
                    mobile: mobile
                }
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('GitHub API Error:', errorText);
            throw new Error(`GitHub API responded with status ${response.status}`);
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
