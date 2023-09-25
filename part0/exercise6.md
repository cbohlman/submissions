sequenceDiagram
participant browser
participant server

    Note right of browser: Prevent default form action
    Note right of browser: Creates new note and adds to notes list
    Note right of browser: Re-renders notes list
    browser->>server:  POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    Note left of server: Server creates new note serverside
    server-->>browser: 201 Created { message: 'note created' }
    deactivate server
