const { server } = require('../index');

server.route({
    url: '/test',
    method: ["PATCH", "PUT"],
    handler: (req, res) => {
        res.send({ message: "Working" })
    }
});