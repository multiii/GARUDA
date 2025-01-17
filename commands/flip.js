module.exports = {
    name: 'flip',
    type: 'fun',
    usage: '&{prefix}flip',
    description: 'flips a coin',
    aliases: [],
    permissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
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
        let faces = ['Head', 'Tail'];
        let coin = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle("Flip a coin");
        let face = faces[Math.floor(Math.random()*2)];
        coin.setDescription(`The coin was flipped. It is ${face}.`)
        switch(face) {
            case 'Head': coin.setThumbnail("https://www.pngitem.com/pimgs/m/123-1232373_coin-png-pic-heads-and-tails-indian-coin.png"); break;
            case 'Tail': coin.setThumbnail("https://thumbs.dreamstime.com/b/one-indian-rupee-coin-isolated-white-background-86022284.jpg"); break;    
        }
        message.channel.send(coin);
    }
}
