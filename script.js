   // selettore dino

   dino = document.querySelector(".dino")

   // variabili del salto

  let bottom = 8;
  let increase = 5;
  let isjumping = false;
  let goingup = false;
  let maxalt = 130;

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

        if(bottom > 8){
             requestAnimationFrame(salto);
        }if(bottom === 8 ){
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

    // selettore cactus

    cactus1 = document.querySelector(".cactus1")
    cactus2 = document.querySelector(".cactus2")
    cactus3 = document.querySelector(".cactus3")
    contenitoreGioco = document.querySelector("#contenitore-gioco")

    // selettore pulsante avvio game e titolo GameOver e rigioca e punteggio

    buttonGame = document.querySelector(".buttonGame")
    GameOver = document.querySelector(".h1G")
    Riprova = document.querySelector(".riprova")
    Punteggio = document.querySelector(".punteggio")
    let score = 0


    // variabili spostamento verso sinistra

    let left = contenitoreGioco.offsetWidth;
    cactus1.style.left = left + "px";
    cactus2.style.left = left + "px";
    cactus3.style.left = left + "px";
    let goingleft = false;
    let stopGame = false
    let cactusArray = [cactus1,cactus2,cactus3];
    let velocita = 0
    let ritenta = false;
    //funzione per fare il cactus casuale

    function randomcactus(){
        let randomindex = Math.floor(Math.random()*cactusArray.length);
        return cactusArray[randomindex];
    }
   

    //funzione movimento verso sinistra

    function sinistra(cactus,left){
    if(stopGame){
        left = contenitoreGioco.offsetWidth;
        return;
    }
    if(goingleft && velocita < 3 ){
          
        left -= 5;
          cactus.style.left = left + "px";
          cactus.style.display = "block" ;

    }if(goingleft && velocita >= 3 && velocita <= 7){
        
        left -= 6;
        cactus.style.left = left + "px";
        cactus.style.display = "block" ;
    }
    if(goingleft && velocita >= 7 && velocita <= 15){
         
        left -= 7.5;
        cactus.style.left = left + "px";
        cactus.style.display = "block" ;
    }
    if(goingleft && velocita >= 15){
         
        left -= 9;
        cactus.style.left = left + "px";
        cactus.style.display = "block" ;
    }
    if(left + cactus.offsetWidth > 0){
        requestAnimationFrame(() => sinistra(cactus,left));
        
        
    }
    else{
        cactus.style.display = "none"
        cactus = randomcactus()
        left = contenitoreGioco.offsetWidth;
        score++;
        velocita++;
        aggiornapunteggio();
        requestAnimationFrame(() => sinistra(cactus,left));
    }

    }

    buttonGame.addEventListener("click", function(){
        if(!goingleft){
            
            goingleft = true;
            let cactus = randomcactus()
            let left = contenitoreGioco.offsetWidth;
            sinistra(cactus,left)
            requestAnimationFrame(loopGioco);
            
            
        }
    })
   
    // funzione per il riavvio del gioco

    function RiavvioGioco(){
           
        if(!ritenta){
           GameOver.style.display = "none";
           stopGame = false;
           goingleft =true;
           score = 0
           velocita = 0
           aggiornapunteggio();

           bottom = 8
           dino.style.bottom = bottom + "px";

           cactusArray.forEach(cactus => {
            cactus.style.left = contenitoreGioco.offsetWidth + "px";
            cactus.style.display = "none";
        })
           ritenta = true;
           let cactus = randomcactus();
            let left = contenitoreGioco.offsetWidth;
            sinistra(cactus, left);
           requestAnimationFrame(loopGioco);
        }
    }

     // funzione monitoraggio collisioni

    function loopGioco(){
        if(stopGame){
            return
        }
         let dinoBox = dino.getBoundingClientRect();
         let cactus1Box = cactus1.getBoundingClientRect();
         let cactus2Box = cactus2.getBoundingClientRect();
         let cactus3Box = cactus3.getBoundingClientRect();
        if( 
            dinoBox.right > cactus1Box.left &&
            dinoBox.left < cactus1Box.right &&
            dinoBox.bottom > cactus1Box.top &&
            dinoBox.top < cactus1Box.bottom 
        ){
            stopGame = true;
            left = contenitoreGioco.offsetWidth;
            GameOver.style.display = "block"
            requestAnimationFrame(loopGioco);
            ritenta = false;
            return;
        }
        if( dinoBox.right > cactus2Box.left &&
            dinoBox.left < cactus2Box.right &&
            dinoBox.bottom > cactus2Box.top &&
            dinoBox.top < cactus2Box.bottom
        ){
            stopGame = true;
            left = contenitoreGioco.offsetWidth;
            GameOver.style.display = "block"
            requestAnimationFrame(loopGioco);
            ritenta = false;
            return;
        }
        if( dinoBox.right > cactus3Box.left &&
            dinoBox.left < cactus3Box.right &&
            dinoBox.bottom > cactus3Box.top &&
            dinoBox.top < cactus3Box.bottom 
        ){
            stopGame = true;
            left = contenitoreGioco.offsetWidth;
            GameOver.style.display = "block"
            requestAnimationFrame(loopGioco);
            ritenta = false;
            return;
        }
        else{
            requestAnimationFrame(loopGioco);
        }
    }

// funzione per rigiocare

Riprova.addEventListener("click",function(){
    RiavvioGioco();
})

// funzione punteggio

function aggiornapunteggio(){
    Punteggio.innerText = "Punteggio : " + score
}