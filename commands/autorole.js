module.exports = {
    name: 'autorole',
    type: 'admin',
    usage: `&{prefix}autorole <add/remove> <@role or id>`,
    description: 'give roles automatically to the members (human only)',
    permissions: ['SEND_MESSAGES'],
    async execute(message, args, bot, Discord, prefix) {
      if (!message.member.permissions.has("MANAGE_SERVER"))
        return message.reply("You don't have the required permissions.");
      if (!args[0]||(args[0].toLowerCase()!="add"&&args[0].toLowerCase()!="remove")) return message.reply(`Invalid Syntax. ${prefix}autorole <add/remove> <role id or mention>\nRole is required only if you are setting auto role.`)
      let subcmd = args[0];
        if (subcmd.toLowerCase()=="add") {
            if (!args[1]) return message.reply(`Invalid Synatx. ${prefix}autorole add <role id or mention>`);
        let role = message.guild.roles.cache.get(args[1]);
        if (!role) return message.reply("Invalid role id or mention.");
        let msg = await message.channel.send("Setting autoRole");
         await serverConfig.findOneAndUpdate({
                    _id: message.guild.id
                },{
                    _id: message.guild.id,
                    autoRole: role.id,
                },{
                    upsert: true
                })
          msg.edit(`AutoRole set successfully. New users would be given the role upon their joining. (Bots won't get the role)`)
          let result = bot.serverConfig.get(message.guild.id);
          bot.serverConfig.set(message.guild.id, {
            prefix: result.prefix,
            suggestion: result.suggestion,
            welcome: result.welcome,
            leave: result.leave,
            modLog: result.modLog,
            ghost: result.ghost,
            autoRole: role.id
          });
            
      }
      else {
        let autoR = bot.serverConfig.get(member.guild.id)!=undefined?bot.serverConfig.get(member.guild.id).autoRole:undefined;
        if (!autoR) message.channel.send("This server isn't using the autoRole feature of the bot.");
        bot.serverConfig.set(message.guild.id, {
            prefix: result.prefix,
            suggestion: result.suggestion,
            welcome: result.welcome,
            leave: result.leave,
            modLog: result.modLog,
            ghost: result.ghost,
            autoRole: undefined
          });
      }
    }
}
