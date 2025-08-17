// Handles navigation and overlay logic for the Rules section
export function setupRulesNav(infoScreens) {
    const link = document.querySelector('a[href="#rules"]');
    if (!link) return;
    link.addEventListener('click', function(e) {
        e.preventDefault();
        hideAllScreensSmooth(() => {
            showScreenSmooth(infoScreens.rules);
        });
        document.querySelector('.main-nav').classList.remove('open');
    });
}
// ...existing code for hideAllScreensSmooth, showScreenSmooth, etc. should be imported/shared...
