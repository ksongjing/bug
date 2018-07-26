(function () {
    document.addEventListener('DOMContentLoaded', function () {
        var html = document.documentElement;
        var windowWidth = html.clientWidth;
        if (windowWidth <= 640) {
            html.style.fontSize = (windowWidth * 100) / 640 + 'px';
        }
    }, false);
})();