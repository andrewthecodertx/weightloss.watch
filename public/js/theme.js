// Apply theme to the document
const applyTheme = (theme) => {
    const htmlElement = document.documentElement;
    htmlElement.classList.remove("light", "dark", "system");

    if (theme === "system") {
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        htmlElement.classList.add(prefersDark ? "dark" : "light");
    } else {
        htmlElement.classList.add(theme);
    }
};

// Global function to toggle theme (called from Alpine.js)
window.toggleTheme = async function() {
    const themes = ['light', 'dark', 'system'];
    let currentTheme = localStorage.getItem('theme') || 'system';
    const currentIndex = themes.indexOf(currentTheme);
    const nextTheme = themes[(currentIndex + 1) % themes.length];

    // Update localStorage
    localStorage.setItem('theme', nextTheme);

    // Apply theme immediately
    applyTheme(nextTheme);

    // Update Alpine.js component state
    const themeButton = document.querySelector('[x-data*="theme"]');
    if (themeButton && themeButton.__x) {
        themeButton.__x.$data.theme = nextTheme;
    }

    // Save to server if user is logged in
    try {
        const response = await fetch('/api/settings/theme', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ theme: nextTheme }),
        });

        if (!response.ok) {
            console.error('Failed to save theme preference to server');
        }
    } catch (error) {
        console.error('Error saving theme:', error);
    }
};

document.addEventListener("DOMContentLoaded", () => {
    const themeSelect = document.getElementById("theme");

    // Initial theme application based on server-rendered value or localStorage
    // The server-rendered value is preferred if available
    const initialTheme = themeSelect ? themeSelect.value : localStorage.getItem("theme") || "system";

    // Sync localStorage with initial theme to prevent double-click issue
    if (!localStorage.getItem("theme")) {
        localStorage.setItem("theme", initialTheme);
    }

    applyTheme(initialTheme);

    if (themeSelect) {
        themeSelect.addEventListener("change", (event) => {
            const selectedTheme = event.target.value;
            localStorage.setItem("theme", selectedTheme);
            applyTheme(selectedTheme);
        });
    }

    // Listen for changes in system preference if current theme is 'system'
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
        if ((themeSelect && themeSelect.value === "system") || localStorage.getItem("theme") === "system") {
            applyTheme("system");
        }
    });
});
