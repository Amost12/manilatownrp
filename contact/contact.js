// Handles navigation and overlay logic for the Contact section
export function setupContactNav(infoScreens) {
    const link = document.querySelector('a[href="#contact"]');
    if (!link) return;
    link.addEventListener('click', function(e) {
        e.preventDefault();
        hideAllScreensSmooth(() => {
            showScreenSmooth(infoScreens.contact);
        });
        document.querySelector('.main-nav').classList.remove('open');
    });
}
// ...existing code for hideAllScreensSmooth, showScreenSmooth, etc. should be imported/shared...
