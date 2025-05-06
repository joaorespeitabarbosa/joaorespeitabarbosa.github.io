function startSection(section) {
    let content = "";
  
    switch(section) {
      case "educacao":
        content = "🎓 Mestrado em Engenharia Informática de Computadores\nEspecialização em Jogos e Interação Pessoa-Máquina\nAlgumas cadeiras de IA";
        break;
      case "experiencia":
        content = "💼 Projeto de tese com integração de LLMs para diálogos em jogos\nParticipação em projetos com Rhino/Grasshopper/Ladybug";
        break;
      case "skills":
        content = "🧠 Python, C#, JavaScript, HTML/CSS\n🎮 Unity, Ren'Py, Rhino, Git\n🤖 IA, Design de Interação, Desenvolvimento de Jogos";
        break;
    }
  
    document.getElementById("output").innerText = content;
  }
  