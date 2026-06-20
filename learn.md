---
layout: default
title: Learn
---
<div class="container page-container">
    <a href="{{ '/' | relative_url }}" class="btn btn-outline back-btn">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 20px; height: 20px; margin-right: 8px;"><path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
        Vissza a főoldalra
    </a>
    
    <h1 class="page-title">CRM Rendszerek: Előnyök és Hátrányok</h1>
    
    <div class="content-block">
        <h2>Előnyök (Pro)</h2>
        <ul>
            <li><strong>Központosított adatok:</strong> Minden ügyfélinformáció egyetlen, biztonságos helyen található.</li>
            <li><strong>Automatizált munkafolyamatok:</strong> Kevesebb adminisztráció, több idő az érdemi munkára.</li>
            <li><strong>Skálázhatóság:</strong> A rendszer együtt nő a vállalkozásával.</li>
            <li><strong>Jobb konverzió:</strong> A leadek hatékonyabb nyomon követése növeli a sikeres üzletkötések arányát.</li>
        </ul>

        <h2>Hátrányok (Kontra)</h2>
        <ul>
            <li><strong>Bevezetési idő:</strong> A rendszer testreszabása és a kollégák betanítása időt igényel.</li>
            <li><strong>Kezdeti költségek:</strong> Bár hosszú távon megtérül, a bevezetés befektetést igényel.</li>
            <li><strong>Adatminőség függőség:</strong> A rendszer csak annyira jó, amennyire a belevitt adatok pontosak.</li>
        </ul>

        <div style="margin-top: 3rem; text-align: center;">
            <button id="demoBtn" class="btn btn-primary btn-large">Show me a demo</button>
        </div>
    </div>
</div>

<!-- Video Modal -->
<div id="videoModal" class="modal-overlay">
    <div class="modal-content video-modal">
        <button class="modal-close" id="videoModalClose" aria-label="Bezárás">&times;</button>
        <div class="video-container">
            <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="CRM Demo" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
    </div>
</div>
