const footerDOM = document.querySelector('footer')
const footer = () => {
    return `
    <span>Copyright © 2022 <a href="https://www.louissavoie.com" target="_blank" rel="noopener noreferrer">Louis Savoie</a></span>
    `
}
footerDOM.innerHTML = footer()