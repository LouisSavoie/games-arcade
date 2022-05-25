const buttonDOM = document.querySelector('#test-button')
const pDOM = document.querySelector('#test')

buttonDOM.addEventListener('click', () => {
    pDOM.innerText = 'test good!'
})
