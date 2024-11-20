document.addEventListener('DOMContentLoaded', () => {
    const parallaxContainer = document.querySelector('.parallax-container');
    const layers = document.querySelectorAll('.parallax-layer');
    
    let mouseX = 0;
    let mouseY = 0;
    let initialX = 0;
    let initialY = 0;
  
    function lerp(start, end, factor) {
        return start + (end - start) * factor;
    }
    
 
    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX - window.innerWidth / 2) * 0.02;
        mouseY = (e.clientY - window.innerHeight / 2) * 0.02;
    });
    
  
    window.addEventListener('deviceorientation', (e) => {
        if (e.beta && e.gamma) {
            mouseX = e.gamma * 0.2;
            mouseY = e.beta * 0.2;
        }
    });
    
   
    function animate() {
        initialX = lerp(initialX, mouseX, 0.05);
        initialY = lerp(initialY, mouseY, 0.05);
        
        layers.forEach((layer, i) => {
            const depth = i * 5;
            const translateX = initialX * depth;
            const translateY = initialY * depth;
            
            layer.style.transform = `
                translateX(${translateX}px) 
                translateY(${translateY}px) 
                translateZ(${-depth * 2}px) 
                scale(${1 + depth * 0.1})
            `;
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
}); 