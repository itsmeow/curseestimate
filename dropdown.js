function dropdown() {
    document.getElementById("main-dropdown").classList.toggle("show");
    document.getElementById("dropbutton").classList.toggle("brighten");
}

window.onclick = function(e) {
    if (!e.target.matches('.header-dropdown-button')) {
        var dropdownE = document.getElementById("main-dropdown");
        var buttonE = document.getElementById("dropbutton");
        if (dropdownE.classList.contains('show')) {
            dropdownE.classList.remove('show');
        }
        if (buttonE.classList.contains('brighten')) {
            buttonE.classList.remove('brighten');
        }
    }
}