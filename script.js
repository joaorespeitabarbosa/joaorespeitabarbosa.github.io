// Tab functionality
function openTab(evt, tabName) {
  const tabContents = document.getElementsByClassName("tab-content");
  for (let i = 0; i < tabContents.length; i++) {
      tabContents[i].classList.remove("active");
  }
  
  const tabButtons = document.getElementsByClassName("tab-button");
  for (let i = 0; i < tabButtons.length; i++) {
      tabButtons[i].classList.remove("border-b-2");
  }
  
  document.getElementById(tabName).classList.add("active");
  evt.currentTarget.classList.add("border-b-2");
}

// Contact modal
document.addEventListener('DOMContentLoaded', function() {
  const contactBtn = document.getElementById("contactBtn");
  const contactModal = document.getElementById("contactModal");
  
  if (contactBtn) {
      contactBtn.addEventListener("click", function() {
          contactModal.classList.remove("hidden");
          document.body.style.overflow = "hidden";
      });
  }
  
  // Close modal when clicking outside
  if (contactModal) {
      contactModal.addEventListener("click", function(e) {
          if (e.target === contactModal) {
              closeModal();
          }
      });
  }
  
  // Animate progress bars on tab switch
  document.querySelectorAll('.tab-button').forEach(button => {
      button.addEventListener('click', function() {
          document.querySelectorAll('.progress-fill').forEach(bar => {
              const currentWidth = bar.style.width;
              bar.style.width = '0';
              setTimeout(() => {
                  bar.style.width = currentWidth;
              }, 50);
          });
      });
  });
  
  // Easter egg - change character on click
  const character = document.querySelector('.character');
  if (character) {
      // Substitua esses caminhos pelos caminhos reais para suas fotos
      const images = [
          'images/photo1.jpeg',
          'images/photo2.jpeg',
          'images/photo3.jpeg',
          'images/photo4.jpeg',
          'images/photo5.jpeg'
      ];
      let currentImage = 0;
      
      // Definir a imagem inicial
      character.innerHTML = `
          <div class="w-32 h-32 md:w-48 md:h-48 rounded-full flex items-center justify-center overflow-hidden">
              <img src="${images[0]}" alt="Profile photo" class="w-full h-full object-cover">
          </div>
      `;
      
      character.addEventListener('click', function() {
          currentImage = (currentImage + 1) % images.length;
          character.innerHTML = `
              <div class="w-32 h-32 md:w-48 md:h-48 rounded-full flex items-center justify-center overflow-hidden">
                  <img src="${images[currentImage]}" alt="Profile photo" class="w-full h-full object-cover">
              </div>
          `;
      });
  }
});

// Function to close modal
function closeModal() {
  const contactModal = document.getElementById("contactModal");
  if (contactModal) {
      contactModal.classList.add("hidden");
      document.body.style.overflow = "auto";
  }
}