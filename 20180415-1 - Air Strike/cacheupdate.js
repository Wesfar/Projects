
function updateSite(event) {
    window.applicationCache.swapCache();
}

window.applicationCache.addEventListener('updateready',
    updateSite, false);
