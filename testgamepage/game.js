const buttonDOM = document.querySelector('button')
const pDOM = document.querySelector('p')

buttonDOM.addEventListener('click', () => {
    pDOM.innerText = 'test good!'
})
