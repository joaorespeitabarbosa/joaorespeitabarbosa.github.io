// Game configuration and variables
let player;
let cursors;
let interactKey;
let interactText;
let currentInteractable = null;
let isGameStarted = false;

// CV content
const cvData = {
  education: {
    title: "📚 EDUCAÇÃO",
    content: "🎓 Mestrado em Engenharia Informática\n\n🎓 Licenciatura em Ciências da Computação\n\n🎓 Especialização em Desenvolvimento de Jogos"
  },
  experience: {
    title: "💼 EXPERIÊNCIA",
    content: "🏢 Desenvolvedor de Software | Empresa XYZ | 2023-Presente\n• Desenvolvimento de aplicações web\n• Implementação de sistemas backend\n\n🏢 Estágio em Desenvolvimento | Startup ABC | 2022\n• Criação de protótipos de jogos\n• Desenvolvimento front-end"
  },
  skills: {
    title: "🛠️ HABILIDADES",
    content: "🧠 Linguagens: Python, C#, JavaScript, HTML/CSS\n\n🎮 Ferramentas: Unity, Git, Phaser.js, React\n\n🤖 Áreas: Desenvolvimento Web, IA, Criação de Jogos"
  },
  projects: {
    title: "🚀 PROJETOS",
    content: "🎮 Jogo Indie - Um jogo 2D desenvolvido com Unity\n\n💻 Portfolio Web - Criado com React e Three.js\n\n🤖 Chat Bot - Assistente virtual baseado em IA"
  },
  contact: {
    title: "📱 CONTATO",
    content: "📧 Email: exemplo@email.com\n\n🔗 LinkedIn: linkedin.com/in/exemplo\n\n🐙 GitHub: github.com/exemplo"
  }
};

// Wait for the DOM to be loaded
document.addEventListener('DOMContentLoaded', function() {
  // Set up event listeners
  document.getElementById('start-game').addEventListener('click', startGame);
  document.getElementById('close-info').addEventListener('click', closeInfo);
  document.getElementById('back-to-home').addEventListener('click', returnToHome);
});

// Function to start the game
function startGame() {
  if (isGameStarted) {
    // Se o jogo já estiver iniciado, primeiro o destruímos para reiniciar
    if (window.game) {
      window.game.destroy(true);
    }
  }
  
  isGameStarted = true;
  
  document.getElementById('game-intro').classList.add('hidden');
  document.getElementById('home-button').classList.remove('hidden');
  
  // Phaser game configuration
  const config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    parent: 'game-container',
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 0 },
        debug: false
      }
    },
    pixelArt: true,
    scene: {
      preload: preload,
      create: create,
      update: update
    }
  };
  
  // Create the game
  window.game = new Phaser.Game(config);
}

// Preload assets
function preload() {
  // Load player sprite
  this.load.spritesheet('player', 
    'https://raw.githubusercontent.com/photonstorm/phaser3-examples/master/public/assets/sprites/dude.png',
    { frameWidth: 32, frameHeight: 48 }
  );
  
  // Load interactable objects with better visible icons
  this.load.image('education', 'https://cdn-icons-png.flaticon.com/512/2436/2436636.png');
  this.load.image('experience', 'https://cdn-icons-png.flaticon.com/512/3281/3281289.png');
  this.load.image('skills', 'https://cdn-icons-png.flaticon.com/512/5741/5741483.png');
  this.load.image('projects', 'https://cdn-icons-png.flaticon.com/512/3368/3368838.png');
  this.load.image('contact', 'https://cdn-icons-png.flaticon.com/512/2343/2343694.png');
}

// Create game objects
function create() {
  // Create a simple background
  const graphics = this.add.graphics();
  graphics.fillStyle(0x000000, 1);
  graphics.fillRect(0, 0, this.cameras.main.width, this.cameras.main.height);
  
  // Add grid lines for retro feel
  graphics.lineStyle(1, 0x113311, 0.8);
  const gridSize = 32;
  for (let x = 0; x < this.cameras.main.width; x += gridSize) {
    graphics.moveTo(x, 0);
    graphics.lineTo(x, this.cameras.main.height);
  }
  for (let y = 0; y < this.cameras.main.height; y += gridSize) {
    graphics.moveTo(0, y);
    graphics.lineTo(this.cameras.main.width, y);
  }
  graphics.strokePath();
  
  // Create interactable objects group
  const interactables = this.physics.add.group();
  
  // Calculate positions (in a circular pattern around center)
  const centerX = this.cameras.main.width / 2;
  const centerY = this.cameras.main.height / 2;
  const radius = Math.min(centerX, centerY) * 0.6;
  
  // Add education object
  const education = interactables.create(
    centerX + radius * Math.cos(Math.PI * 0.3), 
    centerY + radius * Math.sin(Math.PI * 0.3), 
    'education'
  );
  education.setScale(0.1);
  education.setData('type', 'education');
  education.setData('name', '📚 EDUCAÇÃO');
  
  // Add experience object
  const experience = interactables.create(
    centerX + radius * Math.cos(Math.PI * 0.9), 
    centerY + radius * Math.sin(Math.PI * 0.9), 
    'experience'
  );
  experience.setScale(0.1);
  experience.setData('type', 'experience');
  experience.setData('name', '💼 EXPERIÊNCIA');
  
  // Add skills object
  const skills = interactables.create(
    centerX + radius * Math.cos(Math.PI * 1.5), 
    centerY + radius * Math.sin(Math.PI * 1.5), 
    'skills'
  );
  skills.setScale(0.1);
  skills.setData('type', 'skills');
  skills.setData('name', '🛠️ HABILIDADES');
  
  // Add projects object
  const projects = interactables.create(
    centerX + radius * Math.cos(Math.PI * 1.9), 
    centerY + radius * Math.sin(Math.PI * 1.9), 
    'projects'
  );
  projects.setScale(0.1);
  projects.setData('type', 'projects');
  projects.setData('name', '🚀 PROJETOS');
  
  // Add contact object - updated position to be on top right instead of directly on top
  const contact = interactables.create(
    centerX + radius * Math.cos(Math.PI * 0.1), 
    centerY + radius * Math.sin(Math.PI * 0.1), 
    'contact'
  );
  contact.setScale(0.1);
  contact.setData('type', 'contact');
  contact.setData('name', '📱 CONTATO');
  
  // Create player
  player = this.physics.add.sprite(centerX, centerY, 'player');
  player.setCollideWorldBounds(true);
  
  // Player animations - updated for better directional movement
  this.anims.create({
    key: 'left',
    frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
    frameRate: 10,
    repeat: -1
  });
  
  this.anims.create({
    key: 'turn',
    frames: [ { key: 'player', frame: 4 } ],
    frameRate: 20
  });
  
  this.anims.create({
    key: 'right',
    frames: this.anims.generateFrameNumbers('player', { start: 5, end: 8 }),
    frameRate: 10,
    repeat: -1
  });
  
  // We need a specific state for facing up (back facing camera)
  this.anims.create({
    key: 'face_up',
    frames: [ { key: 'player', frame: 2 } ],
    frameRate: 20
  });
  
  // Animation for walking up (using the left frames but player will be facing up)
  this.anims.create({
    key: 'walk_up',
    frames: this.anims.generateFrameNumbers('player', { start: 1, end: 3 }),
    frameRate: 10,
    repeat: -1
  });
  
  // We need a specific state for facing down (front facing camera)
  this.anims.create({
    key: 'face_down',
    frames: [ { key: 'player', frame: 4 } ],
    frameRate: 20
  });
  
  // Animation for walking down (using the right frames but player will be facing down)
  this.anims.create({
    key: 'walk_down',
    frames: this.anims.generateFrameNumbers('player', { start: 5, end: 7 }),
    frameRate: 10,
    repeat: -1
  });
  
  // Input setup
  cursors = this.input.keyboard.createCursorKeys();
  interactKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
  
  // Interaction text
  interactText = this.add.text(16, 60, '', {
    fontSize: '16px',
    fontFamily: '"Press Start 2P", monospace',
    fill: '#0f0',
    backgroundColor: '#000',
    padding: { x: 8, y: 5 }
  });
  interactText.setScrollFactor(0);
  interactText.setVisible(false);
  
  // Add physics interactions
  this.physics.add.overlap(player, interactables, handleOverlap, null, this);
  
  // Add title text
  this.add.text(centerX, 50, 'JOÃO RESPEITA BARBOSA', {
    fontSize: '24px',
    fontFamily: '"Press Start 2P", monospace',
    fill: '#0f0'
  }).setOrigin(0.5, 0.5);
  
  // Instructions
  this.add.text(centerX, this.cameras.main.height - 50, 'SETAS para mover | ESPAÇO para interagir', {
    fontSize: '12px',
    fontFamily: '"Press Start 2P", monospace',
    fill: '#0f0'
  }).setOrigin(0.5, 0.5);
}

// Update function (runs every frame)
function update() {
  // Player movement
  const speed = 160;
  let moving = false;
  
  // Track the last vertical direction for proper facing when stopped
  if (player.lastVerticalDirection === undefined) {
    player.lastVerticalDirection = 'down'; // Default facing direction when game starts
  }
  
  if (cursors.left.isDown) {
    player.setVelocityX(-speed);
    player.anims.play('left', true);
    moving = true;
  } else if (cursors.right.isDown) {
    player.setVelocityX(speed);
    player.anims.play('right', true);
    moving = true;
  } else {
    player.setVelocityX(0);
  }
  
  if (cursors.up.isDown) {
    player.setVelocityY(-speed);
    player.lastVerticalDirection = 'up';
    if (!cursors.left.isDown && !cursors.right.isDown) {
      player.anims.play('walk_up', true);
    }
    moving = true;
  } else if (cursors.down.isDown) {
    player.setVelocityY(speed);
    player.lastVerticalDirection = 'down';
    if (!cursors.left.isDown && !cursors.right.isDown) {
      player.anims.play('walk_down', true);
    }
    moving = true;
  } else {
    player.setVelocityY(0);
  }
  
  // If not moving at all, show the correct idle/facing animation
  if (!moving) {
    if (player.lastVerticalDirection === 'up') {
      player.anims.play('face_up', true);
    } else {
      player.anims.play('face_down', true);
    }
  }
  
  // Handle interaction with CV items or closing panel with space
  if (Phaser.Input.Keyboard.JustDown(interactKey)) {
    const cvInfo = document.getElementById('cv-info');
    // If panel is open, close it
    if (!cvInfo.classList.contains('hidden')) {
      closeInfo();
    } 
    // Otherwise, if standing near an interactable, open its info
    else if (currentInteractable) {
      showCVInfo(currentInteractable.getData('type'));
    }
  }
}

// Handle player overlapping with interactable objects
function handleOverlap(player, interactable) {
  interactText.setText(`PRESSIONA ESPAÇO PARA VER ${interactable.getData('name')}`);
  interactText.setVisible(true);
  currentInteractable = interactable;
  
  // Add a small timer to remove the text if not overlapping anymore
  this.time.delayedCall(100, function() {
    if (currentInteractable === interactable && 
        !this.physics.overlap(player, interactable)) {
      interactText.setVisible(false);
      currentInteractable = null;
    }
  }, [], this);
}

// Show CV information
function showCVInfo(type) {
  const data = cvData[type];
  if (data) {
    const cvInfo = document.getElementById('cv-info');
    const infoContent = document.getElementById('info-content');
    
    infoContent.innerHTML = `<h2>${data.title}</h2><p>${data.content.replace(/\n/g, '<br>')}</p>`;
    cvInfo.classList.remove('hidden');
    
    // Pause the game
    if (player) {
      player.setVelocity(0, 0);
    }
  }
}

// Close CV information panel
function closeInfo() {
  document.getElementById('cv-info').classList.add('hidden');
}

// Return to home screen
function returnToHome() {
  // Show intro screen and hide home button
  document.getElementById('game-intro').classList.remove('hidden');
  document.getElementById('home-button').classList.add('hidden');
  document.getElementById('cv-info').classList.add('hidden');
  
  // Reset game state
  isGameStarted = false;
  
  // Remove previous game instance
  if (window.game) {
    window.game.destroy(true);
    window.game = null;
  }
  
  // Clear the game container
  document.getElementById('game-container').innerHTML = '';
}
