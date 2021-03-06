# Path of bot

Bot for diablo2 implementing the packets in node.js

## File organization

* bot.js : the bot
* createClient.js : do the login sequence
* client.js : low level network implementation with node and protodef

* parse_dump.js : to parse some packet dumps using protodef

## Docs

### Diablo

* packets general description http://www.blizzhackers.cc/viewtopic.php?f=182&t=444264
* dump of a normal connection sequence http://www.blizzhackers.cc/viewtopic.php?t=406445
* index of packets https://bnetdocs.org/packet/index
* example of packet doc https://bnetdocs.org/packet/146
* basic example of packet parsing in python of a diablo2 packet https://gist.github.com/rom1504/8d2824d9d89dbd8b991b102696a1321e
* previous python implementation https://github.com/louis030195/PathOfBot/blob/56ebf61cac93f9ff65493c39c15db4aaaca6fbe5/PathOfBot.py

### Libs

* node basic client implementation https://nodejs.org/api/net.html#net_net_createconnection_options_connectlistener
* protodef js implementation doc https://github.com/ProtoDef-io/node-protodef https://github.com/ProtoDef-io/node-protodef/blob/master/doc/api.md and https://github.com/ProtoDef-io/node-protodef/blob/master/example.js
* protodef types https://github.com/ProtoDef-io/ProtoDef/blob/master/doc/datatypes.md
