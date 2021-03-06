const net = require('net');

const ProtoDef = require("protodef").ProtoDef;
const protocol = require('./data/protocol');
const EventEmitter = require('events').EventEmitter;

const protoToServer = new ProtoDef();
protoToServer.addProtocol(protocol,["toServer"]);


const protoToClient = new ProtoDef();
protoToClient.addProtocol(protocol,["toClient"]);

class Client extends EventEmitter
{
  constructor({host,port,username,password}) {
    super();
    this.host = host;
    this.port = port;
    this.username = username;
    this.password = password;
  }

  connect() {
    this.socket = net.createConnection({ port: this.port, host:this.host }, () => {
      this.emit('connect');
    });

    this.socket.on('data', (data) => {
      console.log("received that hex", data.toString("hex"));
      const parsed = protoToClient.parsePacketBuffer("packet",data).data;

      const {name,params} = parsed;
      console.info("received packet", name, params);

      this.emit(name,params);
    });
    this.socket.on('end', () => {
      console.log('disconnected from server');
    });

  }

  write(packet_name, params) {
    const buffer = protoToServer.createPacketBuffer("packet",{
      name: packet_name,
      size: 0,
      ff:255,
      params
    });

    console.info("sending packet", packet_name, params);
    buffer.writeInt16LE(buffer.length,2);

    this.socket.write(buffer);
  }
}


module.exports = Client;