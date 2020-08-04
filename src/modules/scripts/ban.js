const Discord = require('discord.js');
//const { Converters, Extractors } = require('discord-noob');
const { Converters, Extractors } = require('../../index');

exports.run = (options, eventEmitter, member, ...reason) => {
    let guildMember;
    reason = reason.join(' ');
    if (eventEmitter.event === 'command') {
        guildMember = Converters.member(member, eventEmitter);
        if (!(guildMember instanceof Discord.GuildMember)) {
            eventEmitter.eventArgs[0].react('❌').catch(console.error);
            console.error(`No member ${member} could be found.`);
            return;
        }
        options.reason = reason || options.reason;
        guildMember.ban(options)
                    .then(() => eventEmitter.eventArgs[0].react('✅').catch(console.error))
                    .catch(e => {eventEmitter.eventArgs[0].react('❌').catch(console.error);
                                 console.error(`Couldn't ban the member ${guildMember.displayName}`)});
    } else {
        guildMember = Extractors.member(eventEmitter);
        try {
            guildMember.ban(options).then(() => eventEmitter.eventArgs[0].react('✅').catch(console.error));
        } catch(e) {
            console.error(`Couldn't ban the member who emitted the event ${eventEmitter.event}`);
        }
    }

    let data = eventEmitter.client.data.get('moderation');
    data[guildMember.guild.id] = data[guildMember.guild.id] || {};
    let userData = data[guildMember.guild.id][guildMember.id] || {};
    userData.bans = userData.bans || [];
    userData.bans.push({date: Date.now(), reason: reason || options.reason});
    data[guildMember.guild.id][guildMember.id] = userData;

    eventEmitter.client.data.set('moderation', data);
}