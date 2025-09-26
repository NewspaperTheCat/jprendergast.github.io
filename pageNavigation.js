function toAbout() {
    if (window.name !== "main") {
        window.location.href = "index.html";
        window.name = "main";
    } else {
        window.scroll({
            top: 0,
            behavior: 'smooth'
        });
    }
}

function toProjects() {
    if (window.name !== "main") {
        window.location.href = "index.html";
        window.name = "main";
    }
    const elementPosition = document.getElementById('projectsDivider').getBoundingClientRect().top + window.pageYOffset;
    window.scrollTo({
        top: elementPosition - 100,
        behavior: 'smooth' // Enables smooth scrolling
    });
}

function toResume() {
    window.location.href = "resume.html";
    window.name = "resume";
}

function toProjectPage(project) {

}

function getCurrentPage() {

}