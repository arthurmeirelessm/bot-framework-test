const restify = require('restify');
const builder = require('botbuilder');
require('dotenv').config();
const { CloudAdapter, ConfigurationServiceClientCredentialFactory } = require('botbuilder');


let server = restify.createServer();

server.listen(process.env.port || process.env.PORT || 3978, () => {
    console.log('Application was executing in port with success!',
        server.name,
        server.url
    );
});


let connector = new ConfigurationServiceClientCredentialFactory({
    MicrosoftAppId: process.env.APP_ID,
    MicrosoftAppPassword: process.env.APP_PASSWORD
});


const botAuth = createBotFrameworkAuthenticationFromConfiguration(null, connector);

const adapter = new CloudAdapter(botAuth);

let bot = new builder.UniversalBot(connector, (session) => {
     session.send("You said....", session.message.text);
});

server.post('/api/messages', async (req, res) => {
     await adapter.process(req, res, (context) => bot.run(context))
});

