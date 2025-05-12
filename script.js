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

// Theme toggling functionality
function toggleTheme() {
    const body = document.body;
    const themeToggle = document.getElementById('themeToggle');
    const icon = themeToggle.querySelector('i');
    
    // Toggle between light and dark themes
    if (body.classList.contains('light-theme')) {
        // Switch to dark theme
        body.classList.remove('light-theme');
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
        icon.className = icon.className.replace('text-yellow-600', 'text-yellow-300');
        localStorage.setItem('theme', 'dark');
    } else {
        // Switch to light theme
        body.classList.add('light-theme');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
        icon.className = icon.className.replace('text-yellow-300', 'text-yellow-600');
        localStorage.setItem('theme', 'light');
    }
}

// Copy to clipboard function
function copyToClipboard(text, tooltipElement) {
    // Create a temporary input element
    const tempInput = document.createElement("input");
    tempInput.value = text;
    document.body.appendChild(tempInput);
    
    // Select and copy the text
    tempInput.select();
    document.execCommand("copy");
    
    // Remove the temporary input
    document.body.removeChild(tempInput);
    
    // Show feedback in the tooltip
    const originalText = tooltipElement.innerText;
    tooltipElement.innerText = "Copied!";
    
    // Reset tooltip text after a delay
    setTimeout(() => {
        tooltipElement.innerText = originalText;
    }, 1500);
}

// Contact modal
document.addEventListener('DOMContentLoaded', function() {
    // Theme initialization
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        // Load saved theme preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            document.body.classList.add('light-theme');
            themeToggle.querySelector('i').classList.remove('fa-moon');
            themeToggle.querySelector('i').classList.add('fa-sun');
            themeToggle.querySelector('i').className = themeToggle.querySelector('i').className.replace('text-yellow-300', 'text-yellow-600');
        }
        
        // Add click event listener to theme toggle button
        themeToggle.addEventListener('click', toggleTheme);
    }
    
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
    
    // Character photos rotation on click
    const character = document.querySelector('.character');
    if (character) {
        const images = [
            'images/photo1.jpeg',
            'images/photo2.jpeg',
            'images/photo3.jpeg',
            'images/photo4.jpeg',
            'images/photo5.jpeg'
        ];
        let currentImage = 0;
        
        // Set initial image instead of the FontAwesome icon
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