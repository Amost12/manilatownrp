// Handles navigation and overlay logic for the Gallery section
export function setupGalleryNav(infoScreens) {
    const link = document.querySelector('a[href="#gallery"]');
    if (!link) return;
    link.addEventListener('click', function(e) {
        e.preventDefault();
        hideAllScreensSmooth(() => {
            showScreenSmooth(infoScreens.gallery);
        });
        document.querySelector('.main-nav').classList.remove('open');
    });
}
// ...existing code for hideAllScreensSmooth, showScreenSmooth, etc. should be imported/shared...
