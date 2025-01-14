const socket = io('http://localhost:8000');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector('.container');




var audio = new Audio('tone.mp3');

const append = (message , position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    if(position == 'center'){
        messageElement.classList.add(position);
        messageContainer.append(messageElement);
        audio.play();
    }
    if(position == 'right'){
        messageElement.classList.add('message');
        messageElement.classList.add(position);
        messageContainer.append(messageElement);
    }
    if(position == 'left'){
        messageElement.classList.add('message');
        messageElement.classList.add(position);
        messageContainer.append(messageElement);
        audio.play();
    }
    
}




form.addEventListener('submit' , (e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`YOU : ${message}` , 'right');
    socket.emit('send',message);
    messageInput.value = '';
})






const names = prompt("Enter your name to join ");
console.log(names);
socket.emit('new-user-joined',names);

socket.on('user-joined' , name =>{
    append(`${name} joined the chat ` , 'center');
})

socket.on('receive' , data =>{
    append(`${data.name}: ${data.message}` , 'left');
})

socket.on('left' , name =>{
    append(`${name} left the chat ` , 'center' );
})
