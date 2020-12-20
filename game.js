let gameState = {}

function preload () {
  // load in background and characters
  this.load.image('bg',     'https://content.codecademy.com/projects/learn-phaser/cyoa/background.png');
  this.load.image('orc',    './images/kexinandkobi2.jpg');
  this.load.image('kexin',  './images/kexin1.jpg');
  this.load.image('sadKX',  './images/sadkexin.jpg');
  this.load.image('duckKX', './images/duckkexin.jpg');
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
        { option: 'Ignore this Hoe',   nextPage: 41 },
      ]
    },

    {
      character: 'kexin',
      page: 41,
      narrative: 'Uhm. Excuse me?!',
      options: [
        { option: 'Ok fine wtf do you want',     nextPage: 2 },
        { option: 'Continue Ignoring',   nextPage: 3 },
      ]
    },

    {
      character: 'kexin',
      page: 2,
      narrative: 'Can you please help me and my bibiboi?',
      options: [
        { option: 'Your... what?',   nextPage: 5 },
        { option: 'Don\'t think so',   nextPage: 4 },
      ]
    },

    {
      character: 'orc',
      page: 5,
      narrative: 'My dog... His name is Kobi and he\'s very sick.',
      options: [
        { option: 'How so?',   nextPage: 6 },
        { option: 'No I don\'t think so',   nextPage: 4 },
      ]
    },

    {
      character: 'orc',
      page: 6,
      narrative: 'He\'s overweight as fuck, and chokes and gags and wheezes in his sleep every night.',
      options: [
        { option: 'Laugh at Kobi for being obese',   nextPage: 48 },
        { option: 'And why is he this way?', nextPage: 10}
      ]
    },

    {
      character: 'orc',
      page: 48,
      narrative: 'Ke Xin is angry and upset, and decides to abandon Kobi. Kobi dies immediately. Ke Xin now hates you.',
      options: [
        { option: 'umm... lol ok',   nextPage: 1 } //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      ]
    },

    {
      character: 'orc',
      page: 10,
      narrative: 'He\'s a greedy, lazy bastard haha. Any fatter and he\'s gonna explode.',
      options: [
        { option: 'No problem',   nextPage: 1 }, //11
        { option: 'Really?',   nextPage: 1 }, //18
      ]
    },

    {
      character: 'orc',
      page: 18,
      narrative: 'Orc: Uhm. Yes? I\'m an orc? Did you miss that somehow?',
      options: [
        { option: 'I guess so',   nextPage: 20 },
      ]
    },

    {
      character: 'orc',
      page: 20,
      narrative: 'You and the orc discuss ogre politics while he bakes cookies. You have a perfectly wonderful time.',
      options: [
        { option: 'Eat cookies',   nextPage: 21 },
      ]
    },

    {
      character: 'orc',
      page: 21,
      narrative: 'The cookies are fantastic. ',
      options: [
        { option: 'Request recipe',   nextPage: 19 },
      ]
    },

    {
      character: 'orc',
      page: 19,
      narrative: 'The orc shares his recipe with you. You leave the cave feeling energized from the sugar.\nTHE END',
      options: [
        { option: 'Play again', nextPage: 1 },
      ]
    },

    {
      character: 'knight',
      page: 11,
      narrative: 'Knight: Hey. Did you help out that orc?',
      options: [
        { option: 'Yes',  nextPage: 12 },
        { option: 'No',   nextPage: 23 },
      ]
    },

    {
      character: 'knight',
      page: 23,
      narrative: 'Knight: OK Good.',
      options: [
        { option: 'Actually...',  nextPage: 12 },
        { option: 'Leave',   nextPage: 24 },
      ]
    },

    {
      character: 'knight',
      page: 24,
      narrative: 'You walk out of the cave. What a weird adventure you went on today!\nTHE END',
      options: [
        { option: 'Play again',  nextPage: 1 },
      ]
    },

    {
      character: 'knight',
      page: 12,
      narrative: 'Knight: You really shouldn\'t have. How will the orc ever learn?',
      options: [
        { option: 'I guess.',     nextPage: 14 },
        { option: 'Who are you?', nextPage: 13 },
      ]
    },

    {
      character: 'knight',
      page: 13,
      narrative: 'Knight: Just an interested party.',
      options: [
        { option: 'Whatever.', nextPage: 25 },
        { option: 'You\'re right', nextPage: 17 },
      ]
    },

    {
      character: 'knight',
      page: 25,
      narrative: 'Knight: I know what\'s best for orcs.',
      options: [
        { option: 'I guess.', nextPage: 14 },
      ]
    },

    {
      character: 'knight',
      page: 17,
      narrative: 'You act like nothing is wrong with what the knight is saying.',
      options: [
        { option: 'OK', nextPage: 22 },
      ]
    },

    {
      character: 'knight',
      page: 22,
      narrative: 'But thinking about it later you realize you should\'ve been more proactive.\nGAME OVER',
      options: [
        { option: 'Play again', nextPage: 1 },
      ]
    },

    {
      character: 'knight',
      page: 14,
      narrative: 'Knight: You guess? Come on. An orc should be able to be independent.',
      options: [
        { option: 'Cookies',     nextPage: 15 },
        { option: 'Who are you?', nextPage: 13 },
      ]
    },

    {
      character: 'knight',
      page: 15,
      narrative: 'You try explaining to the knight that you got cookies and a new friend.',
      options: [
        { option: 'OK',     nextPage: 16 },
      ]
    },

    {
      character: 'knight',
      page: 16,
      narrative: 'But the knight continues being weird and rude for some reason.\nGAME OVER',
      options: [
        { option: 'Play again',     nextPage: 1 },
      ]
    },

    {
      character: 'duckKX',
      page: 3,
      narrative: 'Pleaseeeeee look I\'m such a qtpie',
      options: [
        { option: 'Ok wtf fine! What?',  nextPage: 2 },
        { option: 'Walk away slowly',   nextPage: 4 },
      ]
    },

    {
      character: 'sadKX',
      page: 4,
      narrative: 'Oh wow you really won\'t help a desperate woman. You really are a penishead, I FKING HOPE YOU DIE!!!',
      options: [
        { option: 'Leave',   nextPage: 1 },
        { option: 'Pee on her',   nextPage: 7 },
      ]
    },

    {
      character: 'orc',
      page: 7,
      narrative: 'You pee on her and she kind of enjoys it.',
      options: [
        { option: 'OK',   nextPage: 1 }, //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
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
      character: 'knight',
      page: 40,
      narrative: 'Knight: Hi.',
      options: [
        { option: 'Hi friend',   nextPage: 42},
      ]
    },

    {
      character: 'knight',
      page: 42,
      narrative: 'Knight: Actually I\'m kind of busy.',
      options: [
        { option: 'Oh?',   nextPage: 43},
      ]
    },

    {
      character: 'knight',
      page: 43,
      narrative: 'Knight: But I\'ll call you later when I can.',
      options: [
        { option: 'That\'s fine',   nextPage: 44},
      ]
    },

    {
      character: 'knight',
      page: 44,
      narrative: 'The Knight never calls, and it shouldn\'t really bother you but it does.',
      options: [
        { option: 'OK',   nextPage: 45},
      ]
    },

    {
      character: 'knight',
      page: 45,
      narrative: 'You failed to make friends in the cave.\nGAME OVER',
      options: [
        { option: 'Play again',   nextPage: 1},
      ]
    },

    {
      character: 'wizard',
      page: 30,
      narrative: 'Wizard: Oh. Wow. Ok. What do you want to do?',
      options: [
        { option: 'Play video games',   nextPage: 31 },
        { option: 'Small talk',   nextPage: 32 },
      ]
    },

    {
      character: 'wizard',
      page: 31,
      narrative: 'You play video games with the wizard.',
      options: [
        { option: 'OK',   nextPage: 36 },
      ]
    },

    {
      character: 'wizard',
      page: 36,
      narrative: 'The wizard keeps losing to you at video games!',
      options: [
        { option: 'OK',   nextPage: 37 },
      ]
    },

    {
      character: 'wizard',
      page: 37,
      narrative: 'The wizard is a very sore loser and casts a banishing spell on you! Sheesh!\nTHE END',
      options: [
        { option: 'Play again',   nextPage: 1 },
      ]
    },

    {
      character: 'wizard',
      page: 32,
      narrative: 'Wizard: How\'s the weather outside?',
      options: [
        { option: 'It\'s OK',   nextPage: 33 },
        { option: 'The worst!',   nextPage: 33 },
        { option: 'Great!',   nextPage: 33 },
      ]
    },

    {
      character: 'wizard',
      page: 33,
      narrative: 'You and the wizard continue engaging in small talk. You learn you grew up not far from each other.',
      options: [
        { option: 'OK',   nextPage: 34 },
      ]
    },

    {
      character: 'wizard',
      page: 34,
      narrative: 'You have a couple mutual friends, in fact! You decide to hang out again next week.',
      options: [
        { option: 'OK',   nextPage: 35 },
      ]
    },

    {
      character: 'wizard',
      page: 35,
      narrative: 'You made a valuable friend today!\nTHE END',
      options: [
        { option: 'Play again',   nextPage: 1},
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
    },

    {
      character: 'orc',
      page: 9,
      narrative: 'You leave the cave with a new outlook. Your radiant confidence makes a palpable positive impact on your life.\nTHE END',
      options: [
        { option: 'Play again',   nextPage: 1 },
      ]
    }
   ]

  return pages.find(function(e) { if(e.page == page) return e });
}