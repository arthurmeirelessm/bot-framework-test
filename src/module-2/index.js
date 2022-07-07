const restify = require('restify');
const builder = require('botbuilder');
require('dotenv').config();
const { CloudAdapter, ConfigurationServiceClientCredentialFactory, createBotFrameworkAuthenticationFromConfiguration } = require('botbuilder');



//SERVER/SERVICE
const server = restify.createServer();
server.use(restify.plugins.bodyParser());

server.listen(process.env.port || process.env.PORT || 3978, () => {
    console.log('Application was executing in port with success!',
        server.name,
        server.url
    );
});


const connector = new ConfigurationServiceClientCredentialFactory({
    MicrosoftAppId: process.env.APP_ID,
    MicrosoftAppPassword: process.env.APP_PASSWORD
});


const botAuth = createBotFrameworkAuthenticationFromConfiguration(null, connector);

const adapter = new CloudAdapter(botAuth);

const onTurnErrorHandler = async (context, error) => {
    console.log(`\n [onTurnError] unhandled error: ${ error }`);


} 

server.post('/api/messages', async (req, res) => {
    await adapter.process(req, res, (context) => bot.run(context))
});

