module.exports = {
    name: 'poll',
    type: 'utility',
    description: 'starts a poll',
    aliases: [],
    usage:'&{prefix}poll <question> \nor\n&{prefix}poll "question" "option1" "option2" ... "option9" ',
    permissions: ['SEND_MESSAGES', 'ADD_REACTIONS', 'EMBED_LINKS', 'MANAGE_MESSAGES'],
    async execute(message, args, bot, Discord, prefix) {
        let botPerms = [];
        let missingPerms = [];
        this.permissions.forEach(p=>{
            botPerms.push(message.channel.permissionsFor(bot.user).has(p));
            if (!(message.channel.permissionsFor(bot.user).has(p)))
                missingPerms.push(p);
        })
        missingPerms = missingPerms.join("\n");
        if (botPerms.includes(false)) return message.channel.send(`The Following permissions which are missing are needed by the bot for this command:\n\n\`\`\`\n${missingPerms.replace("_"," ")}\`\`\``).catch(err=>console.log(`Missing send message permission in a server.`));
      if (!args[0]) {
        let pollembed = new Discord.MessageEmbed()
        .setColor("RED")
        .setTitle(`**GARUDA Poll Command**`)
        .addFields({
          name: `Yes/No`, value: `%poll Do you like GARUDA?`
        },{
          name: `Multiple Answers (2-9)`, value: `%poll "How is GARUDA?" "It's Amazing!" "Awesome" "Great"`
        })
        .setFooter(`Poll help menu.`)
        .setTimestamp();
        message.channel.send(pollembed);
        message.delete();
        return;
      }
      let polls = args.join(" ");
      let regex =  polls.match(/"[^"]+"|[\\S]+"[^"]+/g);
      if (!regex) {
        let pollembed = new Discord.MessageEmbed()
        .setColor("#FF6F61")
        .setTitle(`**${polls}**`)
        .setDescription("🇦 Yes\n🇧 No")
        .setFooter(`Poll by ${message.author.tag}`)
        .setTimestamp();
        message.channel.send("**📊 POLL 📊**", pollembed).then((msg)=>{
          msg.react("🇦").then(()=>{msg.react("🇧")})
        })
        message.delete();
        return;
      }
      if (regex.length>10) {
        return message.channel.send("Kindly specify only 10 options including the question.");
      }

      if (regex.length<3) {
        return message.channel.send("Kindly specify a question and at least two options. If you need a yes/no poll, only type the question without any \"");
      }

      const que = regex[0];
      regex = regex.slice(1);

      const emojis = [
        '🇦',
        '🇧',
        '🇨',
        '🇩',
        '🇪',
        '🇫',
        '🇬',
        '🇭',
        '🇮'
      ]

      let str = "";
      var i = 0;
      for(let opt of regex) {
        str += `${emojis[i]} ${opt}\n`;
        i++;
      }
      let pollembed = new Discord.MessageEmbed()
        .setColor("#EFC050")
        .setTitle(`**${que.replace(/"/g, "")}**`)
        .setDescription(str.replace(/"/g, ""))
        .setFooter(`Poll by ${message.author.tag}`)
        .setTimestamp();
      message.delete();
      const msg = await message.channel.send("**📊 POLL 📊**", pollembed);
      for (var i = 0; i<regex.length;i++){
        msg.react(emojis[i]);
      }
    }
}
