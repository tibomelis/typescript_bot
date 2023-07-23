import { Client } from 'discord.js';
import config from './config';
import * as commandModules from './commands';

const commands = Object(commandModules);

export const client = new Client({
    intents: ['GUILDS', 'GUILD_MESSAGES', 'DIRECT_MESSAGES'],
});

client.once('ready', () => {
    console.log('bot ready');
});

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;
    const { commandName } = interaction;
    try {
        commands[commandName].execute(interaction, client);
    } catch {
        console.log(
            'Error while trying to execute a command "' + commandName + '"'
        );
    }
});

client.login(config.DISCORD_TOKEN);
