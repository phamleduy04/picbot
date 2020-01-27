const Discord = require('discord.js')
const ms = require('ms')
const json_get = require('get-json')
const client = new Discord.Client()
const url_girl = 'https://api.vitamingirl.asia/api/images/1/'
const { ksoft_key } = require('./keys.json')
const { KSoftClient } = require('ksoft.js');
const trai_random_subreddit = ["cuteguys", "LadyBoners","HotGuys"];
const ksoft = new KSoftClient(ksoft_key);
const {discord_token} = require('./keys.json');

client.login(discord_token)

client.on('ready', ()=> {
    console.log("Địt mẹ tao sẵn sàng rồi!")
});

client.on('message', msg => {
    if (msg.content === "gaixinh" && msg.author.id == "455935236262592512"){
        msg.channel.send(`Bot đã kích hoạt.`)
        setInterval(function(){
            json_get(url_girl,function(error, response){
                if(error){
                    return msg.channel.send(`Bot lỗi trong khi lấy hình, vui lòng thử lại sau.`)
                } else {
                    let hinh = response.data[0].media_post[0].display_url;
                    const embed = new Discord.RichEmbed()
                        .setImage(hinh)
                        .setFooter(`Bot made by phamleduy04#9999`)
                    msg.channel.send(embed)
                }
            })
        },ms('30m'))
    
    }
    if (msg.content === "gaixinhnow" && msg.author.id == "455935236262592512"){
        json_get(url_girl,function(error, response){
            if(error){
                return msg.channel.send(`Bot lỗi trong khi lấy hình, vui lòng thử lại sau.`)
            } else {
                let hinh = response.data[0].media_post[0].display_url;
                const embed = new Discord.RichEmbed()
                    .setImage(hinh)
                    .setFooter(`Bot made by phamleduy04#9999`)
                msg.channel.send(embed)
            }
        })
    }
    //trai xinh sau 30p
    if (msg.content === "traixinh" && msg.author.id == "455935236262592512"){
        msg.channel.send(`Đã kích hoạt, mỗi 30p tự động gởi hình.`)
        async function main() {
            const sub_reddit = trai_random_subreddit[Math.floor(Math.random()*trai_random_subreddit.length)];
            const res = await ksoft.images.reddit(sub_reddit, { removeNSFW: false, span: 'all' });;
            const embed = new Discord.RichEmbed()
                .setTitle(`From ${res.post.subreddit}`)
                .setURL(res.url)
                .setImage(res.url)
                .setFooter(`Bot made by phamleduy04#9999`)
            msg.channel.send(embed);
    }
    setInterval(function(){
    main();
    },ms('30m'))
    }
    //trai xinh now
    if (msg.content === "traixinhnow" && msg.author.id == "455935236262592512"){
        async function traixinhnow() {
            const sub_reddit = trai_random_subreddit[Math.floor(Math.random()*trai_random_subreddit.length)];
            const res = await ksoft.images.reddit(sub_reddit, { removeNSFW: false, span: 'all' });;
            const embed = new Discord.RichEmbed()
                .setTitle(`From ${res.post.subreddit}`)
                .setURL(res.url)
                .setImage(res.url)
                .setFooter(`Bot made by phamleduy04#9999`)
            msg.channel.send(embed);
        }
        traixinhnow();
    }

})