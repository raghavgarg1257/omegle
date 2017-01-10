import socketIO from "socket.io";

module.exports = server => {

    let io = socketIO(server);

    // helper variables
    // let users = [];
    let room_no = 1;

    io.on('connection', socket => {

        console.log(socket.id, "enters");

        let room = `room-${room_no}`;

        socket.on('new user', () => {

            if (!!room) {
                socket.join(room, () => {
                    socket.emit("user is in the room"); // listen it on client and show waiting...
                });
            }

            if (!!io.sockets.adapter.rooms[room] && io.sockets.adapter.rooms[room].length > 1) {
                setTimeout(() => {
                    io.sockets.to(room).emit("room is full");
                }, 500);
                room_no++;
            }

        });

        // users.push(socket.id);

        // socket.emit("client event");
        //
        // socket.on('server event', () => {
        //     console.log('server event');
        //     // io.emit();
        //     // io.sockets.emit();
        //
        //     let room = "room-" + room_no;
        //
        //     if (room) {
        //
        //         socket.join(room);
        //
        //         console.log(io.sockets);
        //         // console.log(io.sockets.adapter.sids);
        //         // console.log(io.sockets.adapter.sids[socket.id]);
        //
        //         let temp = io.sockets.adapter.sids[socket.id];
        //
        //         if (!!temp[socket.id]) {
        //             Object.keys(temp).forEach( (key, i) => {
        //                 if (i === 1) {
        //                     io.sockets.to(key).emit("msg in the room", key);
        //                     console.log(key);
        //                 }
        //             });
        //         }
        //
        //         // console.log(io.nsps['/'].adapter.rooms);
        //         // console.log(io.sockets.adapter.rooms);
        //
        //         // socket.to(room).emit("msg in the room");
        //         // socket.broadcast.to(room).emit("msg in the room");
        //     }
        //
        //     if (io.sockets.adapter.rooms[room] && io.sockets.adapter.rooms[room].length > 1) {
        //         room_no++;
        //     }
        //
        //     // if (users[2]) {
        //     //     socket.broadcast.to(users[2]).emit('broadcast client event');
        //     // }
        //     // socket.broadcast.emit("broadcast client event");
        // });

        socket.on('disconnect', () => {
            console.log(socket.id, "leaves");
            room_no--;
            io.sockets.to(room).emit("starnger disconnected");
            // users.splice(users.indexOf(socket.id), 1);
        });

    });

    // return the instanc of io
    return io;

}
