const { Client } = require('whatsapp-web.js');
const enviarMensagem = () => {
    

    // Create a new client instance
    const client = new Client({
        puppeteer: {
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
        }
    });

    // When the client is ready, run this code (only once)
    client.once('ready', () => {
        console.log('Client is ready!');
    });



    // Start your client
    client.initialize();
}

module.exports = enviarMensagem