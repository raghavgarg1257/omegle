module.exports = io => {

    return {
        get (req, res) {
            // io.emit("broadcast client event");
            // io.emit("client event");
            res.render("home/index", { name: 'jarvis' } );
        },

        post (req, res) {
            res.send('<h1>home page with post request</h1>');
        }
    }

}
