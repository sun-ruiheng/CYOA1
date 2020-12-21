let gameState = {}

function preload () {
  // load in background and characters
  this.load.image('bg',      'https://content.codecademy.com/projects/learn-phaser/cyoa/background.png');
  this.load.image('kxKobi',  './images/kexinandkobi2.jpg');
  this.load.image('kexin',   './images/kexin1.jpg');
  this.load.image('sadKX',   './images/sadkexin.jpg');
  this.load.image('duckKX',  './images/duckkexin.jpg');
  this.load.image('kekKX',   './images/laughingkexin.jpg');
  this.load.image('cheekKX', './images/cheekykexin.jpg');
  this.load.image('deaddog', './images/deadkobi.jpg');

  this.load.image('wesley',  './images/cutewesley.jpg');
  this.load.image('wizley',  './images/wizleybare.jpg');
  this.load.image('wizKyn',  './images/wizleykynan.jpg');
  this.load.image('wtfwes',  './images/wtfwes.jpg');
  this.load.image('wizC1',   './images/cutewes1.jpg');
  this.load.image('wizC2',   './images/cutewes2.jpg');
  this.load.image('wizC3',   './images/cutewes3.jpg');
  this.load.image('baldwes', './images/baldwesley.jpg');
  this.load.image('blurwes', './images/blurredwes.jpg');
  this.load.image('jon1',    './images/johnny1.png');
  this.load.image('jon2',    './images/johnny2.jpg');
  this.load.image('cavewes', './images/cavewes.jpg');
  this.load.image('bonkwes', './images/bonkwes.jpg');
  this.load.image('bonkwes2','./images/bonk2.jpg');
  this.load.image('rh',      './images/rh1.jpg');


}


function create() {
  gameState.background = this.add.image(0, 0, 'bg');
  gameState.background.setOrigin(0, 0);
  renderCharacter(this, 'knight');

  initializePage(this);
  var firstPage = fetchPage(1);
  displayPage(this, firstPage);
}



function renderCharacter(scene, key) {
  if (gameState.character) {
    gameState.character.destroy();
  }
  gameState.character = scene.add.image(270, 340, key);
  gameState.character.setOrigin(.5, 1);
  gameState.character.setScale(0.7);
}


function initializePage(scene) {
  // create options list and background
  // and saves them into gameState

  if (!gameState.options) {
    // create options list
    // if it doesn't exist
    gameState.options = [];
  }

  if (!gameState.narrative_background) {
    // create narrative background
    // if it doesn't exist
    gameState.narrative_background = scene.add.rectangle(10, 360, 430, 170, 0x000);
  gameState.narrative_background.setOrigin(0, 0);
  }
}

function destroyPage() {
  // wipe out narrative text and options

  if (gameState.narrative) {
    // destroy narrative if it exists
    gameState.narrative.destroy();
  }

  for (let option of gameState.options) {
    // destroy options if they exist
    option.optionBox.destroy();
    option.optionText.destroy();
  }
}

function displayPage(scene, page) {
  const narrativeStyle = { fill: '#ffffff', fontStyle: 'italic', align: 'center', wordWrap: { width: 340 }, lineSpacing: 8};
  

//render character??
  renderCharacter(scene, page.character);

  // display general page character
  // & narrative here:
  gameState.narrative = scene.add.text(65, 380, page.narrative, narrativeStyle);

  // for-loop creates different options
  // need the index i for spacing the boxes
  for (let i=0; i<page.options.length; i++) {
    let option = page.options[i];

    // color in the option box
    const optionBox = scene.add.rectangle(40 + i * 130, 470, 110, 40, 0xb39c0e, 0)
    optionBox.strokeColor = 0xb39c0e;
    optionBox.strokeWeight = 2;
    optionBox.strokeAlpha = 1;
    optionBox.isStroked = true;
    optionBox.setOrigin(0, 0)

    // add in the option text
    const baseX = 40 + i * 130;
    const optionText = scene.add.text(baseX, 480, option.option, { fontSize:14, fill: '#b39c0e', align: 'center', wordWrap: {width: 110}});
    const optionTextBounds = optionText.getBounds()

    // centering each option text
    optionText.setX(optionTextBounds.x + 55 - (optionTextBounds.width / 2));
    optionText.setY(optionTextBounds.y + 10 - (optionTextBounds.height / 2));

    // add in gameplay functionality
    // for options here
    optionBox.setInteractive();
    optionBox.on('pointerup', function() {
      var newPage = this.option.nextPage;
      if (newPage !== undefined) {
        destroyPage();
        displayPage(scene, fetchPage(newPage));
      }
    }, { option });
    optionBox.on('pointerover', function() {
      this.optionBox.setStrokeStyle(2, 0xffe014, 1);
      this.optionText.setColor('#ffe014');
    }, {optionBox, optionText});
    optionBox.on('pointerout', function() {
      this.optionText.setColor('#b39c0e');
      this.optionBox.setStrokeStyle(1, 0xb38c03, 1);
    }, { optionText, optionBox});

      gameState.options.push({
        optionBox,
        optionText
      });
  }
}

const config = {
  type: Phaser.WEBGL,
  parent: 'phaser-game',
  backgroundColor: 0xfea0fd,
  width: 450,
  height: 550,
  scene: {
    preload,
    create,
  }
};

const game = new Phaser.Game(config);

function fetchPage(page) {


   const pages = [
     {
      character: 'kexin',
      page: 1,
      narrative: 'Hey, good to meet you. I\'m Xie Ke Xin.',
      options: [
        { option: 'Say Hi to Ke Xin',   nextPage: 2 },
        { option: 'Ignore this Hoe',   nextPage: 9 },
      ]
    },

    {
      character: 'kexin',
      page: 2,
      narrative: 'Can you please help me and my bibiboi?',
      options: [
        { option: 'Your... what?',   nextPage: 3 },
        { option: 'Don\'t think so',   nextPage: 11 },
      ]
    },

    {
      character: 'kxKobi',
      page: 3,
      narrative: 'My dog... His name is Kobi and he\'s very sick.',
      options: [
        { option: 'How so?',   nextPage: 4 },
        { option: 'Not my problem. Fuck off bitch!!!!',   nextPage: 11 },
      ]
    },

    {
      character: 'kxKobi',
      page: 4,
      narrative: 'He\'s overweight as fuck, and chokes and gags and wheezes in his sleep every night.',
      options: [
        { option: 'Laugh at Kobi for being obese',   nextPage: 7 },
        { option: 'And why is he this way?', nextPage: 5}
      ]
    },

    {
      character: 'kxKobi',
      page: 5,
      narrative: 'He\'s a greedy, lazy bastard haha. Any fatter and he\'s gonna explode.',
      options: [
        { option: 'Oh shit watch out!!!',   nextPage: 6 }
      ]
    },

    {
      character: 'deaddog',
      page: 6,
      narrative: 'BOOOOM! Kobi implodes! He\'s super DEAD!!!',
      options: [
        { option: 'O shit... haha...',   nextPage: 8 }
      ]
    },
    
    {
      character: 'deaddog',
      page: 7,
      narrative: 'Ke Xin is angry and upset, and decides to abandon Kobi. Kobi dies immediately.',
      options: [
        { option: 'umm... wtf???',   nextPage: 8 } 
      ]
    },

    {
      character: 'kekKX',
      page: 8,
      narrative: 'Omg nooo kobi... haha at least the burden is gone lmao fatass dog xD',
      options: [
        { option: 'Haha hell yea',   nextPage: 13 } //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! onto wesley
      ]
    },

    {
      character: 'kexin',
      page: 9,
      narrative: 'Uhm. Excuse me?!',
      options: [
        { option: 'Ok fine wtf do you want',     nextPage: 2 },
        { option: 'Continue Ignoring',   nextPage: 10 },
      ]
    },

    {
      character: 'duckKX',
      page: 10,
      narrative: 'Pleaseeeeee look I\'m such a qtpie',
      options: [
        { option: 'Ok wtf fine! What?',  nextPage: 2 },
        { option: 'Walk away',   nextPage: 11 },
      ]
    },

    {
      character: 'sadKX',
      page: 11,
      narrative: 'Oh wow you really won\'t help a desperate woman. You really are a penishead, I FKING HOPE YOU DIE!!!',
      options: [
        { option: 'Walk away',   nextPage: 14 }, ///////////////////
        { option: 'Pee on her',   nextPage: 12 },
      ]
    },

    {
      character: 'cheekKX',
      page: 12,
      narrative: 'You pee on her and she kind of enjoys it.',
      options: [
        { option: 'Hell yeaaaaa',   nextPage: 15 }, //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      ]
    },



//wesley arc

    {
      character: 'wesley',
      page: 13,
      narrative: 'Ooh is that a dead dog?',
      options: [
        { option: 'Yea...',   nextPage: 13.5 },
        { option: 'Who tf are you?', nextPage: 16}
      ]
    },

    {
      character: 'wesley',
      page: 13.5,
      narrative: 'Hehe, reminds me of dead quails!!!',
      options: [
        { option: '...wtf',   nextPage: 16 }
      ]
    },

    {
      character: 'wesley',
      page: 14,
      narrative: 'penis',
      options: [
        { option: 'Who tf are you?', nextPage: 16}
      ]
    },

    {
      character: 'wesley',
      page: 15,
      narrative: 'Pee on me too plsplspls',
      options: [
        { option: 'Okay!',   nextPage: 15.5 },
        { option: 'Who tf are you?', nextPage: 16}
      ]
    },

    {
      character: 'wesley',
      page: 15.5,
      narrative: 'yummy yummy',
      options: [
        { option: 'nomnom',   nextPage: 16 }
      ]
    },

    {
      character: 'wizley',
      page: 16,
      narrative: 'Hey there, I\'m Wesley the Wizard.',
      options: [
        { option: '...Sure you are',   nextPage: 19 },
        { option: 'Can you make my cock longer?', nextPage: 17 }
      ]
    },
    
    {
      character: 'wizley',
      page: 17,
      narrative: 'Hmm... yea, but Imma have to jack it off.',
      options: [
        { option: 'NO PROBLEM!!!',   nextPage: 18 },
        { option: 'Hell nahhh you ain\'t no wizard!', nextPage: 19}
      ]
    },
    
    {
      character: 'wizley',
      page: 18,
      narrative: 'Wesley busts your nut with graceful expertise. Your cock grows three inches.',
      options: [
        { option: 'Woah!',   nextPage: 21 }
      ]
    },
    
    {
      character: 'wizley',
      page: 19,
      narrative: 'I\'ll fuckin prove it to you!',
      options: [
        { option: 'Okay, do a trick!',   nextPage: 20 },
        { option: 'Shut the fuck up bitchhhh', nextPage: 20}
      ]
    },
    
    {
      character: 'wizKyn',
      page: 20,
      narrative: 'Wesley rubs his cock aggressively and summons two mofos out of thin air.',
      options: [
        { option: 'Holy cow!',   nextPage: 21 }
      ]
    },

    {
      character: 'wizley',
      page: 21,
      narrative: 'Told you bitchhhh',
      options: [
        { option: 'What else can you do?',   nextPage: 22 },
        { option: 'Meh idk you kinda suck',   nextPage: 21.5 }
      ]
    },

    {
      character: 'wtfwes',
      page: 21.5,
      narrative: 'wtf...',
      options: [
        { option: 'ok ok fine show me more',   nextPage: 22 }
      ]
    },

    {
      character: 'wizley',
      page: 22,
      narrative: 'Well, what else do you want to see?',
      options: [
        { option: 'Can you turn bald?',   nextPage: 22.5 },
        { option: 'Turn into a caveman!',   nextPage: 29 },
        { option: 'Show me a cute ass smile <3',   nextPage: 34 }
      ]
    },

    {
      character: 'baldwes',
      page: 22.5,
      narrative: '*POOF* and he turns bald!!!',
      options: [
        { option: 'Cool!',   nextPage: 23 }
      ]
    },

    {
      character: 'blurwes',
      page: 23,
      narrative: 'Wait... what\'s happening to me? I feel... weird...',
      options: [
        { option: 'um...',   nextPage: 24 }
      ]
    },

    {
      character: 'jon1',
      page: 24,
      narrative: 'AHHH!!!!!!!!',
      options: [
        { option: 'WTF!!!',   nextPage: 25 },
        { option: 'Oooh hello ;)',   nextPage: 25 }
      ]
    },

    {
      character: 'jon2',
      page: 25,
      narrative: 'im horny',
      options: [
        { option: 'let\'s FUCK!',   nextPage: 25.5 },
        { option: 'Ew no wtf wesley',   nextPage: 26 }
      ]
    },

    {
      character: 'jon2',
      page: 25.5,
      narrative: 'Johnny-Wesley-Sins fucks you goooood.',
      options: [
        { option: 'mmm',   nextPage: 25.6 }
      ]
    },

    {
      character: 'jon2',
      page: 25.6,
      narrative: 'My cock stings. I think I have several STDs.',
      options: [
        { option: 'You gotta stop being Johnny',   nextPage: 26 }
      ]
    },

    {
      character: 'jon1',
      page: 26,
      narrative: 'Ok sorry pls help me be myself again',
      options: [
        { option: 'no',   nextPage: 26.1},
        { option: 'how?',   nextPage: 27 }
      ]
    },

    {
      character: 'jon1',
      page: 26.1,
      narrative: 'Johnny-Wesley-Sins is disappointed in you. (TBC!)',
      options: [
        { option: '[Restart Game]',   nextPage: 1 }
      ]
    },

    {
      character: 'jon1',
      page: 27,
      narrative: 'Here, take this. Aim it at me to bring me back in time.',
      options: [
        { option: 'Take the device',   nextPage: 27.1 }
      ]
    },

    {
      character: 'jon1',
      page: 27.1,
      narrative: 'Ok do it!',
      options: [
        { option: 'Push the button',   nextPage: 27.2 }
      ]
    },

    {
      character: 'wesley',
      page: 27.2,
      narrative: 'OK THATS ENOUGH',
      options: [
        { option: 'Stop pressing',   nextPage: 28 },
        { option: 'Continue pressing',   nextPage: 29 }
      ]
    },

    {
      character: 'wesley',
      page: 28,
      narrative: 'Thanks for the help! (TBC!)',
      options: [
        { option: '[Restart Game]',   nextPage: 1 }
      ]
    },

    {
      character: 'cavewes',
      page: 29,
      narrative: 'Fuck... I\'m a caveman... googoogaagaa',
      options: [
        { option: '...You ok?',   nextPage: 30 }
      ]
    },

    {
      character: 'cavewes',
      page: 30,
      narrative: 'ga gaa gaa goog oogoogo',
      options: [
        { option: '...',   nextPage: 31 }
      ]
    },

    {
      character: 'cavewes',
      page: 31,
      narrative: 'GOOGAAGAA!!!',
      options: [
        { option: 'wtf',   nextPage: 32 }
      ]
    },

    {
      character: 'bonkwes',
      page: 32,
      narrative: '*BONK* someone bonks Wesley and he\'s out cold!',
      options: [
        { option: 'Who was that?',   nextPage: 33 }
      ]
    },

    {
      character: 'rh',
      page: 33,
      narrative: 'I hate cavemen!!! (TBC)',
      options: [
        { option: 'oh wow you are so sexy',   nextPage: 1 }
      ]
    },

    {
      character: 'wizC1',
      page: 34,
      narrative: '',
      options: [
        { option: '...',   nextPage: 34.1 }
      ]
    },

    {
      character: 'wizC2',
      page: 34.1,
      narrative: '',
      options: [
        { option: '...',   nextPage: 34.2 }
      ]
    },

    {
      character: 'wizC3',
      page: 34.2,
      narrative: '',
      options: [
        { option: '...',   nextPage: 35 }
      ]
    },

    {
      character: 'wizC3',
      page: 35,
      narrative: 'See? I\'m a sweetiepie',
      options: [
        { option: 'You sure you aren\'t just constipated?',   nextPage: 36 },
        { option: 'Mmm... you really are!',   nextPage: 37 }
      ]
    },

    {
      character: 'wizC3',
      page: 36,
      narrative: 'Shit you\'re right. Bye I gtg take a fat dook!',
      options: [
        { option: 'Bye!',   nextPage: 37 }
      ]
    },

    {
      character: 'wtfwes',
      page: 37,
      narrative: '*farts and shits* oops!',
      options: [
        { option: 'Did you just shit yourself???',   nextPage: 38 }
      ]
    },

    {
      character: 'bonkwes2',
      page: 38,
      narrative: '*BONK* Someone bonked Wesley and knocked his poopy ass out!',
      options: [
        { option: 'Who did that?',   nextPage: 39 },
        { option: 'Haha bonk',   nextPage: 39 }
      ]
    },

    {
      character: 'rh',
      page: 39,
      narrative: 'I hate poopy pants! (TBC)',
      options: [
        { option: 'Me too!',   nextPage: 1 }
      ]
    },













  














    {
      character: 'wizard',
      page: 8,
      narrative: 'Wizard: Hey there.',
      options: [
        { option: 'Hello, wizard.',   nextPage: 26 },
      ]
    },

    {
      character: 'wizard',
      page: 26,
      narrative: 'Wizard: Do you have any unfinished business in my cave?',
      options: [
        { option: 'Make friends',   nextPage: 27 },
        { option: 'Make enemies',   nextPage: 46 },
        { option: 'Make cookies',   nextPage: 29 },
      ]
    },

    {
      character: 'wizard',
      page: 46,
      narrative: 'Wizard: I don\'t think you need help with that.',
      options: [
        { option: 'Wow',   nextPage: 47 },
      ]
    },

    {
      character: 'wizard',
      page: 47,
      narrative: 'You got ROASTED by the wizard.\nGAME OVER',
      options: [
        { option: 'Play again',   nextPage: 1 },
      ]
    },

    {
      character: 'wizard',
      page: 27,
      narrative: 'Wizard: There are many creatures to befriend here. Whose companionship do you desire?',
      options: [
        { option: 'Orc',   nextPage: 28 },
        { option: 'Wizard',   nextPage: 30 },
        { option: 'Knight',   nextPage: 38 },
      ]
    },

    {
      character: 'wizard',
      page: 38,
      narrative: 'Wizard: Are you sure? That guy gives me the creeps.',
      options: [
        { option: 'I\'m sure',   nextPage: 39 },
        { option: 'I don\'t know',   nextPage: 27 },
      ]
    },

    {
      character: 'wizard',
      page: 39,
      narrative: 'Wizard: OK! Summoning the knight now.',
      options: [
        { option: 'Great',   nextPage: 40},
      ]
    },

    {
      character: 'wizard',
      page: 28,
      narrative: 'Wizard: Really? Seems like you were kinda standoffish to him earlier.',
      options: [
        { option: 'I can change',   nextPage: 29 },
        { option: 'I was surprised',   nextPage: 29 },
      ]
    },

    {
      character: 'wizard',
      page: 29,
      narrative: 'Wizard: I will send you back in time, try being nicer to the orc.',
      options: [
        { option: 'OK',   nextPage: 1 },
      ]
    }


   ]

  return pages.find(function(e) { if(e.page == page) return e });
}