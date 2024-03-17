// Using CommonJS


const canvas=document.querySelector('canvas')
const c = canvas.getContext('2d')
canvas.width =1024
canvas.height = 576
let collisionMapFtd = []
for(let i=0;i<collisionMap.length;i+=70){
    collisionMapFtd.push(collisionMap.slice(i,i+70))

} 
const battleZoneMap = []
for(let i=0;i<battleZonesData.length;i+=70){
    battleZoneMap.push(battleZonesData.slice(i,i+70))

} 
const chestsLocationMap = []
for(let i=0;i<chestsLocation.length;i+=70){
    chestsLocationMap.push(chestsLocation.slice(i,i+70))

} 

const oceanLocationMap = []
for(let i=0;i<oceanPathLocations.length;i+=70){
    oceanLocationMap.push(oceanPathLocations.slice(i,i+70))

} 
const oceanTilesLocationMap = []
for(let i=0;i<oceanTilesLocation.length;i+=70){
    oceanTilesLocationMap.push(oceanTilesLocation.slice(i,i+70))

} 
c.fillStyle="white"
c.fillRect(0,0,canvas.width, canvas.height)
const image = new Image()
image.src = getImageSource()
const foregroundImage = new Image()
foregroundImage.src = './assets/Foreground.png'
const playerImage = new Image()
playerImage.src = './assets/Character/down.png' 
const playerUpImage = new Image()
playerUpImage.src = './assets/Character/up.png' 
const playerLeftImage = new Image()
playerLeftImage.src = './assets/Character/left.png' 
const playerRightImage = new Image()
playerRightImage.src = './assets/Character/right.png'
const playerBoatImage = new Image()
playerBoatImage.src = './assets/Character/down_boat.png' 
const playerUpBoatImage = new Image()
playerUpBoatImage.src = './assets/Character/up_boat.png' 
const playerLeftBoatImage = new Image()
playerLeftBoatImage.src = './assets/Character/left_boat.png' 
const playerRightBoatImage = new Image()
playerRightBoatImage.src = './assets/Character/right_boat.png'
const daffleImage = new Image()
daffleImage.src = './assets/Character/daf_down.png' 
const daffleUpImage = new Image()
daffleUpImage.src = './assets/Character/daf_up.png' 
const daffleLeftImage = new Image()
daffleLeftImage.src = './assets/Character/daf_left.png' 
const daffleRightImage = new Image()
daffleRightImage.src = './assets/Character/daf_right.png'
const keys = {
    w: {
        pressed: false
    },
    a: {
        pressed: false
    },
    s: {
        pressed: false
    },
    d: {
        pressed: false
    },
}


//(canvas.width/2)+ this.image.width/2+40, (canvas.height/2)-this.image.height/2
const offset = {
    x: -500,
    y: -1600
}

const player = new Sprite({
    position:{
        x: (canvas.width/2)+ 120/2+40,
        y: (canvas.height/2)-40/2
    },
    bg: playerImage,
    frames: {
        max:3,
        hold: 15,
    },
    sprites:{
        up: playerUpImage,
        down: playerImage,
        left: playerLeftImage,
        right: playerRightImage,
        up_boat: playerUpBoatImage,
        down_boat: playerBoatImage,
        left_boat: playerLeftBoatImage,
        right_boat: playerRightBoatImage
        
    }
})

const daffle_npc = new Sprite({
    position:{
        x: (canvas.width/2)+ 120/2+40,  //(canvas.width/2)+ 120/2+40+850
        y: (canvas.height/2)-40/2+50      //(canvas.height/2)-40/2 +100
    },
    bg: daffleUpImage,
    frames: {
        max:3,
        hold: 15,
    },
    sprites:{
        up: daffleUpImage,
        down: daffleImage,
        left: daffleLeftImage,
        right: daffleRightImage,
    }
})
const background = new Sprite({
    position:{
        x: offset.x,
        y:offset.y
    },
    bg: image
})
const foreground = new Sprite({
    position: {
      x: offset.x,
      y: offset.y
    },
    bg: foregroundImage
  })

let boundaries=[]
collisionMapFtd.forEach((row,i) =>{
    row.forEach((sym,j)=>{
        if(sym === 552 || sym === 6 || sym ===7){
            boundaries.push(new Boundary({
                position: {
                    x: j * 64 + offset.x,
                    y: i * 64 + offset.y
                },
                sym: sym
            }))
            
        }
        
    })
})
const chests=[]
chestsLocationMap.forEach((row,i) =>{
    row.forEach((sym,j)=>{
        if(sym != 0){
            chests.push(new Boundary({
                position: {
                    x: j * 64 + offset.x,
                    y: i * 64 + offset.y
                },
                sym: sym
            }))
        }
        
    })
})
const oceans = []
oceanLocationMap.forEach((row,i) =>{
    row.forEach((sym,j)=>{
        if(sym != 0){
            oceans.push(new Boundary({
                position: {
                    x: j * 64 + offset.x,
                    y: i * 64 + offset.y
                },
                sym: sym
            }))
        }
        
    })
})
const oceanTiles = []
oceanTilesLocationMap.forEach((row,i) =>{
    row.forEach((sym,j)=>{
        if(sym == 0){
            oceanTiles.push(new Boundary({
                position: {
                    x: j * 64 + offset.x,
                    y: i * 64 + offset.y
                },
                sym: sym
            }))
        }
        
    })
})
const battle1 = new Battle({
    id: 555,
    status: false,
    questions:[
        {
            prompt: 'Where was our first date?',
            choices:['Ersao', 'Samgyupsalamat', 'Ajisen', 'Ichiro'],
            answer: 'Ichiro'
        },
        {
            prompt: 'Who did you think was best looking in Grade 12?',
            choices:['Justin To', 'Justin Tan', 'Diego', 'Kyle'],
            answer: 'Diego'
        },
        {
            prompt: 'When did I first fall in love with you?',
            choices:['August 2019', 'November 2019', 'March 2020', 'February 2020'],
            answer: 'August 2019'
        },
        {
            prompt: 'Where did we have our first kiss?',
            choices:['Glorietta', 'Greenbelt', 'BGC', 'SM Aura'],
            answer: 'Glorietta'
        },
    ],
    dialogue: ["Well played waffle. Seems like you havent completely forgotten about us.", "This doesn't end here, you'll see me again mwahahaha."],
    daffle_x: 1950,
    daffle_y: 0,
    direction: "up"
})

const battle2 = new Battle({
    id: 556,
    status: false,
    questions:[
        {
            prompt: 'What was our first fight about?',
            choices:["Arcane", "Basketball vs Volleyball", "You Being Cold", "League of Legends"],
            answer: 'You Being Cold'
        },
        {
            prompt: 'What do I like most about you?',
            choices:['Your Smell', 'Your Chubby Cheeks', 'Your Pretty Hair', 'All of the Above'],
            answer: 'All of the Above'
        },
        {
            prompt: 'Who was the first LOL Champion I taught you how to play?',
            choices:['Brand','Miss Fortune', 'Nunu', 'Lux'],
            answer: 'Lux'
        },
        {
            prompt: 'What was my first gift to you?',
            choices:['Adidas Shoes', 'Nike Shoes', 'Stuffed Bear', 'Crocheted Angel'],
            answer: 'Adidas Shoes'
        },
    ],
    dialogue: ["Not bad. Guess we aren't completely strangers yet, are we?"],
    daffle_x: -1680,
    daffle_y: -1300,
    direction: "down"
})

const battle3 = new Battle({
    id: 557,
    status: false,
    questions:[
        {
            prompt: 'Who was I most jealous of?',
            choices:["Zhu Zhengting", "Philippe", "Kyle", "Takada"],
            answer: 'Kyle'
        },
        {
            prompt: 'What was my favorite gift of yours?',
            choices:['The Keyboard Frame', 'The Sushi Cake', 'Video, Letter, and Chocolates', 'The Camera'],
            answer: 'Video, Letter, and Chocolates'
        },
        {
            prompt: 'Who started asking to call everyday?',
            choices:['Tricia', 'Justin'],
            answer: 'Justin'
        },
        {
            prompt: 'What was the first show we watched together?',
            choices:['Gangnam Beauty', 'AOT', 'Horimiya', 'Demon Slayer'],
            answer: 'Demon Slayer'
        },
    ],
    dialogue: ["I'm surprised you've made it this far.", "It gets a lot harder from here. There's no chest on this island, meet on the one on your left."],
    daffle_x: -1550,
    daffle_y: -250,
    direction: "down"
})

const battle4 = new Battle({
    id: 558,
    status: false,
    questions:[
        {
            prompt: 'Where did we eat in our 3rd date?',
            choices:["Shaburi", "Wholesome Table", "Jollibee", "Cibo"],
            answer: 'Wholesome Table'
        },
        {
            prompt: 'Who do I think youre really good at in LoL (support)?',
            choices:['Braum', 'Nautilus', 'Swain', 'Lulu'],
            answer: 'Nautilus'
        },
        {
            prompt: 'Which song from your playlist do I listen to the most?',
            choices:['Mine Right Now','Hey Stephen', 'Shotgun', 'Livewire by Oh Wonder'],
            answer: 'Mine Right Now'
        },
        {
            prompt: 'Whats my favorite picture of you?',
            choices:['You in a blue dress for BCG DP', 'You PSed in Kill This Love', 'You in Minions', 'You as Angry Tomato'],
            answer: 'You as Angry Tomato'
        },
    ],
    dialogue: ["Your memory is commendable.", "But I doubt you'll last."],
    daffle_x: 12,
    daffle_y: 1100,
    direction: "left"
})

const battle5 = new Battle({
    id: 553,
    status: false,
    questions:[
        {
            prompt: 'Who said I love you first?',
            choices:["Justin", "Tricia"],
            answer: 'Justin'
        },
        {
            prompt: 'Why was I sad in the 1st few mo. of us?',
            choices:['U ghost me from 1-9', 'U no talk to me', 'U no pansin me', 'All of the Above'],
            answer: 'All of the Above'
        },
        {
            prompt: 'Where did the word Waffle come from?',
            choices:['Wife','Woof', 'Wuv', 'Wow'],
            answer: 'Wuv'
        },
        {
            prompt: 'What country were supposed to study in together?',
            choices:['Taiwan', 'Hong Kong', 'Australia', 'Belgium'],
            answer: 'Taiwan'
        },
    ],
    dialogue: ["Almost got you there, didn't I.", "Lucky to get out of that one, but you're cooked in the next."],
    daffle_x: 3450,
    daffle_y: -1070,
    direction: "left"
})

const battle6 = new Battle({
    id: 554,
    status: false,
    questions:[
        {
            prompt: 'Who was my favorite youtuber that you watch?',
            choices:["Emma Chamberlain", "Bestdressed", "Dasom Heo", "Peache"],
            answer: 'Bestdressed'
        },
        {
            prompt: 'Why will I always be in love with you?',
            choices:['cause ur the prettiest', 'cause ur the hottest', 'cause ur the nicest', 'cause ur the smartest', 'cause ur the most artisic', 'All of the Above'],
            answer: 'All of the Above'
        },
        {
            prompt: 'When will I ever stop loving you?',
            choices:['Next Month','Next Year', 'Next Decade', 'When im dead and gone and buried'],
            answer: 'When im dead and gone and buried'
        },
        {
            prompt: 'Who loves and misses the other the most?',
            choices:['Justin', 'Tricia'],
            answer: 'Justin'
        },
    ],
    dialogue: ["Damn, I really didn't think you would beat me.", "Well played, I'm glad to know that, even if it's in very insignificant detail,", "you still carry a part of me in your life.", "I'll find comfort in that, I guess.", "Anyway, I at least got you to finally admit that I love and miss you the most.", "The last chest is yours, it's inside the house. See you around waffle."],
    daffle_x: 6,
    daffle_y: -200,
    direction: "left"
})

const battleArray = [battle1 , battle2, battle3, battle4, battle5, battle6]
const battleZones=[]
battleZoneMap.forEach((row,i) =>{
    row.forEach((sym,j)=>{
        if(sym != 0){
            battleZones.push(new Boundary({
                position: {
                    x: j * 64 + offset.x,
                    y: i * 64 + offset.y
                    
                },
                sym: sym
            }))
        }
        
    })
})
const movables = [background,...boundaries,foreground, ...battleZones, daffle_npc, ...chests, ...oceans, ...oceanTiles]
function rectCollision({rect1, rect2}){
    return(
        rect1.position.x + rect1.width >= rect2.position.x && 
        rect1.position.x <= rect2.position.x + rect2.width &&
        rect1.position.y <= rect2.position.y + rect2.height &&
        rect1.position.y + rect1.height>= rect2.position.y 
    )
}
const battle={
    initiated: false
}
function faceWaffle(){
    if(player.position.x - daffle_npc.position.x >  daffle_npc.position.y - player.position.y){
        if(player.position.x > daffle_npc.position.x){
            daffle_npc.bg = daffleRightImage
        } else{
            daffle_npc.bg = daffleRightImage
        }
        
    }
    
}
function waitForClick(element) {
    return new Promise((resolve) => {
        // Use a named function for the event listener to be able to remove it later
        const listener = () => {
            element.removeEventListener('click', listener);
            resolve();
        };
        element.addEventListener('click', listener);
    });
}
const cutscene1 = new Battle({
    id: -1,
    status: false,
    questions:[],
    dialogue: ["Hey Waffle, It's Me, Daffle. There's actually no way you thought I'd forget, right?","I mean how could I? It was arguably one of the best moments of my life.", "So, Happy what could've, would've, should've been the 4th.",  "I know we usually celebrate this day quite differently, let's just say in a more civil and romantic manner.", "But due to the unique circumstances that we currently find ourselves in (you leaving me smh HAHA JKJK), I'm left with no choice but to kidnap and trap you in my virtual world mwahahahah.", "To leave, there is only one way out, and that is to beat the daffle games!", "Your goal is to look for treasure chests that contain secret magic journals. To retrieve those journals, just walk up to the chest and touch it. Inside those journals are the spells you need to break free from my evil curse, mwahahaha!", "Think you got what it takes?", "Don't count on it. I'm not letting you go, not again, mwahahaha!", "See you around, waffle."]
})
async function drawDialogue(battle_no,x,y, direction){
    battle.initiated=true
    document.querySelector('#dialogueContainer').style.display = 'block'
    document.querySelector('#dialogueBoxInfo').style.display = 'block'
    for(let j =0; j<battle_no.dialogue.length; j++){

        document.querySelector('#dialogueBoxInfo').innerHTML = battle_no.nextDialogue()
        await waitForClick(document.querySelector('#dialogueContainer'));
    }
    document.querySelector('#dialogueContainer').style.display = 'none'
    document.querySelector('#dialogueBoxInfo').style.display = 'none'
    moveDaffle(x, y,direction)
    setTimeout(() => {
        console.log("ALSKASJKLASKLAS");
        battle.initiated = false;
    }, 2000);
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function moveDaffle(x, y, direction) {
    // Loop for moving in the x-direction
    
    if(x != 0) {
        const step = x > 0 ? 2 : -2; // Determine direction of movement
        daffle_npc.moving = true
        daffle_npc.image= step ==2 ? daffle_npc.sprites.right : daffle_npc.sprites.left
        while(x != 0) {
            daffle_npc.position.x += step;
            x -= step;
            await sleep(2); // Wait for 50 milliseconds before next update
        }
        const stepy = y > 0 ? 2 : -2; // Determine direction of movement
        daffle_npc.moving = true
        daffle_npc.image= stepy ==2 ? daffle_npc.sprites.down : daffle_npc.sprites.up
        while(y != 0) {
            daffle_npc.position.y += stepy;
            y -= stepy;
            await sleep(2); // Wait for 50 milliseconds before next update
        }
        switch (direction){
            case "up":
                daffle_npc.image=daffleUpImage
                break;
            case 'down':
                daffle_npc.image=daffleImage
                break;
            case 'left':
                daffle_npc.image=daffleLeftImage
                break;
            case 'right':
                daffle_npc.image=daffleRightImage
                break;
        }
        daffle_npc.moving=false
    }
    // Add similar logic for y-direction if needed
}

function showLetters(index){
    document.querySelector('#letterBox').style.display='flex'
    battle.initiated=true
    if(index == 553){
        document.querySelector('#letterContent').innerHTML ="Note 1 of 7 <br><br><br>Dear Waffle, It's been a while since we last talked. A good amount of time has passed since we broke up. I missed you, a lot. There were a lot of days where I wondered whether or not there was anything else worth living life for. I missed you, terribly. Luckily, time does heal most things. I've decided to redirect my focus towards other aspects of my life, particularly work. Not only does it really help financially, it takes my mind off other things e.g. you. It's a good distraction, really. I've started to be more open to other people as well and have finally made some of the friendships that I was so desperately craving for throughout college. I've gotten to meet a lot of new people as well, esepcially through my Job and Jiu Studios, so that's a plus! It really does seem like things are getting better for me, and for the first time in a long time, I feel happy and content. That is what I wish I could say. The truth is, all this seems nice and dandy, until I realize that I'd give up everything, all of it, every last drop, just to have you back. I miss you, man, just as much as I missed you 10 months ago, if not more. If time does heal, it's a terrible fucking doctor and I just wake up everyday still wishing and hoping to see your message, notification, whatever. I just want it like the way it was before. <br><br> Next Chest: Go to the Hill on the left through a bridge beside the house."
    }
    if(index == 554){
        document.querySelector('#letterContent').innerHTML ="Note 2 of 7 <br><br><br>I think a lot about everything we've been through. Maybe we were never really meant to be, who knows. If one thing had been different, would everything be different today (sheesh eras tour justins version)? Probably, but One thing is sure and thats the fact that I'll always always regret not being the lover I should've been to you. My lowlights haunt me a lot and just thinking about it makes me want to travel back in time and smack the living shit out of me until I wake up and realize just how much you meant to me. It frustrates me because I know I love you, and I know theres a side of me that knows how to love you the way you deserve to be loved, I just wish I could've shown it to you. I'm sorry for being such an immature little rascal. I wish I realized sooner and looking back makes me feel really really really dumb because it was my own stupidity that cost me the love of my life. <br><br> Next Chest: Go to the Island Directly on the Right"
    }
    if(index == 555){
        document.querySelector('#letterContent').innerHTML ="Note 3 of 7 <br><br><br>It scares me knowing that I'll never be able to feel that way again with anyone else. It doesn't even make sense to me, because I've never been one to get attached. I get bored and tired of things a lot, and it has been a reccurring pattern with almost everything in my life: programming, cars, photography, fashion. Some days, I'll pick it up and after a while I'll get bored of it. What's weird to me is that you're the one thing I can't seem to ever let go off, how convenient right? I've always been one to move on with my life pretty quickly. Take my history with Jaira, Sarah, Alyana. I've always moved on with a week, maybe 2 tops. But with you, I feel like I'm running in loops, and it's not very fun at all. It's annoying because I know there are fish out there, But I just don't feel like fishing is for me anymore. Not when I always miss you. It's like choosing to sit in a house that's burning because that's home to you. Very comparable to learning to say goodbye, but not to let go and just like how the cliche goes, I find myself stuck between wanting to wait for you and wanting to move on. I don't know which is worse so I somehow end up doing both at the same time.  <br><br> Next Chest: Go to the Island on the Upper Left"
    }
    if(index == 556){
        document.querySelector('#letterContent').innerHTML ="Note 4 of 7 <br><br><br>I swear, on god, I can't get you out of my head. You're like a little parasite leeching on to my brain and I can't seem to shake you off. I've done every solution there is pretty much. Therapy, partying, work, but it's insanely difficult when my own brain is programmed to associate every little detail with you. Recently, I went to watch the eras tour and it was an amazing experience. Obviously, taylor's performance was elite, the voice, the production value, it was a whole ass experience (My surprise songs were mid tho). And before the concert I started wondering at what point did I become a big enough swiftie to spend all that money to fly to sg, and at what point did I start knowing all the lyrics to her songs by heart. When I look back at it, I sometimes don't know anymore whether the reason I feel so strongly towards a particular thing is because of my own will, or because it has some sort of association with you. I mean I've always liked Taylor Swift's songs, but I've only ever listened to A-side tracks before I met you. It was actually because of you back in 2020 I think, that I started listening to folklore and lover tracks beyond A-side. And every song that she sang in the concert, had some relation to you. If she sang a song like betty, champagne problems, or back to december (i wish she did :(), I see the song from my perspective, from someone who's done the hurting and from someone who's trying to apologize, and whenever she sings songs like All Too Well, Tolerate it, or You're Losing Me, I start to imagine it like you were singing and writing those words to me. <br><br> Next Chest: Go to the Island Below"
    }
    if(index == 557){
        document.querySelector('#letterContent').innerHTML ="Note 5 of 7 <br><br><br>I'm sorry still for everything that I've done to hurt you. I remember vowing that I'd protect your peace after you told me about what happened to you in grade 10 and how it scarred you and I can't imagine how much it hurt even more after the one person you should've been able to trust your whole life on, betrayed you like that. I can never forgive myself for what I did and neither should you, but I hope you know how sincerely sorry I am for everything that I did and didn't do. I was such a fool, and I regret it all. I feel like a broken record at this point, but I know no matter how much I apologize or regret, it'll never reverse the damage and pain that I've caused us, and it hurts a lot knowing that my foolishness was the one that put to waste what was once something beautiful that we had both built together. I wish I was a better man, I wish I risked something, I wish I had done something about it while I still could, I wish I stood outside in the rain 'til you came out. And in case this is the last time I get to talk to you, I just wanted to let you know that I'm incredibly grateful for all that you've done for me. You've done so much for me, and I'm forever indebted to you. You've given me meaning in ways that I'll never be able to find again. You've properly taught me what it means to love some unconditionally and I'm incredibly privileged to have shared the same lifetime with you and even more so to have spent the last 3 years together. I wish I could pay it back, and I hope one day I get the opportunity to, so whenever you need anything, please don't ever hesitate to reach out. <br><br> Next Chest: Go to the Chest on your lower left on this Island."
    }
    if(index == 558){
        document.querySelector('#letterContent').innerHTML ="Note 6 of 7 <br><br><br>By the way congratulations on your graduation! You were always the smartest person I knew, and that's saying something considering I know a lot of intelligent people. I mena, graduating Magna Cum Laude from the country's most prestigious, most gruelsome, most hardcore course is just absurd. I do not know how you do it. I'm super excited to see what you're going to do after college because I know that with your insane skillset, work ethic, talent, intelligence and creativity, you're destined for greatness. I can't wait to see you on Forbes 30 Under 30 after you've launched your 4th startup backed by YC, and I'll point out to my future kids that their house husband dad was once privileged enough to have fallen in love with you, a 4x CEO with a PhD and MBA. The world is your oyster and I know that in whatever path you decide to pursue, you'll find success, and though I'm no longer directly part of your life I guess, know that I'll always be cheering for you wholeheartedly. You're Troy Bolton, I'm Gabriela. In spite of the limitless possibilities, I hope that you also take breaks and stop to look around because I know how hard you work despite you always claiming to be lazy. You can be very hard on yourself sometimes without realizing, and that's partly the reason for your success, but I hope that again, you go easy on yourself sometimes to appreciate just how far you've come and congratulate yourself for all the the hard hard work that you've put in. Please take care of yourself, sleep early (MAX 2 am), eat well and good (not always jollibee, only that 2 times a week >:0 ), and always remember to live a little and spend on yourself, you deserve it. Again, if you ever need anything from me (doubt it), please let me know :> <br><br> Next Chest: Go to the Island on the Upper Right Most Corner"
    }
    if(index == 272){
        document.querySelector('#letterContent').innerHTML ="Note 7 of 7 <br><br><br>How've you been? I've been seeing you a lot through my circle nowadays. I see you in their stories, posts, etc., and I can't help but be a little bit curious as to what your life has been like over the past few months that we've been away from each other. I remember writing a letter to you just a few months ago, and honestly, I think I've grown a bit more mature and controlled over my emotions since then, and I can confidently say that I'm at least 60% happy for you now and your new man, compared to approximately 40% 2 months ago lol. But seriously, I'm really (somewhat is probably the better word, JK) happy that you've found someone that loves you the way that you want to be loved, and I know for a fact that no one else on this earth deserves to be loved more than you. Loving you is a privilege, really. This graduation (and lowkey anniversary hehe) gift, I know for a fact pales in comparison to what he's given you, and I'm actually glad it does because that means you're getting a lot better treatment now, which again you most definitely deserve. I hope he continues to shower you with the love, kindness, and happiness that I couldn't give to you. Obviously, there is a side of me that still wishes that I was the one making you happy, but I had my chance and I blew it, and I have to say, he's definitely an upgrade. Just know that I'll always be here, at the restaurant, right where you le- JKJK AHHAHAHAHAHHA but yes, the unfortunate news is that I always will love you and I have this hunch that when I'm on my deathbed as a 70 year old (hopefully I dont live past that), when i'm old, bald, and wrinkly, plagued with organ failures, pissing myself on the hospital bed, the first thing I'll think about, that I'll reminisce, are the 3 years I spent with you. Those days where we were locked in our houses with no where to go, and no one else to talk to. We had nothing to do, nothing to worry about. All we had was each other, and that was enough, more than enough, actually. It probably wouldn't matter what else I'm able to experience or achieve in this lifetime because I know for a fact that none of them will compare to the happiness, warmth and innocence of the love that we shared throughout those 3 years. All I'll probably remember is how insanely happy and helplessly in love this 18 year old once was. There's actually this theory, that when you pass away, your brain stays alive for 7 more minutes replaying your best and happiest moments. I just want you to know that you'll always, always, be my 7 minutes. <br><br>P.S. If you ever think you got it wrong, You know where to find me. <br><br> THE END"
    }
}
function animate(){
    const animationId = window.requestAnimationFrame(animate)
    let moving = true
    background.draw()
    
    boundaries.forEach(boundary =>{
        boundary.draw()
        
    })
    battleZones.forEach(battleZone =>{
        battleZone.draw()
        
    })
    
    daffle_npc.draw()
    player.draw()
    foreground.draw()
    player.moving=false
    if(cutscene1.status==false){
        battle.initiated=true
        drawDialogue(cutscene1, 850, 50, "down")
        cutscene1.status=true
    }
    

    if(battle.initiated){
        return
    }
    if(keys.w.pressed || keys.a.pressed || keys.s.pressed|| keys.d.pressed ){
        for (let i = 0; i < battleZones.length; i++) {
            const battleZone = battleZones[i]
            const overlappingArea =
                (Math.min(
                player.position.x + player.width,
                battleZone.position.x + battleZone.width
                ) -
                Math.max(player.position.x, battleZone.position.x)) *
                (Math.min(
                player.position.y + player.height,
                battleZone.position.y + battleZone.height
                ) -
                Math.max(player.position.y, battleZone.position.y))
            let index = battleArray.findIndex(element => element.id == battleZone.sym)
      
            if (
              rectCollision({
                rect1: player,
                rect2: {
                  ...battleZone,
                  position: {
                    x: battleZone.position.x,
                    y: battleZone.position.y
                  }
                }
              }) && !battleArray[index].status
            ) {
                faceWaffle()
                console.log("X C:", battleZone.position.x)
                console.log("ILY")
                window.cancelAnimationFrame(animationId)
                audio.Map.stop()
                audio.initBattle.play()
                audio.battle.play()
                battle.initiated = true
                player.moving=false
                gsap.to('#overlappingDiv',{
                    opacity:1,
                    repeat:3,
                    yoyo: true,
                    duration: 0.4,
                    onComplete(){
                    
                        gsap.to("#overlappingDiv",{
                            opacity: 1,
                            duration: 0.4,
                            onComplete(){
                                initBattle(battleArray[index])
                                animateBattle()
                                gsap.to("#overlappingDiv",{
                                    opacity: 0,
                                    duration: 0.4
                                })
                                
                            }
                        })
                    }
                })
                
                break
            }
        }
    }
    if(keys.w.pressed && lastkey ==='w'){
        player.moving = true
        player.ocean = false
        for (let i=0; i < oceanTiles.length; i++){
            if (
                rectCollision({
                  rect1: player,
                  rect2: {
                    ...oceanTiles[i],
                    position: {
                      x: oceanTiles[i].position.x,
                      y: oceanTiles[i].position.y + 3
                    }
                  }
                })
              ) {
                console.log("IN THE OCEAN")

                player.ocean = true
              }
        }
        if(!player.ocean){
            player.image=player.sprites.up
        }
        else{
            player.image=player.sprites.up_boat
        }
        
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            const doorCheck = boundary.sym == 7 && battleArray[5].status
            const levelCheck = boundary.sym != 6 || !battleArray[4].status
            if (
                rectCollision({
                  rect1: player,
                  rect2: {
                    ...boundary,
                    position: {
                      x: boundary.position.x,
                      y: boundary.position.y + 3
                    }
                  }
                }) && doorCheck
              ) {
                console.log("INSIDE HOUSE")
                background.image.src="./assets/Final House.png"
                foreground.opacity=0
                for(let j=0;  j< chests.length; j++){
                  if(chests[j].position.x == boundary.position.x && chests[j].position.y == boundary.position.y){
                      showLetters(chests[j].sym)
                      break;
                  }
                }
                

            }
            if (
              rectCollision({
                rect1: player,
                rect2: {
                  ...boundary,
                  position: {
                    x: boundary.position.x,
                    y: boundary.position.y + 3
                  }
                }
              }) && levelCheck && !doorCheck
            ) {
                console.log("BATTLE 5 STATUS:", battleArray[4].status)
                console.log("PLAYER COORDINATES X:", player.position.x)
                console.log("PLAYER COORDINATES Y:", player.position.y)
              for(let j=0;  j< chests.length; j++){
                if(chests[j].position.x == boundary.position.x && chests[j].position.y == boundary.position.y){
                    showLetters(chests[j].sym)
                    break;
                }
              }
              
              moving = false
              break
            }
        }
        if (moving)
                movables.forEach((movable) => {
                    movable.position.y += 3
                })
        
        for(let k=0; k<oceans.length;k++){
            if (
                rectCollision({
                    rect1: player,
                    rect2: {
                    ...oceans[k],
                    position: {
                        x: oceans[k].position.x,
                        y: oceans[k].position.y + 3
                    }
                    }
                })
                ) {
                console.log("OCEAN HIT", k)
                player.image=player.sprites.up_boat
                movables.forEach((movable) => {
                    movable.position.y += 3
                })
                }
        }
        
        
            
    }
    else if(keys.a.pressed && lastkey ==='a'){
        player.moving = true
        player.ocean = false
        for (let i=0; i < oceanTiles.length; i++){
            if (
                rectCollision({
                  rect1: player,
                  rect2: {
                    ...oceanTiles[i],
                    position: {
                      x: oceanTiles[i].position.x+3,
                      y: oceanTiles[i].position.y
                    }
                  }
                })
              ) {
                console.log("IN THE OCEAN")
                player.ocean = true
              }
        }
        if(!player.ocean){
            player.image=player.sprites.left
        }
        else{
            player.image=player.sprites.left_boat
        }
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            const levelCheck = boundary.sym != 6 || !battleArray[4].status
            if (
              rectCollision({
                rect1: player,
                rect2: {
                  ...boundary,
                  position: {
                    x: boundary.position.x + 3,
                    y: boundary.position.y
                  }
                }
              }) && levelCheck
            ) {
                for(let j=0;  j< chests.length; j++){
                    if(chests[j].position.x == boundary.position.x && chests[j].position.y == boundary.position.y){
                        showLetters(chests[j].sym)
                        break;
                    }
                  }
              moving = false
              break
            }
        }
        
      
      
        if (moving)
            movables.forEach((movable) => {
            movable.position.x += 3
        })
        else{
            for(let k=0; k<oceans.length;k++){
                if (
                    rectCollision({
                      rect1: player,
                      rect2: {
                        ...oceans[k],
                        position: {
                          x: oceans[k].position.x+3,
                          y: oceans[k].position.y 
                        }
                      }
                    })
                  ) {
                    player.image=player.sprites.left_boat
                    movables.forEach((movable) => {
                        movable.position.x += 3
                    })
                  }
            }
        }
        
    }
    else if(keys.s.pressed && lastkey ==='s'){
        player.moving = true
        player.ocean = false
        for (let i=0; i < oceanTiles.length; i++){
            if (
                rectCollision({
                  rect1: player,
                  rect2: {
                    ...oceanTiles[i],
                    position: {
                      x: oceanTiles[i].position.x,
                      y: oceanTiles[i].position.y - 3
                    }
                  }
                })
              ) {
                console.log("IN THE OCEAN")

                player.ocean = true
              }
        }
        if(!player.ocean){
            player.image=player.sprites.down
        }
        else{
            player.image=player.sprites.down_boat
        }
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            const doorCheck = boundary.sym == 7 && battleArray[5].status
            const levelCheck = boundary.sym != 6 || !battleArray[4].status
            if (
                rectCollision({
                  rect1: player,
                  rect2: {
                    ...boundary,
                    position: {
                      x: boundary.position.x,
                      y: boundary.position.y + 3
                    }
                  }
                }) && doorCheck
              ) {
                console.log("OUTSIDE HOUSE")
                background.image.src="./assets/WaffleVille2.png"
                foreground.opacity=100
               

            }
            if (
                rectCollision({
                    rect1: player,
                    rect2: {
                    ...boundary,
                    position: {
                        x: boundary.position.x,
                        y: boundary.position.y - 3
                    }
                    }
                })
            ) {
                for(let j=0;  j< chests.length; j++){
                    if(chests[j].position.x == boundary.position.x && chests[j].position.y == boundary.position.y){
                        showLetters(chests[j].sym)
                        break;
                    }
                  }
                moving = false
                break
            }
        }
      
        if (moving)
            movables.forEach((movable) => {
            movable.position.y -= 3
        })
        else{
            for(let k=0; k<oceans.length;k++){
                if (
                    rectCollision({
                      rect1: player,
                      rect2: {
                        ...oceans[k],
                        position: {
                          x: oceans[k].position.x,
                          y: oceans[k].position.y - 3
                        }
                      }
                    })
                  ) {
                    player.image=player.sprites.down_boat
                    movables.forEach((movable) => {
                        movable.position.y -= 3
                    })
                  }
            }
        }
    }
    else if(keys.d.pressed && lastkey ==='d'){
        player.moving = true
        player.ocean = false
        for (let i=0; i < oceanTiles.length; i++){
            if (
                rectCollision({
                  rect1: player,
                  rect2: {
                    ...oceanTiles[i],
                    position: {
                      x: oceanTiles[i].position.x-3,
                      y: oceanTiles[i].position.y
                    }
                  }
                })
              ) {
                console.log("IN THE OCEAN")

                player.ocean = true
              }
        }
        if(!player.ocean){
            player.image=player.sprites.right
        }
        else{
            player.image=player.sprites.right_boat
        }
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            const levelCheck = boundary.sym != 6 || !battleArray[4].status
            if (
                rectCollision({
                    rect1: player,
                    rect2: {
                    ...boundary,
                    position: {
                        x: boundary.position.x - 3,
                        y: boundary.position.y
                    }
                    }
                }) && levelCheck
            ){
                for(let j=0;  j< chests.length; j++){
                    if(chests[j].position.x == boundary.position.x && chests[j].position.y == boundary.position.y){
                        showLetters(chests[j].sym)
                        break;
                    }
                  }
                moving = false
                break
            }
        }
      
        if (moving)
            movables.forEach((movable) => {
            movable.position.x -= 3
        })
        else{
            for(let k=0; k<oceans.length;k++){
                if (
                    rectCollision({
                      rect1: player,
                      rect2: {
                        ...oceans[k],
                        position: {
                          x: oceans[k].position.x-3,
                          y: oceans[k].position.y
                        }
                      }
                    })
                  ) {
                    player.image=player.sprites.right_boat
                    movables.forEach((movable) => {
                        movable.position.x -= 3
                    })
                  }
            }
        }
    }
}
animate()

let lastkey=''
window.addEventListener('keydown',(e) =>{
    switch(e.key){
        case 'w':
            keys.w.pressed=true;
            lastkey='w'
            break;
        case 'a':
            keys.a.pressed=true;
            lastkey='a'
            break
        case 's':
            keys.s.pressed=true;
            lastkey='s'
            break
        case 'd':
            keys.d.pressed=true;
            lastkey='d'
            break
    }
})
window.addEventListener('keyup',(e) =>{
    switch(e.key){
        case 'w':
            keys.w.pressed=false;
            break;
        case 'a':
            keys.a.pressed=false;
            break
        case 's':
            keys.s.pressed=false;
            break
        case 'd':
            keys.d.pressed=false;
            break
    }
})

let clicked = false
addEventListener('click', () => {
  if (!clicked) {
    audio.Map.loop = true;
    audio.Map.play()
    clicked = true
  }
})
document.querySelectorAll('button').forEach((button) => {
    button.addEventListener('click', (e) => {
        if(e.currentTarget.innerHTML=='X'){
            document.querySelector('#letterBox').style.display='none'
            battle.initiated=false
        }
    })
})
console.log("WTF")