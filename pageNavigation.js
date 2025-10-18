const projName = "/jprendergast.github.io/"

// main on load function
addEventListener("load", (event) => {
    if (document.URL.endsWith("/jprendergast.github.io/")) {
        window.location.href = projName + "index.html";
    }

    constructHeader();

    if (document.URL.includes("index")) {
        initializeReferences();
    }

    if (document.URL.includes("#projects")) {
        const elementPosition = document.getElementById('projectsDivider').getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({
            top: elementPosition - 100,
            behavior: 'smooth' // Enables smooth scrolling
        });
    }

    if (typeof createParallax === 'function') {
        // if background script loaded
        if (document.URL.includes("index") || document.URL.includes("resume")) createParallax();
        else projectScatter();
    }
})

function constructHeader() {
    let navbar = document.getElementById("headerHolder");
    navbar.className = "navbarHolder";
    navbar.innerHTML =
        '      <div id="navbar" class="navbar">\n' +
        '        <p>James Prendergast</p>\n' +
        '        <div style="flex-grow: 1;">\n' +
        '          <div class="pages">\n' +
        '            <\n' +
        '            <button onclick="toAbout()">About</button>\n' +
        '            |\n' +
        '            <button onclick="toProjects()">Projects</button>\n' +
        '            |\n' +
        '            <button onclick="toResume()">Resume</button>\n' +
        '          </div>\n' +
        '          <div class="icons">\n' +
        '            <|\n' +
        '            <a href="https://thetwofingeredglove.itch.io/" target="_blank">\n' +
        '              <object data="' + projName + 'Resources/itchLogo.svg" type="image/svg+xml" style="height: 57px;"></object>\n' +
        '            </a>\n' +
        '            |\n' +
        '            <a href="mailto:jmprendergast@wpi.edu?subject=Reaching Out from Portfolio" target="_blank">\n' +
        '              <object data="' + projName + 'Resources/emailIcon.svg" type="image/svg+xml" style="height: 69px; padding-top: 2px"></object>\n' +
        '            </a>\n' +
        '             |\n' +
        '            <a href="https://www.linkedin.com/in/james-prendergast-a41119335/" target="_blank">\n' +
        '              <object data="' + projName + 'Resources/linkedInLogo.svg" type="image/svg+xml" style="height: 69px; padding-top: 2px"></object>\n' +
        '            </a>\n' +
        '            |>\n' +
        '          </div>\n' +
        '        </div>\n' +
        '      </div>\n' +
        '      <div style="background-color:var(--mortuum);padding:10px;box-shadow: 0px 10px rgba(0, 0, 0, 0.75);z-index: 2;"></div>\n';
}

function toAbout() {
    if (!document.URL.includes("index")) {
        window.location.href = projName + "index.html";
    } else {
        window.scroll({
            top: 0,
            behavior: 'smooth'
        });
    }
}

function toProjects() {
    if (!document.URL.includes("index")) {
        window.location.href = projName + "index.html#projects";
    } else {
        const elementPosition = document.getElementById('projectsDivider').getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({
            top: elementPosition - 100,
            behavior: 'smooth' // Enables smooth scrolling
        });
    }
}

function toResume() {
    if (!document.URL.includes("resume")) window.location.href = projName + "resume.html";
}

function toProjectPage(project) {

}

function getCurrentPage() {

}