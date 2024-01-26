
let currentSong = new Audio()
var isPlaying = false;
let dark  = true;
let songs;
var isMute = false;
var currFolder = "";


async function getSongs(folder){
    if(folder!=undefined)
    currFolder = folder
    let gitl = await fetch(`https://github.com/Vignesh9123/Spotify-clone/raw/main/songs/${currFolder}`)
    let gittxt = await gitl.json()
    songs = []
    for(let i = 0; i<gittxt.payload.tree.items.length;i++){
        let song = gittxt.payload.tree.items[i]
        if(song.path.endsWith(".mp3"))
        songs.push(song)
    }
    let songscontainer = document.body.getElementsByClassName("songstitles")[0]
    let sngsdiv = document.createElement("div")
    for(let i = 0; i<songs.length;i++){
        div = document.createElement("div")
        div.className = "librarysongcard"
        let childdiv = document.createElement("div")
        childdiv.innerHTML = songs[i].name.split(".")[0]
        let span = document.createElement("span")
        span.className = "material-symbols-outlined"
        span.innerHTML = "play_arrow"
        div.style.cursor = "pointer"
        div.append(childdiv,span)
        sngsdiv.append(div)
    }
    songscontainer.innerHTML = sngsdiv.innerHTML
    if(songscontainer.innerHTML!=""){
    playaud(document.getElementById("titles").children[0])
   for(let i = 0; i<document.getElementById("titles").children.length;i++){
    document.getElementById("titles").children[i].addEventListener("click",()=>{
        playaud(document.getElementById("titles").children[i])
       
    })}}
    if(songscontainer.innerHTML==""){
        songscontainer.innerHTML = "There are no songs in this playlist Please add the song to the playlist "
    }
}
logo.addEventListener("click",()=>{
    location.reload()
})
function playaud(audio){
    
    currentSong.src = `https://github.com/Vignesh9123/Spotify-clone/raw/main/songs/${currFolder}`+audio.getElementsByTagName("div")[0].innerHTML+'.mp3'
    
    currentSong.onplay= ()=>{isPlaying = true
    play.innerHTML = "pause"
    currentSong.preload = "all"
}
    songtit = String(audio.getElementsByTagName("div")[0].innerHTML)
    songtit = songtit.split(".")
    if(document.querySelector(".songinfo").firstElementChild!=null){
    document.querySelector(".songinfo").firstElementChild.innerHTML = songtit[0]
    if(pause = true){
        currentSong.play()}
    

    currentSong.onpause = ()=>{
        isPlaying = false
    }
    audio.addEventListener("click",()=>{
        isPlaying ? currentSong.pause():currentSong.play()
    })
    }
    else{
        playaud(document.getElementById("titles").children[0])
        return
    }
}
function converttominutes(seconds){
    let minutes = Math.floor(seconds/60);
    seconds = Math.ceil(Number(seconds)%60);
    minutes = parseInt(minutes);
    minutes = String(minutes).padStart(2,'0')
    seconds = String(seconds).padStart(2,'0')
    return `${(minutes)}:${(seconds)}`;
}

  
async function displayAlbums(){
        let a = await fetch(`https://github.com/Vignesh9123/Spotify-clone/tree/main/songs`)
    let htm = await a.json()

   
    let anchors = htm.payload.tree.items
    for(let i= 0; i<anchors.length;i++){
        let cardscontainer = document.body.getElementsByClassName("tracks")[0]
        const e = anchors[i]
        
            
            let folder = e.name
            let xm;
            let ht;
            try{

                xm = await fetch(`https://github.com/Vignesh9123/Spotify-clone/raw/main/songs/${folder}/info.json`)
                ht = await xm.json()
                cardscontainer.innerHTML = cardscontainer.innerHTML+`<div class="trackcard" data-folder="${folder}">
        <div class="img">
        <img src="https://github.com/Vignesh9123/Spotify-clone/raw/main/songs/${folder}/cover.jpg" alt="">
        <svg data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 24 24" class="Svg-sc-ytk21e-0 bneLcE"><path d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z"></path></svg>
        
    </div><div class="tracktitle">
           <h1>${ht.title} </h1>
        </div>
        <div class="txt">${ht.description}</div>
    </div>`
        
            }
            catch(err){
                console.log("No info found");
            }
        
    
    }
    Array.from(document.getElementsByClassName("trackcard")).forEach(e=>{
        e.addEventListener("click",async()=>{
            currFolder = e.dataset.folder
            document.getElementsByClassName("songstitles")[0].innerHTML=""
            await getSongs(currFolder+'/')
        })
    })
}

async function main(){
    await getSongs()
    if(songs == undefined){
        titles.innerHTML+="Please add songs to your library to display them here"
    }
    if(document.querySelector(".songstitles").innerHTML == "") {
        console.log("No songs");
        document.querySelector(".songstitles").innerHTML = "Please select your desired playlist to play songs"
        
    }
// let songtitles = document.getElementById("titles").getElementsByClassName("librarysongcard")
    displayAlbums()

   
   play.addEventListener("click",()=>{
     {
        if(currentSong.paused && currentSong.src!=""){
            songtit = currentSong.src.split(`songs/${currFolder}`)[1].split(".")[0]
            document.querySelector(".songinfo").firstElementChild.innerHTML = decodeURI(songtit)
            currentSong.play()
            play.innerHTML = "pause"
            
        }    
        else{
            currentSong.pause()
            play.innerHTML = "play_arrow"
        }
        
    
        
    }
    
   })
currentSong.addEventListener("timeupdate",()=>{

    let songtime = `${converttominutes(currentSong.currentTime)}/${converttominutes(currentSong.duration)}`
    if(songtime.includes(NaN)!=true){
        document.querySelector(".songtime").innerHTML = songtime
    }
    if(currentSong.currentTime == currentSong.duration) {
        console.log("complete");
        next.click()}
})
}
main()


document.addEventListener('keyup', event => {
    if (event.code === 'Space') {
    try {
        if(currentSong.paused && currentSong.src!=""){
            songtit = currentSong.src.split(`songs/${currFolder}`)[1].split(".")[0]
            document.querySelector(".songinfo").firstElementChild.innerHTML = decodeURI(songtit)
            currentSong.play()
            play.innerHTML = "pause"
            
        }    
        else{
            currentSong.pause()
            play.innerHTML = "play_arrow"
        }
        
    
        
    } catch (error) {
        document.querySelector(".songinfo").firstElementChild.innerHTML = "Select a song"
    }
    }
  })
  document.getElementById("darktoggle").addEventListener("click",()=>{
    if(dark){
        dark = false
        document.body.style.filter = "invert(90%)"
        document.body.style.transition = "filter 0.5s"

        let imgs = document.body.getElementsByTagName("img")
        for(const img of imgs){
            img.style.filter = "invert()"
            
            logo.style.fill = "#8f5bb0"
        }
        Array.from(document.getElementsByClassName("trackcard")).forEach((s)=>{
           
            s.getElementsByTagName("svg")[0].style.filter ="invert(1)"
        })
        document.getElementById("darktoggle").style.backgroundColor = "#121212"
    document.getElementById("darktoggle").innerHTML = "dark_mode"}
    else{
        document.body.style.filter = "invert(0)"
        document.body.style.transition = "filter 0.5s"
        let imgs = document.body.getElementsByTagName("img")
    
        for(const img of imgs){
            img.style.filter = "invert(0)"
            logo.style.fill="white"
        }
        Array.from(document.getElementsByClassName("trackcard")).forEach((s)=>{
           
            s.getElementsByTagName("svg")[0].style.filter ="invert(0)"
        })
        dark= true
        document.getElementById("darktoggle").innerHTML = "light_mode"
    }
  })
  document.body.getElementsByClassName("seekbar")[0].addEventListener("click",(e)=>{
    document.querySelector(".circle").style.left = (Math.floor((e.offsetX/e.target.getBoundingClientRect().width)*100))+"%"
    let timeper = Math.floor((e.offsetX/e.target.getBoundingClientRect().width)*100)
     currentSong.currentTime = timeper*currentSong.duration/100;
    
})
    
currentSong.addEventListener("timeupdate",()=>{
    document.querySelector(".circle").style.left = ((currentSong.currentTime/currentSong.duration)*100)+"%"
})
menu.addEventListener("click",()=>{
    document.querySelector(".sidecontainer").style="left:0%;z-index:2;transition:left 0.5s linear;width:75vw"
   
})
document.getElementById("close").addEventListener("click", ()=>{
    document.querySelector(".sidecontainer").style="left:-60%;z-index:2;transition:left 0.5s linear;width:50vw"
})

previous.addEventListener("click",()=>{
    
    for(let i = 0; i < songs.length;i++){
        if((decodeURI(currentSong.src.split(`/songs/${currFolder}`)[1]) ==
        document.getElementById("titles").children[0].firstElementChild.innerHTML+'.mp3')){
        
            playaud(document.getElementById("titles").children[songs.length-1])
            break
        }
        if("https://github.com/Vignesh9123/Spotify-clone/raw/main/"+encodeURI(songs[i].path) == currentSong.src){
       
            if(decodeURI(currentSong.src.split(`/songs/${currFolder}`)[1]) ==
            document.getElementById("titles").children[i].firstElementChild.innerHTML +'.mp3'){
                playaud(document.getElementById("titles").children[i-1])
                break
            }
        }
    }
})
next.addEventListener("click",()=>{
    for(let i = 0; i<songs.length;i++){

        if((decodeURI(currentSong.src.split(`/songs/${currFolder}`)[1]) ==
        document.getElementById("titles").children[songs.length-1].firstElementChild.innerHTML+".mp3")){
          
            playaud(document.getElementById("titles").children[0])
            break;
        }
        
        if(("https://github.com/Vignesh9123/Spotify-clone/raw/main/"+encodeURI(songs[i].path)) == (currentSong.src) && (decodeURI(currentSong.src.split(`/songs/${currFolder}`)[1])) ==
       (document.getElementById("titles").children[i].firstElementChild.innerHTML+'.mp3')){
           
            playaud(document.getElementById("titles").children[i+1])
            break;
        }
    }
})
volrange.addEventListener("input",(e)=>{
   
    vollabel.style = `display:block;left:calc(${e.target.value}% - ${e.target.value/5}px);`
    vollabel.innerHTML = e.target.value
    
    currentSong.volume = (e.target.value)/100
    if(currentSong.volume == 0){isMute =  true;
         document.body.getElementsByClassName("volbar")[0].firstElementChild.innerHTML = "volume_mute"
    }
         else document.body.getElementsByClassName("volbar")[0].firstElementChild.innerHTML = "volume_up"
    
})

volrange.addEventListener("touchend",()=>{
    vollabel.style.display = "none"
    
})
document.body.getElementsByClassName("volbar")[0].firstElementChild.addEventListener("click",()=>{
    isMute = !isMute
    if(isMute){
        document.body.getElementsByClassName("volbar")[0].firstElementChild.innerHTML = "volume_mute"
        currentSong.volume = 0;
        volrange.value = 0;
    }
    if(!isMute){
        document.body.getElementsByClassName("volbar")[0].firstElementChild.innerHTML = "volume_up"

        currentSong.volume = 0.2

        volrange.value = 20
    }
    if(volrange.value > 0) isMute = false
})
function labeldisable(){
    vollabel.style.display = "none"
    
}

