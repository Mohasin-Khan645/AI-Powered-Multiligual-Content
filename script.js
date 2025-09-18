// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Dropdown navigation functionality
document.querySelectorAll('.dropdown').forEach(dropdown => {
    const dropdownToggle = dropdown.querySelector('a');
    const dropdownMenu = dropdown.querySelector('.dropdown-menu');
    
    // Desktop hover behavior
    dropdown.addEventListener('mouseenter', () => {
        if (window.innerWidth > 768) {
            dropdownMenu.style.opacity = '1';
            dropdownMenu.style.visibility = 'visible';
            dropdownMenu.style.transform = 'translateY(0)';
        }
    });
    
    dropdown.addEventListener('mouseleave', () => {
        if (window.innerWidth > 768) {
            dropdownMenu.style.opacity = '0';
            dropdownMenu.style.visibility = 'hidden';
            dropdownMenu.style.transform = 'translateY(-10px)';
        }
    });
    
    // Mobile click behavior
    dropdownToggle.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
        }
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header scroll effect and active navigation
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }
    
    // Update active navigation item
    updateActiveNavItem();
    
    // Update scroll progress
    updateScrollProgress();
});

function updateScrollProgress() {
    const scrollProgress = document.getElementById('scroll-progress');
    if (scrollProgress) {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        scrollProgress.style.width = scrollPercent + '%';
    }
}

function updateActiveNavItem() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fadeInUp');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.feature-card, .language-card, .step, .integration-card').forEach(el => {
    observer.observe(el);
});

// Language card hover effects
document.querySelectorAll('.language-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Feature card interactions
document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px)';
        this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    });
});

// Translation demo animation
function animateTranslationDemo() {
    const demoCards = document.querySelectorAll('.demo-card');
    const arrow = document.querySelector('.demo-arrow');
    
    if (demoCards.length > 0 && arrow) {
        // Animate cards appearing
        demoCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '0';
                card.style.transform = 'translateX(-20px)';
                card.style.transition = 'all 0.6s ease';
                
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateX(0)';
                }, 100);
            }, index * 200);
        });
        
        // Animate arrow
        setTimeout(() => {
            arrow.style.opacity = '0';
            arrow.style.transform = 'scale(0.8)';
            arrow.style.transition = 'all 0.4s ease';
            
            setTimeout(() => {
                arrow.style.opacity = '1';
                arrow.style.transform = 'scale(1)';
            }, 100);
        }, 400);
    }
}

// Initialize translation demo animation when hero section is visible
const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateTranslationDemo();
            heroObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroSection = document.querySelector('.hero');
if (heroSection) {
    heroObserver.observe(heroSection);
}

// Accessibility controls demo
document.querySelectorAll('.control-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const icon = this.querySelector('i');
        const screenContent = document.querySelector('.screen-content');
        
        // Add click animation
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
        
        // Simulate functionality
        if (icon.classList.contains('fa-volume-up')) {
            screenContent.innerHTML = '<p>🔊 Audio narration enabled for screen content...</p>';
        } else if (icon.classList.contains('fa-adjust')) {
            screenContent.innerHTML = '<p>🎨 High contrast mode activated...</p>';
        } else if (icon.classList.contains('fa-text-height')) {
            screenContent.innerHTML = '<p>📏 Large text size applied...</p>';
        }
    });
});

// Button click animations
document.querySelectorAll('.btn-primary, .btn-secondary').forEach(btn => {
    btn.addEventListener('click', function(e) {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple effect styles
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Statistics counter animation
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace(/[^\d]/g, ''));
        const suffix = counter.textContent.replace(/[\d]/g, '');
        let current = 0;
        const increment = target / 50;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current) + suffix;
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + suffix;
            }
        };
        
        updateCounter();
    });
}

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    statsObserver.observe(heroStats);
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroVisual = document.querySelector('.hero-visual');
    
    if (heroVisual) {
        heroVisual.style.transform = `translateY(${scrolled * 0.1}px)`;
    }
});

// Form validation and submission (for future contact forms)
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.classList.add('error');
            isValid = false;
        } else {
            input.classList.remove('error');
        }
    });
    
    return isValid;
}

// Add error styles
const errorStyle = document.createElement('style');
errorStyle.textContent = `
    .error {
        border-color: #ef4444 !important;
        box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1) !important;
    }
`;
document.head.appendChild(errorStyle);

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close mobile menu on escape
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// Preload critical images
function preloadImages() {
    const imageUrls = [
        // Add any critical image URLs here
    ];
    
    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    preloadImages();
    
    // Add loading states to buttons
    document.querySelectorAll('.btn-primary, .btn-secondary').forEach(btn => {
        btn.addEventListener('click', function() {
            if (this.textContent.includes('Start') || this.textContent.includes('Get')) {
                this.classList.add('loading');
                setTimeout(() => {
                    this.classList.remove('loading');
                }, 2000);
            }
        });
    });
    
    // Initialize tooltips (if needed)
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = this.dataset.tooltip;
            document.body.appendChild(tooltip);
            
            const rect = this.getBoundingClientRect();
            tooltip.style.left = rect.left + rect.width / 2 + 'px';
            tooltip.style.top = rect.top - 40 + 'px';
        });
        
        element.addEventListener('mouseleave', function() {
            const tooltip = document.querySelector('.tooltip');
            if (tooltip) {
                tooltip.remove();
            }
        });
    });
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(() => {
    // Scroll-based animations and effects
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Service Worker registration for PWA capabilities (future enhancement)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered'))
        //     .catch(error => console.log('SW registration failed'));
    });
}

// Real-Time Translation Demo
function initializeTranslationDemo() {
    const translateBtn = document.getElementById('translate-btn');
    const sourceText = document.getElementById('source-text');
    const hindiOutput = document.getElementById('hindi-output');
    const bengaliOutput = document.getElementById('bengali-output');
    const teluguOutput = document.getElementById('telugu-output');
    const confidenceValue = document.getElementById('confidence-value');
    
    if (translateBtn && sourceText) {
        translateBtn.addEventListener('click', function() {
            const text = sourceText.value.trim();
            if (text) {
                // Simulate translation process
                translateBtn.classList.add('loading');
                translateBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Translating...';
                
                setTimeout(() => {
                    // Mock translations
                    hindiOutput.textContent = `ऑटोमोटिव मरम्मत के लिए उन्नत वेल्डिंग तकनीकों का उपयोग करते समय सुरक्षा प्रोटोकॉल का पालन करना चाहिए। हमेशा सुरक्षात्मक उपकरण पहनें और उचित ग्राउंडिंग सुनिश्चित करें।`;
                    bengaliOutput.textContent = `অটোমোটিভ মেরামতের জন্য উন্নত ওয়েল্ডিং কৌশল ব্যবহার করার সময় নিরাপত্তা প্রোটোকল অনুসরণ করা উচিত। সর্বদা সুরক্ষামূলক সরঞ্জাম পরিধান করুন এবং সঠিক গ্রাউন্ডিং নিশ্চিত করুন।`;
                    teluguOutput.textContent = `అటోమోటివ్ మరమ్మత్తు కోసం అధునాతన వెల్డింగ్ పద్ధతులను ఉపయోగించేటప్పుడు భద్రతా ప్రోటోకాల్లను అనుసరించాలి। ఎల్లప్పుడూ రక్షణ పరికరాలను ధరించండి మరియు సరైన గ్రౌండింగ్ నిర్ధారించండి।`;
                    
                    confidenceValue.textContent = '98%';
                    translateBtn.classList.remove('loading');
                    translateBtn.innerHTML = '<i class="fas fa-language"></i> Translate Now';
                }, 2000);
            }
        });
    }
}

// Voice Recognition Demo
function initializeVoiceDemo() {
    const voiceBtn = document.getElementById('start-recording');
    const voiceStatus = document.getElementById('voice-status');
    const transcriptionText = document.getElementById('transcription-text');
    const audioQuality = document.getElementById('audio-quality');
    
    if (voiceBtn && voiceStatus) {
        let isRecording = false;
        
        voiceBtn.addEventListener('click', function() {
            if (!isRecording) {
                // Start recording simulation
                isRecording = true;
                voiceBtn.classList.add('recording');
                voiceBtn.innerHTML = '<i class="fas fa-stop"></i>';
                voiceStatus.textContent = 'Recording... Speak now';
                audioQuality.textContent = 'Excellent';
                
                // Simulate transcription
                setTimeout(() => {
                    transcriptionText.textContent = 'Advanced welding techniques for automotive repair require proper safety protocols and protective equipment.';
                }, 3000);
                
                setTimeout(() => {
                    // Stop recording
                    isRecording = false;
                    voiceBtn.classList.remove('recording');
                    voiceBtn.innerHTML = '<i class="fas fa-microphone"></i> Start Recording';
                    voiceStatus.textContent = 'Click to start voice input';
                }, 8000);
            }
        });
    }
}

// File Upload Demo
function initializeFileUpload() {
    const uploadArea = document.getElementById('upload-area');
    const fileInput = document.getElementById('file-input');
    const uploadProgress = document.getElementById('upload-progress');
    const progressFill = document.getElementById('progress-fill');
    const progressPercentage = document.getElementById('progress-percentage');
    const fileList = document.getElementById('file-list');
    
    if (uploadArea && fileInput) {
        // Drag and drop functionality
        uploadArea.addEventListener('dragover', function(e) {
            e.preventDefault();
            uploadArea.classList.add('dragover');
        });
        
        uploadArea.addEventListener('dragleave', function(e) {
            e.preventDefault();
            uploadArea.classList.remove('dragover');
        });
        
        uploadArea.addEventListener('drop', function(e) {
            e.preventDefault();
            uploadArea.classList.remove('dragover');
            handleFiles(e.dataTransfer.files);
        });
        
        uploadArea.addEventListener('click', function() {
            fileInput.click();
        });
        
        fileInput.addEventListener('change', function() {
            handleFiles(this.files);
        });
        
        function handleFiles(files) {
            if (files.length > 0) {
                uploadProgress.style.display = 'block';
                simulateUpload(files);
            }
        }
        
        function simulateUpload(files) {
            let progress = 0;
            const interval = setInterval(() => {
                progress += Math.random() * 15;
                if (progress >= 100) {
                    progress = 100;
                    clearInterval(interval);
                    progressPercentage.textContent = '100%';
                    progressFill.style.width = '100%';
                    
                    // Show file list
                    fileList.innerHTML = '';
                    Array.from(files).forEach(file => {
                        const fileItem = document.createElement('div');
                        fileItem.className = 'file-item';
                        fileItem.innerHTML = `
                            <div class="file-info">
                                <div class="file-icon">
                                    <i class="fas fa-file"></i>
                                </div>
                                <div class="file-details">
                                    <div class="file-name">${file.name}</div>
                                    <div class="file-size">${(file.size / 1024 / 1024).toFixed(2)} MB</div>
                                </div>
                            </div>
                            <div class="file-status completed">Completed</div>
                        `;
                        fileList.appendChild(fileItem);
                    });
                } else {
                    progressPercentage.textContent = Math.round(progress) + '%';
                    progressFill.style.width = progress + '%';
                }
            }, 200);
        }
    }
}

// API Testing Playground
function initializeAPIPlayground() {
    const apiTabs = document.querySelectorAll('.api-tab');
    const apiTabContents = document.querySelectorAll('.api-tab-content');
    
    // Tab switching
    apiTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetTab = this.dataset.tab;
            
            // Remove active class from all tabs and contents
            apiTabs.forEach(t => t.classList.remove('active'));
            apiTabContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            this.classList.add('active');
            document.getElementById(targetTab + '-tab').classList.add('active');
        });
    });
    
    // API testing buttons
    const testButtons = document.querySelectorAll('[id$="-api"]');
    testButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const responseId = this.id.replace('test-', '').replace('-api', '-response');
            const responseElement = document.getElementById(responseId);
            
            if (responseElement) {
                this.classList.add('loading');
                this.textContent = 'Testing...';
                
                setTimeout(() => {
                    // Mock API responses
                    if (responseId === 'translate-response') {
                        responseElement.innerHTML = `{
  "translations": {
    "hi": "ऑटोमोटिव मरम्मत के लिए उन्नत वेल्डिंग तकनीक",
    "bn": "অটোমোটিভ মেরামতের জন্য উন্নত ওয়েল্ডিং কৌশল",
    "te": "అటోమోటివ్ మరమ్మత్తు కోసం అధునాతన వెల్డింగ్ పద్ధతులు"
  },
  "confidence": 0.98,
  "processingTime": "1.2s",
  "culturalAdaptations": {
    "hi": "North Indian automotive terminology",
    "bn": "Bengali technical vocabulary",
    "te": "South Indian regional context"
  }
}`;
                    } else if (responseId === 'cultural-response') {
                        responseElement.innerHTML = `{
  "adaptedContent": "विद्युत कार्य के लिए सुरक्षा प्रक्रियाएं",
  "culturalChanges": [
    {
      "type": "terminology",
      "original": "electrical work",
      "adapted": "विद्युत कार्य",
      "reason": "Local technical terminology"
    },
    {
      "type": "context",
      "change": "Added regional safety standards",
      "reason": "Compliance with local regulations"
    }
  ],
  "regionalContext": "north_india",
  "confidence": 0.95
}`;
                    } else if (responseId === 'quality-response') {
                        responseElement.innerHTML = `{
  "qualityScore": 0.97,
  "metrics": {
    "accuracy": 0.98,
    "fluency": 0.96,
    "culturalFit": 0.97,
    "terminology": 0.98
  },
  "suggestions": [
    "Consider using more formal tone",
    "Add regional safety examples"
  ],
  "overallRating": "Excellent"
}`;
                    }
                    
                    this.classList.remove('loading');
                    this.textContent = 'Test API';
                }, 1500);
            }
        });
    });
}

// Chatbot Assistant
function initializeChatbot() {
    const chatInput = document.getElementById('chat-input');
    const sendBtn = document.getElementById('send-message');
    const chatbotMessages = document.getElementById('chatbot-messages');
    const quickQuestions = document.querySelectorAll('.quick-question');
    
    function addMessage(content, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
        
        const now = new Date();
        const timeString = now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        
        messageDiv.innerHTML = `
            <div class="message-content">${content}</div>
            <div class="message-time">${timeString}</div>
        `;
        
        chatbotMessages.appendChild(messageDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }
    
    function getBotResponse(userMessage) {
        const responses = {
            'upload': 'To upload content, simply drag and drop your files into the upload area or click "Browse Files". We support PDF, DOCX, MP4, MP3, PPTX, and TXT formats.',
            'languages': 'We support all 22 official Indian languages including Hindi, Bengali, Telugu, Marathi, Tamil, Gujarati, Kannada, Malayalam, Punjabi, Odia, and many more.',
            'accuracy': 'Our AI-powered translation engine achieves 95-98% accuracy with continuous learning and improvement. Quality metrics are provided for each translation.',
            'default': 'I can help you with uploading content, understanding supported languages, checking translation accuracy, or any other questions about our localization platform. What would you like to know?'
        };
        
        const lowerMessage = userMessage.toLowerCase();
        if (lowerMessage.includes('upload') || lowerMessage.includes('file')) {
            return responses.upload;
        } else if (lowerMessage.includes('language') || lowerMessage.includes('support')) {
            return responses.languages;
        } else if (lowerMessage.includes('accuracy') || lowerMessage.includes('quality')) {
            return responses.accuracy;
        } else {
            return responses.default;
        }
    }
    
    function sendMessage() {
        const message = chatInput.value.trim();
        if (message) {
            addMessage(message, true);
            chatInput.value = '';
            
            // Simulate typing delay
            setTimeout(() => {
                const response = getBotResponse(message);
                addMessage(response);
            }, 1000);
        }
    }
    
    if (sendBtn && chatInput) {
        sendBtn.addEventListener('click', sendMessage);
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
    
    quickQuestions.forEach(btn => {
        btn.addEventListener('click', function() {
            const question = this.dataset.question;
            addMessage(question, true);
            
            setTimeout(() => {
                const response = getBotResponse(question);
                addMessage(response);
            }, 1000);
        });
    });
}

// Cultural Adaptation Preview
function initializeCulturalPreview() {
    const regionSelector = document.getElementById('region-selector');
    
    if (regionSelector) {
        regionSelector.addEventListener('change', function() {
            const region = this.value;
            const adaptationChanges = document.querySelectorAll('.adaptation-change');
            
            // Update adaptation examples based on selected region
            const adaptations = {
                'north': '"automotive technician" → "गाड़ी का मैकेनिक" (North) / "कार मैकेनिक" (Hindi)',
                'south': '"automotive technician" → "కారు మెకానిక్" (Telugu) / "கார் மெக்கானிக்" (Tamil)',
                'east': '"automotive technician" → "গাড়ির মেকানিক" (Bengali) / "ଗାଡ଼ିର ମେକାନିକ୍" (Odia)',
                'west': '"automotive technician" → "गाड़ीचा मेकॅनिक" (Marathi) / "ગાડીનો મેકેનિક" (Gujarati)',
                'northeast': '"automotive technician" → "গাড়িৰ মেকানিক" (Assamese) / "গাড়ির মেকানিক" (Bengali)'
            };
            
            if (adaptationChanges[0]) {
                adaptationChanges[0].textContent = adaptations[region] || adaptations['north'];
            }
        });
    }
}

// Progress Dashboard Updates
function initializeProgressDashboard() {
    // Simulate real-time updates
    setInterval(() => {
        const progressBars = document.querySelectorAll('.progress-fill-small');
        progressBars.forEach(bar => {
            const currentWidth = parseInt(bar.style.width);
            if (currentWidth < 100) {
                const newWidth = Math.min(currentWidth + Math.random() * 5, 100);
                bar.style.width = newWidth + '%';
                
                const progressText = bar.parentElement.nextElementSibling;
                if (progressText) {
                    progressText.textContent = Math.round(newWidth) + '% Complete';
                }
            }
        });
    }, 5000);
}

// Initialize all new features when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeTranslationDemo();
    initializeVoiceDemo();
    initializeFileUpload();
    initializeAPIPlayground();
    initializeChatbot();
    initializeCulturalPreview();
    initializeProgressDashboard();
});

// Export functions for potential module usage
window.NCVETLocalization = {
    animateTranslationDemo,
    animateCounters,
    validateForm,
    initializeTranslationDemo,
    initializeVoiceDemo,
    initializeFileUpload,
    initializeAPIPlayground,
    initializeChatbot,
    initializeCulturalPreview,
    initializeProgressDashboard
};

// Simple client-side page router
function showPageById(id, push = true) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(p => p.classList.remove('active'));
    const target = document.getElementById(id);
    if (target && target.classList.contains('page')) {
        target.classList.add('active');
        if (push) {
            history.pushState({ page: id }, '', `#${id}`);
        }
        // Update active nav link
        document.querySelectorAll('.nav-menu a[href^="#"]').forEach(a => {
            a.classList.toggle('active', a.getAttribute('href') === `#${id}`);
        });
        // Ensure mobile menu closes
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
}

// Intercept nav clicks to route
document.querySelectorAll('.nav-menu a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const hash = this.getAttribute('href');
        const id = hash.replace('#', '');
        const target = document.getElementById(id);
        if (target && target.classList.contains('page')) {
            e.preventDefault();
            showPageById(id);
        }
    });
});

// Support browser back/forward
window.addEventListener('popstate', () => {
    const id = location.hash ? location.hash.substring(1) : 'home';
    showPageById(id, false);
});

// Initial load routing
window.addEventListener('DOMContentLoaded', () => {
    const initial = location.hash ? location.hash.substring(1) : 'home';
    showPageById(initial, false);
});
