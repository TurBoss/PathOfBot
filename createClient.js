const Client = require('./client');

const Client2 = require('./client2');

const fs = require('fs');

function createClient(options) {
  const client = new Client(options);
  const client2 = new Client2(options);
  const key1 = fs.readFileSync('./key1');
  const key2 = fs.readFileSync('./key2');

  client.on('connect', () => {
    //'connect' listener
    console.log('connected to server!');
    //client.write('world!\r\n');

    client.socket.write(Buffer.from("01","hex")); // Initialises a normal logon conversation

    client.platformId = 1230518326;
    client.productId = 1144150096;

    client.write('SID_AUTH_INFO', {
      protocolId: 0,
      platformCode: client.platformId,
      productCode: client.productId,
      versionByte: 13,
      languageCode: 1701729619,
      localIp: 587311296,
      timeZoneBias: 4294967236,
      mpqLocaleId: 1036,
      userLanguageId: 1033,
      countryAbreviation: 'FRA',
      country: 'France'
    }); // http://www.bnetdocs.org/?op=packet&pid=279 SID_AUTH_INFO
  });


  client.on('SID_PING',({pingValue}) => {
    console.log("I received a ping of ping",pingValue);
    client.write('SID_PING',{
      pingValue
    })
  });


  client.on("SID_AUTH_INFO",({logonType,serverToken,udpValue,mpqFiletime,mpqFilename,valuestring}) => {
    client2.connect();

    client2.on('connect', () => {
      //'connect' listener
      console.log('connected to server!');
      //client.write('world!\r\n');
      client2.socket.write(Buffer.from("02","hex")); // This initialises a BNFTP file download conversation

      console.log("Downloading mpq : ",mpqFilename);

      client2.write('FILE_TRANSFER_PROTOCOL',{
        requestLength:47,
        protocolVersion:256,
        platformId:client.platformId,
        productId:client.productId,
        bannerId:0,
        bannerFileExtension:0,
        startPositionInFile:0,
        filetimeOfLocalFile:mpqFiletime,
        fileName : mpqFilename
      });

    client2.on('FILE_TRANSFER_PROTOCOL', (data) => {
      console.log(data);
      client.write("SID_AUTH_CHECK",{
            "clientToken": 1520917560,
            "exeVersion": 16780544,
            "exeHash": 1666909528,
            "numberOfCDKeys": 2,
            "spawnKey": 0,
            "cdKeys": [
              {
                "keyLength": 26,
                "keyProductValue": 24,
                "keyPublicValue": 10916470,
                "unknown": 0,
                "hashedKeyData": key1
              },
              {
                "keyLength": 26,
                "keyProductValue": 25,
                "keyPublicValue": 6187878,
                "unknown": 0,
                "hashedKeyData": key2
              }
            ],
            "exeInformation": "Game.exe 10/18/11 20:48:14 65536",
            "keyOwnerName": "sonlight"
          });
    });

    });
  });






  client.connect();

  return client;
}

module.exports = createClient;