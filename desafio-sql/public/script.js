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
            author: {
                id: document.querySelector('#email').value,
                nombre: 'nombre del usuario',
                apellido: 'apellido del usuario',
                edad: 'edad del usuario',
                alias: 'alias del usuario',
                avatar: 'url avatar del usuario'

            },
            text: document.querySelector('#mensaje').value,
        }
        socket.emit('addNewMsg', newMsg)
        document.querySelector('#mensaje').value = ''
    }

})


async function renderMessages(normalizedData) {

    const authorEntity = new normalizr.schema.Entity('users')
    const messagesEntity = new normalizr.schema.Entity('messages', {
        author: authorEntity
    }, { idAttribute: 'text' })
    const array = new normalizr.schema.Entity('array', {
        mensajes: [messagesEntity]
    })

    const denormalizedMsgs = normalizr.denormalize(normalizedData.result, array, normalizedData.entities);
    console.log(denormalizedMsgs)
    const auxArray = [...denormalizedMsgs.mensajes]
    console.log(auxArray)
    const template = await fetch('/templates/msgs.hbs');
    const textTemplate = await template.text();
    const functionTemplate = Handlebars.compile(textTemplate);
    const html = (functionTemplate({ mensajes: auxArray }));

    document.querySelector('#chatList').innerHTML = html;
}
socket.on('chats', renderMessages)