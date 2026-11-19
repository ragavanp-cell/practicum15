function applyTheme(mode, sourceLabel) {
    const lightBtn = document.getElementById('lightBtn');
    const darkBtn = document.getElementById('darkBtn');
    const statusText = document.getElementById('themeStatus');

    if (mode === 'dark') {
        document.body.classList.add('dark-theme');
        darkBtn.classList.add('active');
        lightBtn.classList.remove('active');
    } else {
        document.body.classList.remove('dark-theme');
        lightBtn.classList.add('active');
        darkBtn.classList.remove('active');
    }

    statusText.textContent = `Active Theme: ${mode.toUpperCase()} (${sourceLabel})`;
}

function setTheme(selectedMode) {
    localStorage.setItem('trainsphere_theme', selectedMode);
    applyTheme(selectedMode, 'User Selected');
}

function initTheme() {
    const savedTheme = localStorage.getItem('trainsphere_theme');

    if (savedTheme) {
        applyTheme(savedTheme, 'Saved Preference');
    } else {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        applyTheme(prefersDark ? 'dark' : 'light', 'System Preference Fallback');
    }
}

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('trainsphere_theme')) {
        applyTheme(e.matches ? 'dark' : 'light', 'System Preference Fallback');
    }
});

initTheme();
