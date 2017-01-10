$(function() {

    // got it from the script added in main layout
    let socket = io();

    console.log("client is connected");

    socket.emit('new user');

    socket.on('user is in the room', () => {
        document.write('waiting for another user..!!<hr>');
    });

    socket.on('room is full', () => {
        document.write('you are now talking to stranger..!!<hr>');
    });

    socket.on('starnger disconnected', () => {
        document.write('starnger disconnected..!!<hr>');
    });





    // socket.on('client event', () => {
    //     console.log('client event');
    //     socket.emit("server event");
    // });
    //
    // socket.on('broadcast client event', () => {
    //     console.log('broadcast client event');
    // });
    //
    // socket.on('msg in the room', (msg) => {
    //     console.log('msg in the room: ', msg);
    // });


});
