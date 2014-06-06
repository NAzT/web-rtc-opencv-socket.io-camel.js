## Getting started
### Setup
    git clone git@github.com:NAzT/sails-0.10-yeoman-angular-seed.git your_project
    cd your_project
    npm install
    bower install
    grunt
    sails lift 
    

### Yo Angular!
    cd assets/linker
    yo angular:route myroute
    yo angular:controller user
    yo angular:directive myDirective
    yo angular:filter myFilter
    yo angular:view user
    yo angular:service myService
    yo angular:decorator serviceName

## Configurations
### App-level socket
    
- config/sockets.js

        onConnect: function(session, socket) {
              var socketId = sails.sockets.id(socket);
              var numberOfSockets = Object.keys(socket.namespace.manager.sockets.sockets).length
              socket.emit('connectedUsers', { count: numberOfSockets });
              socket.broadcast.emit('connectedUsers', { count: numberOfSockets });
        }


### Controller-level socket

- api/controllers/your_controller.js

        method: function (req, res) {
            sails.io.sockets.emit('rfid', { card_id: req.params.id})
        }
