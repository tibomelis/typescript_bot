import { SlashCommandBuilder } from '@discordjs/builders';
import { Client, CommandInteraction } from 'discord.js';
import { createTicket } from '../firebase';
export const data = new SlashCommandBuilder()
    .setName('help')
    .setDescription('Creates a new help ticket.')
    .addStringOption((option) =>
        option
            .setName('description')
            .setDescription('describe your problem')
            .setRequired(true)
    );
export async function execute(
    interaction: CommandInteraction,
    client: Client
) {
    if (!interaction?.channelId) return;
    // const channel = await client.channels.fetch(interaction.channelId);
    if (!interaction.channel || interaction.channel.type != 'GUILD_TEXT')
        return;

    const thread = await interaction.channel.threads.create({
        name: `support-${Date.now()}`,
        reason: `Support ticket ${Date.now()}`,
    });

    const problemDescription =
        interaction.options.getString('description')!;
    const { user } = interaction;
    thread.send(`**User:** ${user}\n**Problem:** ${problemDescription}`);

    await createTicket(thread.id, problemDescription);

    return interaction.reply({
        content: 'Help is on the way!',
        ephemeral: true,
    });
}
