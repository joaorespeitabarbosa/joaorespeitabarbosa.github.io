/**
 * Introdução estilo PS2
 * Animação inspirada na tela inicial do PlayStation 2
 */

document.addEventListener('DOMContentLoaded', function() {
  // Referências para elementos DOM
  const introScreen = document.getElementById('intro-screen');
  const startButton = document.getElementById('start-button');
  const mainContent = document.getElementById('main-content');
  const ps2Audio = document.getElementById('ps2-audio');
  const introCanvas = document.getElementById('intro-canvas');
  
  // Se os elementos não existirem, não continuamos
  if (!introScreen || !startButton || !mainContent || !ps2Audio || !introCanvas) {
    console.error("Elementos necessários para a intro não foram encontrados!");
    return;
  }
  
  // Configurar o canvas para animação inicial
  const ctx = introCanvas.getContext('2d');
  introCanvas.width = window.innerWidth;
  introCanvas.height = window.innerHeight;
  
  // Configurar para pixel art
  ctx.imageSmoothingEnabled = false;
  
  // Estado da animação
  let animationStarted = false;
  let animationTime = 0;
  let animationDuration = 10000; // 10 segundos (duração reduzida)
  let lastTimestamp = 0;
  
  // Cores do PlayStation
  const ps2Colors = [
    '#3b57a9', // Azul PS
    '#d60018', // Vermelho PS
    '#00ac4e', // Verde PS
    '#ffce00'  // Amarelo PS
  ];
  
  // Função para iniciar a animação
  function startIntroAnimation() {
    // Esconder o botão de start
    startButton.style.display = 'none';
    
    // Mostrar o canvas da animação
    introCanvas.style.opacity = 1;
    
    // Mostrar dica de pular após 0.5 segundos
    const skipHint = document.getElementById('skip-hint');
    if (skipHint) {
      setTimeout(() => {
        skipHint.classList.remove('hidden');
      }, 500);
    }
    
    // Ativar efeitos CRT se a função existir
    if (typeof activateCRTEffects === 'function') {
      activateCRTEffects();
    }
    
    // Iniciar o áudio do PS2
    ps2Audio.play().catch(e => {
      console.error("Erro ao reproduzir o áudio:", e);
    });
    
    // Iniciar a animação
    animationStarted = true;
    lastTimestamp = performance.now();
    requestAnimationFrame(updateAnimation);
  }
  
  // Função de atualização da animação
  function updateAnimation(timestamp) {
    // Calcular o tempo decorrido
    const deltaTime = timestamp - lastTimestamp;
    lastTimestamp = timestamp;
    animationTime += deltaTime;
    
    // Limpar o canvas
    ctx.clearRect(0, 0, introCanvas.width, introCanvas.height);
    
    // Calcular o progresso da animação (0 a 1)
    const progress = Math.min(animationTime / animationDuration, 1);
    
    // Desenhar a animação baseada no progresso
    drawPS2Animation(progress);
    
    // Verificar se a animação terminou
    if (progress >= 1) {
      finishAnimation();
    } else {
      // Continuar a animação
      requestAnimationFrame(updateAnimation);
    }
  }
  
  // Função para desenhar a animação do PS2
  function drawPS2Animation(progress) {
    // Parte 1: Fase ampliada dos quadrados em órbita (0-50%) - mais tempo para esta fase
    if (progress < 0.5) {
      const fadeInProgress = progress / 0.5;
      drawColorSquares(fadeInProgress);
      
      // Adiciona fade para a próxima fase perto do final desta fase
      if (progress > 0.45) {
        const transitionProgress = (progress - 0.45) / 0.05;
        const pulseProgress = 0; // Início da animação de pulso
        ctx.globalAlpha = transitionProgress;
        drawPulsingLogo(pulseProgress);
        ctx.globalAlpha = 1;
      }
    } 
    // Parte 2: Logo pulsando com texto (50-85%) - pula a fase de formação estática
    else if (progress < 0.85) {
      const pulseProgress = (progress - 0.5) / 0.35;
      drawPulsingLogo(pulseProgress);
    } 
    // Parte 3: Fade out para o conteúdo principal (85-100%)
    else {
      const fadeOutProgress = (progress - 0.85) / 0.15;
      drawFadingOutLogo(fadeOutProgress);
    }
  }
  
  // Desenhar quadrados de cores do PlayStation
  function drawColorSquares(progress) {
    const size = Math.min(introCanvas.width, introCanvas.height) * 1 * progress;
    const centerX = introCanvas.width / 2;
    const centerY = introCanvas.height / 2;
    const baseSpacing = size * 1.5;
    
    // Adicionar rotação 
    const rotationAngle = progress * Math.PI * 2.5; // Duas rotações e meia durante a animação estendida
    
    // Desenhar 4 quadrados com as cores do PlayStation em órbita
    ctx.globalAlpha = progress;
    
    // Calcular as posições orbitais para cada quadrado
    const positions = [
      // Superior esquerdo (Azul) - cálculo da órbita
      {
        x: centerX + Math.cos(rotationAngle + Math.PI * 0.75) * baseSpacing,
        y: centerY + Math.sin(rotationAngle + Math.PI * 0.75) * baseSpacing,
        color: ps2Colors[0]
      },
      // Superior direito (Vermelho) - cálculo da órbita
      {
        x: centerX + Math.cos(rotationAngle + Math.PI * 0.25) * baseSpacing,
        y: centerY + Math.sin(rotationAngle + Math.PI * 0.25) * baseSpacing,
        color: ps2Colors[1]
      },
      // Inferior esquerdo (Verde) - cálculo da órbita
      {
        x: centerX + Math.cos(rotationAngle + Math.PI * 1.25) * baseSpacing,
        y: centerY + Math.sin(rotationAngle + Math.PI * 1.25) * baseSpacing,
        color: ps2Colors[2]
      },
      // Inferior direito (Amarelo) - cálculo da órbita
      {
        x: centerX + Math.cos(rotationAngle + Math.PI * 1.75) * baseSpacing,
        y: centerY + Math.sin(rotationAngle + Math.PI * 1.75) * baseSpacing,
        color: ps2Colors[3]
      }
    ];
    
    // Desenhar os quadrados nas posições calculadas (sem rotação própria)
    positions.forEach(pos => {
      ctx.fillStyle = pos.color;
      ctx.fillRect(pos.x - size/2, pos.y - size/2, size, size);
    });
    
    ctx.globalAlpha = 1.0;
  }
  
  // Desenhar a formação do logo
  function drawFormingLogo(progress) {
    const centerX = introCanvas.width / 2;
    const centerY = introCanvas.height / 2;
    const maxSize = Math.min(introCanvas.width, introCanvas.height) * 0.4;
    const currentSize = maxSize * progress;
    
    // Fundo preto
    ctx.fillStyle = "#000000";
    ctx.globalAlpha = progress;
    ctx.fillRect(centerX - maxSize/2, centerY - maxSize/2, maxSize, maxSize);
    
    // Texto "LOADING..." estilo retro
    const fontSize = Math.floor(maxSize * 0.35);
    ctx.font = `bold ${fontSize}px 'Press Start 2P', monospace`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    
    // Desenhar texto com efeito de glitch
    const glitchOffset = Math.sin(progress * Math.PI * 10) * 5 * (1 - progress);
    
    // Função auxiliar para gerar pontos animados
    function getDotsAnimation(progress) {
      const dotsCount = Math.floor((progress * 10) % 4); // 0 a 3 pontos
      return ".".repeat(dotsCount).padEnd(3, " "); // Sempre ocupa espaço de 3 caracteres
    }
    
    const baseText = "LOADING";
    const dots = getDotsAnimation(progress);
    
    // Calcula distância vertical para os pontos
    const dotsVerticalOffset = Math.floor(fontSize * 0.6); // Espaço vertical abaixo do texto principal
    
    // Camadas de texto para efeito de CRT - Texto base
    ctx.fillStyle = "rgba(255, 0, 0, 0.8)"; // Vermelho
    ctx.fillText(baseText, centerX + glitchOffset, centerY);
    
    // Pontos animados separados - abaixo e centralizados
    ctx.fillText(dots, centerX + glitchOffset, centerY + dotsVerticalOffset);
    
    ctx.fillStyle = "rgba(0, 255, 0, 0.8)"; // Verde
    ctx.fillText(baseText, centerX - glitchOffset * 0.5, centerY);
    ctx.fillText(dots, centerX - glitchOffset * 0.5, centerY + dotsVerticalOffset);
    
    ctx.fillStyle = "rgba(0, 0, 255, 0.8)"; // Azul
    ctx.fillText(baseText, centerX, centerY - glitchOffset * 0.3);
    ctx.fillText(dots, centerX, centerY + dotsVerticalOffset - glitchOffset * 0.3);
    
    // Texto principal branco
    ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
    ctx.fillText(baseText, centerX, centerY);
    ctx.fillText(dots, centerX, centerY + dotsVerticalOffset);
    
    ctx.globalAlpha = 1.0;
  }
  
  // Desenhar o logo pulsando
  function drawPulsingLogo(progress) {
    const centerX = introCanvas.width / 2;
    const centerY = introCanvas.height / 2;
    const maxSize = Math.min(introCanvas.width, introCanvas.height) * 0.4;
    
    // Efeito de pulso
    const pulse = 1 + Math.sin(progress * Math.PI * 8) * 0.05;
    const currentSize = maxSize * pulse;
    
    // Fundo preto
    ctx.fillStyle = "#000000";
    ctx.fillRect(centerX - currentSize/2, centerY - currentSize/2, currentSize, currentSize);
    
    // Texto "LOADING..." estilo retro
    const fontSize = Math.floor(maxSize * 0.35 * pulse);
    ctx.font = `bold ${fontSize}px 'Press Start 2P', monospace`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    
    // Efeito de brilho
    const alpha = 0.7 + Math.sin(progress * Math.PI * 16) * 0.3;
    
    // Função auxiliar para gerar pontos animados
    function getDotsAnimation(progress) {
      const dotsCount = Math.floor((progress * 12) % 4); // 0 a 3 pontos, mais rápido durante a pulsação
      return ".".repeat(dotsCount).padEnd(3, " "); // Sempre ocupa espaço de 3 caracteres
    }
    
    const baseText = "LOADING";
    const dots = getDotsAnimation(progress);
    
    // Calcula distância vertical para os pontos
    const dotsVerticalOffset = Math.floor(fontSize * 0.6); // Espaço vertical abaixo do texto principal
    
    // Camadas de texto para efeito de CRT
    ctx.fillStyle = `rgba(255, 0, 0, ${alpha})`; // Vermelho
    ctx.fillText(baseText, centerX + Math.sin(progress * 100) * 2, centerY);
    ctx.fillText(dots, centerX + Math.sin(progress * 100) * 2, centerY + dotsVerticalOffset);
    
    ctx.fillStyle = `rgba(0, 255, 0, ${alpha})`; // Verde
    ctx.fillText(baseText, centerX + Math.cos(progress * 90) * 2, centerY);
    ctx.fillText(dots, centerX + Math.cos(progress * 90) * 2, centerY + dotsVerticalOffset);
    
    ctx.fillStyle = `rgba(0, 0, 255, ${alpha})`; // Azul
    ctx.fillText(baseText, centerX, centerY + Math.sin(progress * 80) * 2);
    ctx.fillText(dots, centerX, centerY + dotsVerticalOffset + Math.sin(progress * 80) * 2);
    
    // Texto principal branco
    ctx.fillStyle = `rgba(255, 255, 255, ${alpha + 0.1})`;
    ctx.fillText(baseText, centerX, centerY);
    ctx.fillText(dots, centerX, centerY + dotsVerticalOffset);
    
    // Removido texto "Game Developer CV"
  }
  
  // Desenhar o logo desaparecendo
  function drawFadingOutLogo(progress) {
    // Inverter o progresso para fazer um fadeout
    const fadeOpacity = 1 - progress;
    
    const centerX = introCanvas.width / 2;
    const centerY = introCanvas.height / 2;
    const maxSize = Math.min(introCanvas.width, introCanvas.height) * 0.4;
    
    // Fundo preto expandindo para cobrir a tela
    const expandSize = maxSize + (Math.max(introCanvas.width, introCanvas.height) - maxSize) * progress;
    ctx.fillStyle = "#000000";
    // O fundo preto sempre mantém opacidade completa para garantir cobertura total
    ctx.globalAlpha = 1.0;
    ctx.fillRect(centerX - expandSize/2, centerY - expandSize/2, expandSize, expandSize);
    
    // Se o progresso for maior que 0.85 (85% da fase de fade), não desenhar mais os textos
    // Isso garante que os textos desaparecerão completamente antes do final da animação
    if (progress < 0.85) {
      // Aplicar um fade out mais rápido para garantir que os textos sumam mais cedo
      // Usar uma curva exponencial para acelerar o fade out
      const adjustedFadeOpacity = Math.pow(fadeOpacity, 1.5);
      ctx.globalAlpha = adjustedFadeOpacity;
      
      // Texto "LOADING..." desaparecendo
      const fontSize = Math.floor(maxSize * 0.35);
      ctx.font = `bold ${fontSize}px 'Press Start 2P', monospace`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      
      // Na fase final, mostrar texto fixo
      const baseText = "LOADING";
      const dots = "..."; // No fade out, mostramos todos os pontos
      
      // Calcula distância vertical para os pontos
      const dotsVerticalOffset = Math.floor(fontSize * 0.6); // Espaço vertical abaixo do texto principal
      
      // Texto principal branco
      ctx.fillStyle = "#FFFFFF";
      ctx.fillText(baseText, centerX, centerY);
      ctx.fillText(dots, centerX, centerY + dotsVerticalOffset);
      
      // Texto "Game Developer CV" removido
    }
    
    // Restaurar a opacidade global ao final do desenho dos textos
    ctx.globalAlpha = 1.0;
    
    // Efeito de "scan lines" televisão antiga aumentando à medida que desaparece
    drawScanLines(progress);
  }
  
  // Desenhar linhas de escaneamento (efeito de TV antiga)
  function drawScanLines(intensity) {
    const lineHeight = 2;
    const lineSpacing = 4;
    ctx.fillStyle = `rgba(0, 0, 0, ${0.5 * intensity})`;
    
    for (let y = 0; y < introCanvas.height; y += lineSpacing) {
      ctx.fillRect(0, y, introCanvas.width, lineHeight);
    }
  }
  
  // Função para finalizar a animação
  function finishAnimation() {
    // Esconder dica de pular
    const skipHint = document.getElementById('skip-hint');
    if (skipHint) {
      skipHint.classList.add('hidden');
    }
    
    // Fade out da tela de introdução
    introScreen.style.opacity = 0;
    
    // Desativar efeitos CRT se a função existir
    if (typeof deactivateCRTEffects === 'function') {
      deactivateCRTEffects();
    }
    
    // Aguardar término da transição antes de mostrar o conteúdo
    setTimeout(() => {
      introScreen.style.display = 'none';
      mainContent.style.display = 'block';
      
      // Fade in do conteúdo principal
      setTimeout(() => {
        mainContent.style.opacity = 1;
        
        // Wait with a longer delay to ensure everything is stable before starting animation
        setTimeout(() => {
          // Não há mais animação de fundo para inicializar
          console.log("Transição para conteúdo principal concluída");
        }, 500); // Longer delay to ensure DOM is truly ready
      }, 100);
    }, 1000); // 1 segundo para a transição de fade out
  }
  
  // Adicionar event listener para o botão de start
  startButton.addEventListener('click', startIntroAnimation);
  
  // Variáveis para controlar o pressionamento de tecla no botão START
  let keyPressTimer = null;
  let keyPressProgress = 0;
  const keyPressDuration = 500; // 0.5 segundos, mesmo tempo da animação hover
  let keyJustUsedForStart = false; // Flag para evitar que a mesma tecla pule a intro
  
  // Event listener para teclas no botão START (espaço ou enter)
  document.addEventListener('keydown', function(event) {
    // Se a animação já começou, permite pular com QUALQUER tecla APENAS se a tecla não foi a que iniciou
    if (animationStarted && !keyJustUsedForStart) {
      skipAnimation();
      return;
    }
    
    // Se o botão START está visível e espaço ou enter foi pressionado
    if ((event.key === ' ' || event.key === 'Enter') && startButton.style.display !== 'none') {
      event.preventDefault(); // Previne scroll da página com espaço
      
      // Se já está pressionando, não faz nada
      if (keyPressTimer) return;
      
      // Adiciona classe para ativar animação visual
      startButton.classList.add('key-pressing');
      
      // Inicia o timer de progresso
      const startTime = performance.now();
      
      keyPressTimer = setInterval(() => {
        const elapsed = performance.now() - startTime;
        keyPressProgress = Math.min(elapsed / keyPressDuration, 1);
        
        // Quando completar o progresso, inicia a animação
        if (keyPressProgress >= 1) {
          clearInterval(keyPressTimer);
          keyPressTimer = null;
          startButton.classList.remove('key-pressing');
          keyJustUsedForStart = true; // Marca que esta tecla iniciou a intro
          startIntroAnimation();
        }
      }, 16); // ~60fps
    }
  });
  
  // Event listener para soltar a tecla
  document.addEventListener('keyup', function(event) {
    if (event.key === ' ' || event.key === 'Enter') {
      // Se estava pressionando para iniciar, cancela
      if (keyPressTimer) {
        clearInterval(keyPressTimer);
        keyPressTimer = null;
        keyPressProgress = 0;
        startButton.classList.remove('key-pressing');
      }
      
      // Reseta a flag quando soltar a tecla
      if (keyJustUsedForStart) {
        keyJustUsedForStart = false;
      }
    }
  });
  
  // Função para pular a animação
  function skipAnimation() {
    // Só permite pular se a animação já começou
    if (animationStarted) {
      // Fade out do áudio do PS2
      if (ps2Audio && !ps2Audio.paused) {
        const fadeOutDuration = 500; // 0.5 segundos
        const startVolume = ps2Audio.volume;
        const fadeOutStart = performance.now();
        
        function fadeOutAudio() {
          const elapsed = performance.now() - fadeOutStart;
          const progress = Math.min(elapsed / fadeOutDuration, 1);
          
          ps2Audio.volume = startVolume * (1 - progress);
          
          if (progress < 1) {
            requestAnimationFrame(fadeOutAudio);
          } else {
            ps2Audio.pause();
            ps2Audio.currentTime = 0; // Reset para o início
            ps2Audio.volume = startVolume; // Restaura volume original
          }
        }
        
        fadeOutAudio();
      }
      
      // Força o progresso para 100%
      animationTime = animationDuration;
      // Chama imediatamente a função de finalização
      finishAnimation();
    }
  }
  
  // Event listener para clique na tela - pula animação ao clicar
  introScreen.addEventListener('click', function(event) {
    // Só pula se a animação já começou e não é o botão START que foi clicado
    if (animationStarted && event.target !== startButton) {
      skipAnimation();
    }
  });
  
  // Ajustar o canvas em caso de redimensionamento da janela
  window.addEventListener('resize', function() {
    introCanvas.width = window.innerWidth;
    introCanvas.height = window.innerHeight;
    ctx.imageSmoothingEnabled = false;
  });
});
