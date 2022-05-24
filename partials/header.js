const headerDOM = document.querySelector('header')
const header = () => {
    return `
    <a href="/"><h1>Placeholder</h1></a>
    <nav>
        <a href="/testgamepage">NEW!</a>
        <a href="/feedback">Feedback</a>
        <a href="/devlog">Devlog</a>
    </nav>
    `
}
headerDOM.innerHTML = header()
