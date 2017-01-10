$(function() {

    let $cliRes = $("#cli-res");
    let $msgForm = $("#msg-form");
    let $msgInput = $("#msg-input");
    let $msgArea = $("#msg-area");

    let socket = io();

    console.log("client is connected");
    $msgForm.hide();

    socket.emit('new user');

    $msgForm.on('submit', (e) => {
        e.preventDefault();
        let msg_val = $msgInput.val();

        let $el = $('<li>').text("You: " + msg_val);
        $msgArea.append($el);
        $msgInput.val("");

        socket.emit('new msg', msg_val);
    });

    socket.on('user is in the room', () => {
        let $el = $('<li>').text('waiting for another user..!!');
        $cliRes.append($el);
    });

    socket.on('room is full', () => {
        let $el = $('<li>').text('you are now talking to stranger..!!');
        $cliRes.append($el);
        $msgForm.show();
    });

    socket.on('starnger disconnected', () => {
        let $el = $('<li>').text('starnger disconnected, now waiting for another user..!!');
        $cliRes.append($el);
        $msgArea.text("");
        $msgForm.hide();
    });

    socket.on('new message for all', (msg_val) => {
        let $el = $('<li>').text("Stranger: " + msg_val);
        $msgArea.append($el);
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
