const catalogData = [
    {
        name: "T-Shirts",
        tagline: "Wear your Style with Comfort",
        price: "Start from 300₹",
        color: "radial-gradient(circle at 75% 50%, rgba(255, 112, 67, 0.22) 0%, rgba(20, 12, 8, 1) 75%)", 
        dotColor: "#FF7043", // Active color for Orange T-Shirt
        whatsappMsg: "Hello! I am interested in buying the Orange T-Shirt."
    },
    {
        name: "Shirts",
        tagline: "Stay Sharp, Stay Minimal",
        price: "Start from 600₹",
        color: "radial-gradient(circle at 75% 50%, rgba(78, 78, 59, 0.35) 0%, rgba(12, 12, 10, 1) 75%)", 
        dotColor: "#818163", // Active color for Olive Shirt
        whatsappMsg: "Hello! I would like to inquire about the Olive Shirt."
    },
    {
        name: " Jeans",
        tagline: "Premium Aesthetic Denim Look",
        price: "Start from 700₹",
        color: "radial-gradient(circle at 75% 50%, rgba(126, 87, 194, 0.22) 0%, rgba(12, 10, 18, 1) 75%)", 
        dotColor: "#7E57C2", // Active color for Lavender Jeans
        whatsappMsg: "Hello! I am interested in the Lavender Jeans."
    }
];

const businessPhone = "919011166266"; 
let currentIndex = 0;
let autoSliderTimer = null;

const container = document.getElementById('hero-container');
const pName = document.getElementById('product-name');
const pTagline = document.getElementById('product-tagline');
const pPrice = document.getElementById('product-price');
const whatsappBtn = document.getElementById('whatsapp-btn');

const cOrange = document.getElementById('c-orange');
const cOlive = document.getElementById('c-olive');
const cLavender = document.getElementById('c-lavender');

const stageContainers = [cOrange, cOlive, cLavender];

function rotate3DStageEngine(activeIndex) {
    currentIndex = activeIndex;
    const currentProduct = catalogData[activeIndex];
    
    // Text and content updating
    pName.innerText = currentProduct.name;
    pTagline.innerText = currentProduct.tagline;
    pPrice.innerText = currentProduct.price;
    
    // Background scaling adapter
    if (window.innerWidth > 1024) {
        container.style.background = currentProduct.color;
    } else {
        let mobileColor = currentProduct.color.replace("at 75% 50%", "at 50% 65%");
        container.style.background = mobileColor;
    }
    
    const encodedText = encodeURIComponent(currentProduct.whatsappMsg);
    whatsappBtn.href = `https://wa.me/${businessPhone}?text=${encodedText}`;
    document.querySelector('.submit-btn').style.background = currentProduct.color;

    // 🌟 DOTS COLOR MATCHING ENGINE
    const dots = document.querySelectorAll('.dot');
    dots.forEach((d, i) => {
        if (i === activeIndex) {
            d.classList.add('active');
            // Active dot par current item ka branded color apply hoga aur glow aayega
            d.style.background = currentProduct.dotColor;
            d.style.borderColor = currentProduct.dotColor;
            d.style.boxShadow = `0 0 14px ${currentProduct.dotColor}`;
        } else {
            d.classList.remove('active');
            // Inactive dots default transparent background par chale jayenge
            d.style.background = "rgba(255, 255, 255, 0.25)";
            d.style.borderColor = "transparent";
            d.style.boxShadow = "none";
        }
    });

    // Carousel position switcher
    stageContainers.forEach((containerElement, elementIndex) => {
        containerElement.classList.remove('pos-center', 'pos-top-right', 'pos-bottom-left');
        
        let dynamicState = (elementIndex - currentIndex + stageContainers.length) % stageContainers.length;
        
        if (dynamicState === 0) {
            containerElement.classList.add('pos-center');
        } else if (dynamicState === 1) {
            containerElement.classList.add('pos-top-right');
        } else if (dynamicState === 2) {
            containerElement.classList.add('pos-bottom-left');
        }
    });
}

// ⏱️ Auto slider loop set to 1.5 seconds as requested for ultra speed
function startContinuousShowcase() {
    stopContinuousShowcase();
    autoSliderTimer = setInterval(() => {
        let targetNextIndex = (currentIndex + 1) % catalogData.length;
        rotate3DStageEngine(targetNextIndex);
    }, 1500); 
}

function stopContinuousShowcase() {
    if (autoSliderTimer) clearInterval(autoSliderTimer);
}

function manualSwitch(targetIndex) {
    if (targetIndex === currentIndex) return;
    rotate3DStageEngine(targetIndex);
    startContinuousShowcase(); 
}

window.addEventListener('resize', () => {
    rotate3DStageEngine(currentIndex);
});

// Init
rotate3DStageEngine(0);
startContinuousShowcase();