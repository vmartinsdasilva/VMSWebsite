// ============================================
// NAVIGATION MENU
// ============================================
function toggleMenu() {
  document.getElementById("navLinks").classList.toggle("active");
}

// ============================================
// IMAGE GALLERY
// ============================================
let currentIndex = 0;
const images = document.querySelectorAll('.gallery-image');
const totalImages = images.length;
const imageTitle = document.getElementById('imageTitle');
const imageCounter = document.getElementById('imageCounter');
const dotsContainer = document.getElementById('dotsContainer');

// Create dots for gallery navigation
for (let i = 0; i < totalImages; i++) {
    const dot = document.createElement('div');
    dot.className = 'dot' + (i === 0 ? ' active' : '');
    dot.onclick = () => goToSlide(i);
    dotsContainer.appendChild(dot);
}

function updateGallery() {
    // Update images
    images.forEach((img, index) => {
        img.classList.toggle('active', index === currentIndex);
    });

    // Update title
    imageTitle.textContent = images[currentIndex].dataset.title;

    // Update counter
    imageCounter.textContent = `${currentIndex + 1} / ${totalImages}`;

    // Update dots
    const dots = dotsContainer.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
    });
}

function changeImage(direction) {
    currentIndex += direction;
    
    if (currentIndex < 0) {
        currentIndex = totalImages - 1;
    } else if (currentIndex >= totalImages) {
        currentIndex = 0;
    }
    
    updateGallery();
}

function goToSlide(index) {
    currentIndex = index;
    updateGallery();
}

// Keyboard navigation for gallery
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') changeImage(-1);
    if (e.key === 'ArrowRight') changeImage(1);
});

// ============================================
// P5.JS SKETCH - WAVY TEXT
// ============================================
let sampleFac;
let myFont;
let myAmpSlider;
let colorSlider;
let sampleFactorSlider;
const myFreq = 0.5;
const myWord = 'Hi There';

function preload() {
  myFont = loadFont('SuaTest-Medium.ttf');
}

function setup() {
  canvas.parent('p5-canvas-container');
  noLoop();
  colorMode(HSB, 360, 100, 100);
  
  // Download buttons
  createButton('Download PNG').mousePressed(() => saveCanvas('my-image', 'png'));
  createButton('Download SVG').mousePressed(() => save('my-image.svg'));

  // Sliders
  myAmpSlider = createSlider(0, 100, 20, 1);
  myAmpSlider.position(30, 310);
  myAmpSlider.input(redraw);
  
  colorSlider = createSlider(0, 360, 270, 1);
  colorSlider.position(30, 370);
  colorSlider.size(130);
  colorSlider.input(redraw);
  
  sampleFactorSlider = createSlider(0, 100, 40, 1);
  sampleFactorSlider.position(340, 310);
  sampleFactorSlider.input(redraw);
  
  redraw();
}

function draw() {
  background(95);

  const myAmp = myAmpSlider.value();
  const colorHue = colorSlider.value();
  const sampleFac = sampleFactorSlider.value();

  // Labels
  fill(30, 30, 20);
  noStroke();
  textSize(14);
  text('Wave (amplitude): ' + myAmp, 30, 300);
  text('Color Hue: ' + colorHue + '°', 30, 360);
  text('Detail: ' + sampleFac, 340, 300);
  
  fill(colorHue, 80, 90);

  // Convert text to points
  const myPts = myFont.textToPoints(myWord, 50, 200, 180, { 
    sampleFactor: sampleFac / 100 
  });

  // Draw wavy text
  noStroke();
  for (let myPoint of myPts) {
    const myY = myPoint.y;
    const mySidewaysShift = cos(myY * myFreq) * myAmp;
    const myX = myPoint.x + mySidewaysShift;

    fill(colorHue, 80, 90);
    circle(myX, myY, 5);
  }
}

        