   // selettore dino

   dino = document.querySelector(".dino")

   // variabili del salto

  let bottom = 0;
  let increase = 5;
  let isjumping = false;
  let goingup = false;
  let maxalt = 150;

  // funzione salto

  function salto(){
        if(goingup){
            bottom += increase;
            
        }if(bottom >= maxalt){
            goingup = false;
            
        }if(!goingup){
            bottom -= increase
            
        }

        dino.style.bottom = bottom + "px"

        if(bottom > 0){
             requestAnimationFrame(salto);
        }if(bottom === 0 ){
           isjumping = false;
        }
        
           
        
  }
 
    document.addEventListener("keydown", function(event){
        if(event.code === "Space" && !isjumping  ){ 
            isjumping = true;
            goingup = true;
            requestAnimationFrame(salto);
            
        }
    })

    // selettore cactus1

    cactus1 = document.querySelector(".cactus1")
    contenitoreGioco = document.querySelector("#contenitore-gioco")


    // variabili spostamento verso sinistra

    let left = contenitoreGioco.offsetWidth;
    cactus1.style.left = left + "px";
    let goingleft = false;
    
    
    //funzione movimento verso sinistra

    function sinistra(){
       if(goingleft){
          
        left -= 3;
          cactus1.style.left = left + "px";
    }
    if(left + cactus1.offsetWidth > 0){
        requestAnimationFrame(sinistra);
        
        
    }
    else{
        left = contenitoreGioco.offsetWidth;
         requestAnimationFrame(sinistra);
         
         
       }

    }

    document.addEventListener("mousedown", function(event){
        if(event.button === 0 && !goingleft){
            requestAnimationFrame(sinistra);
            requestAnimationFrame(loopGioco);
            goingleft = true;
        }
    })
   

    // funzione monitoraggio collisioni

    function loopGioco(){
         let dinoBox = dino.getBoundingClientRect();
         let cactus1Box = cactus1.getBoundingClientRect();
        if( 
            dinoBox.right > cactus1Box.left &&
            dinoBox.left < cactus1Box.right &&
            dinoBox.bottom > cactus1Box.top &&
            dinoBox.top < cactus1Box.bottom
        ){
            left = contenitoreGioco.offsetWidth;
            alert("Game Over!");
            requestAnimationFrame(loopGioco);
        }else{
            requestAnimationFrame(loopGioco);
        }
    }



