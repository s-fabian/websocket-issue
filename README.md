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

## Solution: `yarn with-next-fix`

How? Well, the problem is caused by `app?.getRequestHandler()()`.

This function adds a listener onto the server matching the `upgrade` event.

This can be prevented by overriding the function that's used to add an event listener
into caching the function for the event handler into a local variable.

Now you can call this variable if the url matches `/_next/webpack-hmr`,
otherwise you can use your own websocket logic.
