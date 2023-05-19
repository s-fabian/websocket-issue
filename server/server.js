import * as http from 'http';
import next from 'next';

const with_next = process.argv[2] === "with-next";

const app = with_next && next({ dev: true });
let handle = null;

if (app) {
    app.prepare().then(() => handle = app?.getRequestHandler());
}

http.createServer((req, res) => {
    if (req.url === "/ws/html") {
        res.end(`
<html lang="en">
<body>
<script>
    const ws = new WebSocket('ws://' + location.host + '/ws/connect');
    ws.onerror = () => document.body.innerHTML += "Error in state " + ws.readyState + "!<br>"
    ws.onopen = () => document.body.innerHTML += "Open!<br>"
    ws.onmessage = () => document.body.innerHTML += "Message!<br>"
    ws.onclose = () => document.body.innerHTML += "Close!<br>"
</script>
</body>
</html>
    `);
    } else if (req.url === "/ws/connect") {
        console.log('Websocket trying to connect!');
        // imagine a websocket library here
        res.writeHead(501);
        res.end();
    } else if (handle) {
        handle(req, res);
    } else if (with_next) {
        res.writeHead(503);
        res.end("Still loading...");
    } else {
        res.writeHead(404);
        res.end("Not found");
    }
}).once('error', (err) => {
    console.error(err);
}).listen(3000, '0.0.0.0', () => {
    console.log("Ready on port 3000");
    with_next && console.log("NEXT: http://127.0.0.1:3000/");
    console.log("NODE: http://127.0.0.1:3000/ws/html");
});
