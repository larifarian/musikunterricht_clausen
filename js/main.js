/**
 * Main JavaScript - Laedt dynamische Inhalte aus JSON-Dateien
 */

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });

        // Menu schliessen wenn Link geklickt wird
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }

    // Hash-Scroll-Fix: Scrolle zur richtigen Position wenn URL einen Hash enthaelt
    if (window.location.hash) {
        // Warte kurz, damit die Seite vollstaendig geladen ist
        setTimeout(() => {
            const hash = window.location.hash;
            const element = document.querySelector(hash);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }, 100);
    }
});

/**
 * Laedt eine JSON-Datei und gibt die Daten zurueck
 * @param {string} url - Pfad zur JSON-Datei
 * @returns {Promise<Object>} - Die geladenen Daten
 */
async function loadJSON(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Fehler beim Laden von ${url}:`, error);
        return null;
    }
}

/**
 * Formatiert ein Datum im deutschen Format
 * @param {string} dateString - Datum im Format YYYY-MM-DD
 * @returns {string} - Formatiertes Datum
 */
function formatDate(dateString) {
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    const date = new Date(dateString);
    return date.toLocaleDateString('de-DE', options);
}

/**
 * Rendert die Leistungen in den Container
 * @param {Array} leistungen - Array von Leistungsobjekten
 */
function renderLeistungen(leistungen) {
    const container = document.getElementById('leistungen-container');
    if (!container || !leistungen || leistungen.length === 0) {
        container.innerHTML = '<p class="text-center text-gray-500 col-span-full">Keine Leistungen gefunden.</p>';
        return;
    }

    container.innerHTML = leistungen.map(leistung => `
        <a href="${leistung.link || '#'}" class="block bg-white p-6 rounded-xl shadow-md card-hover cursor-pointer group">
            <h3 class="text-xl font-semibold mb-3 text-gray-800 group-hover:text-brand-600 transition">${leistung.titel}</h3>
            <p class="text-gray-600 mb-4">${leistung.beschreibung}</p>
            <span class="inline-flex items-center text-brand-600 font-medium group-hover:text-brand-700 transition">
                Mehr erfahren
                <svg class="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
            </span>
        </a>
    `).join('');
}

/**
 * Rendert die Termine in den Container
 * @param {Array} termine - Array von Terminobjekten
 */
function renderTermine(termine) {
    const container = document.getElementById('termine-container');
    if (!container) return;

    if (!termine || termine.length === 0) {
        container.innerHTML = '<p class="text-center text-gray-500">Keine aktuellen Termine.</p>';
        return;
    }

    // Sortiere Termine nach Datum (aufsteigend)
    const sortedTermine = [...termine].sort((a, b) =>
        new Date(a.datum) - new Date(b.datum)
    );

    // Filtere vergangene Termine heraus (optional)
    const heute = new Date();
    heute.setHours(0, 0, 0, 0);
    const aktuelleTermine = sortedTermine.filter(t => new Date(t.datum) >= heute);

    if (aktuelleTermine.length === 0) {
        container.innerHTML = '<p class="text-center text-gray-500">Keine aktuellen Termine.</p>';
        return;
    }

    container.innerHTML = aktuelleTermine.map(termin => `
        <div class="bg-gray-50 border-l-4 border-brand-500 p-6 rounded-r-lg shadow-sm card-hover">
            <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h3 class="text-lg font-semibold text-gray-800">${termin.titel}</h3>
                    <p class="text-gray-600 mt-1">${termin.beschreibung}</p>
                    ${termin.ort ? `<p class="text-sm text-gray-500 mt-2">
                        <span class="inline-flex items-center">
                            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                            </svg>
                            ${termin.ort}
                        </span>
                    </p>` : ''}
                </div>
                <div class="text-right">
                    <div class="bg-brand-100 text-brand-700 px-4 py-2 rounded-lg inline-block">
                        <div class="text-sm font-medium">${formatDate(termin.datum)}</div>
                        ${termin.uhrzeit ? `<div class="text-xs">${termin.uhrzeit}</div>` : ''}
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

/**
 * Initialisiert die Seite und laedt alle Daten
 */
async function init() {
    // Lade Leistungen
    const leistungenData = await loadJSON('data/leistungen.json');
    if (leistungenData && leistungenData.leistungen) {
        renderLeistungen(leistungenData.leistungen);
    } else {
        // Wenn Laden fehlschlaegt oder Datei leer, zeige leeren Zustand
        renderLeistungen([]);
    }

    // Lade Termine
    const termineData = await loadJSON('data/termine.json');
    if (termineData && termineData.termine) {
        renderTermine(termineData.termine);
    } else {
        // Wenn Laden fehlschlaegt oder Datei leer, zeige leeren Zustand
        renderTermine([]);
    }
}

// Starte die Initialisierung wenn DOM geladen ist
document.addEventListener('DOMContentLoaded', init);
