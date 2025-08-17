// Handles navigation and overlay logic for the How to Join section
export function setupHowToJoinNav(infoScreens) {
    const link = document.querySelector('a[href="#howtojoin"]');
    if (!link) return;
    link.addEventListener('click', function(e) {
        e.preventDefault();
        hideAllScreensSmooth(() => {
            showScreenSmooth(infoScreens.howtojoin);
        });
        document.querySelector('.main-nav').classList.remove('open');
    });
}
// ...existing code for hideAllScreensSmooth, showScreenSmooth, etc. should be imported/shared...
