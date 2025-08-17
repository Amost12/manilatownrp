// Handles navigation and overlay logic for the Features section
export function setupFeaturesNav(infoScreens) {
    const link = document.querySelector('a[href="#features"]');
    if (!link) return;
    link.addEventListener('click', function(e) {
        e.preventDefault();
        hideAllScreensSmooth(() => {
            showScreenSmooth(infoScreens.features);
        });
        document.querySelector('.main-nav').classList.remove('open');
    });
}
// ...existing code for hideAllScreensSmooth, showScreenSmooth, etc. should be imported/shared...
