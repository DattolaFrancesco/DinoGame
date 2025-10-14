   // selettore dino

   dino = document.querySelector(".dino")

   // variabili del salto

  let bottom = 0
  let increase = 5
  let isjumping = false
  let goingup = false
  let maxalt = 150

  // funzione salto

  function salto(){
        if(goingup){
            bottom += increase;
            
        }if(bottom >= maxalt){
            goingup = false;
            
        }if(!goingup){
            bottom -= increase
            isjumping = false
        }

        dino.style.bottom = bottom + "px"

        if(bottom > 0){
             requestAnimationFrame(salto);
        }
        
           
        
  }
 
    document.addEventListener("keydown", function(event){
        if(event.code === "Space" && !isjumping){
            isjumping = true;
            requestAnimationFrame(salto);
            goingup = true;
        }
    })
