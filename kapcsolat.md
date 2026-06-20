---
layout: default
title: Kapcsolat
---
<div class="container page-container">
    <a href="{{ '/' | relative_url }}" class="btn btn-outline back-btn">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 20px; height: 20px; margin-right: 8px;"><path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
        Vissza a főoldalra
    </a>
    
    <h1 class="page-title">Kapcsolat</h1>
    <p class="page-subtitle">Lépjen velünk kapcsolatba! Kérdése van? Csapatunk készséggel áll rendelkezésére.</p>

    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; margin-top: 3rem;">
        <div>
            <h3>Elérhetőségeink</h3>
            <ul style="list-style: none; padding: 0; margin-top: 1.5rem;">
                <li style="margin-bottom: 1rem; display: flex; align-items: center; gap: 1rem;">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 24px; height: 24px; color: var(--color-primary);"><path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                    <span>hello@crmbazis.hu</span>
                </li>
                <li style="margin-bottom: 1rem; display: flex; align-items: center; gap: 1rem;">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 24px; height: 24px; color: var(--color-primary);"><path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                    <span>+36 1 234 5678</span>
                </li>
                <li style="margin-bottom: 1rem; display: flex; align-items: center; gap: 1rem;">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 24px; height: 24px; color: var(--color-primary);"><path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                    <span>1051 Budapest, Példa utca 12.</span>
                </li>
            </ul>
        </div>
        <div>
            <form class="contact-form" style="background: var(--color-surface); padding: 2rem; border-radius: 12px; border: 1px solid var(--color-border);">
                <div class="form-group" style="margin-bottom: 1rem;">
                    <label for="name" style="display: block; margin-bottom: 0.5rem;">Név</label>
                    <input type="text" id="name" class="form-input" style="width: 100%; padding: 0.75rem; border-radius: 6px; border: 1px solid var(--color-border); background: var(--color-bg); color: var(--color-text);" required>
                </div>
                <div class="form-group" style="margin-bottom: 1rem;">
                    <label for="email" style="display: block; margin-bottom: 0.5rem;">Email</label>
                    <input type="email" id="email" class="form-input" style="width: 100%; padding: 0.75rem; border-radius: 6px; border: 1px solid var(--color-border); background: var(--color-bg); color: var(--color-text);" required>
                </div>
                <div class="form-group" style="margin-bottom: 1.5rem;">
                    <label for="message" style="display: block; margin-bottom: 0.5rem;">Üzenet</label>
                    <textarea id="message" class="form-input" rows="4" style="width: 100%; padding: 0.75rem; border-radius: 6px; border: 1px solid var(--color-border); background: var(--color-bg); color: var(--color-text);" required></textarea>
                </div>
                <button type="submit" class="btn btn-primary w-full">Küldés</button>
            </form>
        </div>
    </div>
</div>
