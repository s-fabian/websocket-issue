# Websocket issue

## Scenario one: `yarn without-next`

1. Visit http://localhost:3000/ws/html
2. The browser tries to connect to the websocket server
3. The server receives the request, logs "Websocket trying to connect!"
4. The server handles the request (in this case returns a 501)
5. The `error` or `connect` event of the websocket is triggered

## Scenario two: `yarn with-next`

1. Visit http://localhost:3000/
2. Close the tab
3. Visit http://localhost:3000/ws/html
4. The browser tries to connect to the websocket server
5. The server doesn't receive the request, doesn't log "Websocket trying to connect!"
6. No event is triggered on the websocket

## Tested scenarios

| OS               | Node    | Next.js | Browser                | Works |
|------------------|---------|---------|------------------------|-------|
| Windows 11       | 18.16.0 | 13.4.3  | Firefox 113.0.1        | no    |
| Windows 11       | 18.15.0 | 13.4.3  | Firefox 113.0.1        | no    |
| Windows 11       | 18.15.0 | 13.4.3  | Chrome 113.0.5672.127  | no    |
| Wsl2 Debian 11.5 | 18.16.0 | 13.4.3  | Chrome 113.0.5672.127  | no    |
| Wsl2 Debian 11.5 | 18.16.0 | 13.4.3  | Firefox 113.0.5672.127 | no    |
| Windows 11       | 18.16.0 | 13.2.3  | Firefox 113.0.5672.127 | no    |
| Windows 11       | 18.16.0 | 12.3.4  | Firefox 113.0.5672.127 | no    |
