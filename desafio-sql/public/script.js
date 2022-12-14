const socket = io()

const addProd = document.querySelector('#addProd')
let dataArray = []

socket.on('msg', (data) => {
    console.log(data)
})
addProd.addEventListener('submit', (e) => {
    e.preventDefault()

    const newProd = {

        title: document.querySelector('#title').value,
        price: document.querySelector('#price').value,
        thumbnail: document.querySelector('#thumbnail').value
    }
    console.log(newProd)

    socket.emit('addNewProd', newProd)//enviando objeto mediante evento custom "addNewProd"

    document.querySelector('#title').value = '';
    document.querySelector('#price').value = '';
    document.querySelector('#thumbnail').value = '';
})


async function renderProducts(dataProds) {
    const template = await fetch('/templates/main.hbs');
    const textTemplate = await template.text();
    const functionTemplate = Handlebars.compile(textTemplate);
    const html = (functionTemplate({ products: dataProds }));

    document.querySelector('#productos').innerHTML = html;
}
socket.on('items', renderProducts)
//-------------------------------------------------
const chat = document.querySelector('#chat')
chat.addEventListener('submit', (e) => {
    e.preventDefault()
    if (document.querySelector('#email').value.length < 5) {
        alert('Porfavor escribí un mail válido')
    } else {
        const newMsg = {
            email: document.querySelector('#email').value,
            msg: document.querySelector('#mensaje').value,
            date: new Date()
        }
        socket.emit('addNewMsg', newMsg)
        document.querySelector('#mensaje').value = ''
    }

})
async function renderMessages(dataMsgs) {
    const template = await fetch('/templates/msgs.hbs');
    const textTemplate = await template.text();
    const functionTemplate = Handlebars.compile(textTemplate);
    const html = (functionTemplate({ mensajes: dataMsgs }));

    document.querySelector('#chatList').innerHTML = html;
}
socket.on('chats', renderMessages)