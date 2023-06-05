// Canvas properties
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


// Radius of circle around the mouse within which the circles are allowed to move
const edge = 70;
let drawing = false;

const mouse = {
  x: null,
  y: null,
}

window.addEventListener('mousemove', function (event /*object contains info on what keys are pressed and mouse coordinates*/) { 
  mouse.x = event.x;
  mouse.y = event.y;
  console.log(mouse.x);
})

class Root { //This class is to create a base for the motion I want for my particle brush.
  constructor(x, y, particlecolor, centerX, centerY) {
    this.x = x;
    this.y = y;
    this.particlecolor = particlecolor;
    this.speedX = 0;
    this.speedY = 0; //Controls how fast the particles move.
    this.centerX = centerX;
    this.centerY = centerY;
  }
  calculate() { //Method to calculate particles current position and draw it on canvas
    //Determines the direction and speed the particle moves
    this.speedX += (Math.random() - 0.5) / 2;
    this.speedY += (Math.random() - 0.5) / 2; //The value can be negative or positive, so that the particles move left, right, up and down.
    this.x += this.speedX;
    this.y += this.speedY;
    //Calculate the current distance of the root particles from the center point. This distance determines how big the particle is. Particles are big at the beginning and get smaller as they spread out.
    /*Algorithm to calculate distance between 2 points:

    */
    const distanceX /*Difference between particle's last position on the horizontal x-axis and the center of circle/the mouse*/ = this.x - this.centerX;
    const distanceY = this.y - this.centerY;
    //If we connect these 2 points, we get a triangle and the distance is the hypotenuse side of that triangle.
    //https://stackoverflow.com/questions/20916953/get-distance-between-two-points-in-canvas
    //Using Pythagoras theorem:
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY); //This is the distance between mouse and last position of particle
    //Radius is size of circle within which particle is allowed to move
    const radius = (-distance / edge + 3) * edge / 8;

    if (radius > 0) /*Particle hasn't reached edge of area within which it's allowed to move*/ {
      requestAnimationFrame(this.calculate.bind(this)); //Call the animation before the browser performs the next repaint. bind(this) is used because this.calculate is passed to requestAnimationFrame, but I'm calling root.calculate from branchOut() function, and they are in different scopes, so branchOut doesn't have access to this.calculate
      ctx.beginPath();
      ctx.arc(this.x, this.y, radius, 0, 2 * Math.PI);
      ctx.fillStyle = this.particlecolor;
      ctx.fill();
      ctx.strokeStyle = '#fff31093';
      ctx.stroke();
    }
  }
}

function branchOut() {
  //Center of circle is detected by assigning the value of mouse.x and mouse.y
  const centerX = mouse.x;
  const centerY = mouse.y;
  for (let i = 0; i <= 3; i++) { //We will have 3 roots growing out from each center
  const root = new Root(mouse.x, mouse.y, '#ff3eb83a', centerX, centerY);
  root.calculate();
  }
}

//To prevent stretching
window.addEventListener('resize', function() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

//For old particles to disappear slowly
window.addEventListener('mousemove', function() {
  //This is used instead of clearRect because clearRect would make the circles disappear but the branches still spreads out after they disappear.
  ctx.fillStyle = 'rgba(5, 1, 8,0.03)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  branchOut();
});

window.addEventListener('mousedown', function() {
  drawing = true;
});

window.addEventListener('mouseup', function() {
  drawing = false;
});