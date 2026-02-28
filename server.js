const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

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
app.get('/shop', (req, res) => res.send(renderJekyll(path.join(__dirname, 'shop.md'))));
app.get('/learn', (req, res) => res.send(renderJekyll(path.join(__dirname, 'learn.md'))));
app.get('/about', (req, res) => res.send(renderJekyll(path.join(__dirname, 'about.md'))));

const PORT = 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Preview server running on port ${PORT}`);
});
