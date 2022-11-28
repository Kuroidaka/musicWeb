import {songs} from './assets/js/song.js'
// import playListView from './playListView.js';

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);


let musicMenuHeight = $('.music-menu').clientHeight ; 
var playListFix = $('.play-list');
var playListWrap = $('.play-list-wrap');
const heading = $('.music-menu .song_name');
        const currentSongImageWrap = $('.song_img-wrap');
        const currentSongImage = $('.song_img');
        const audio = $('#audio');
        const playBtn = $('.play-icon'); 
        const pauseBtn = $('.pause-icon');
        const range = $('.range');
        const nextBtn = $('#next');
        const prevBtn = $('#prev');
        const repeatBtn = $('.repeat');
        const randomBtn = $('.random');
        const menuBtns = $$('.jsChangeIcon');
        const changeIconRepeat = $('.jsChangeIconRepeat');
        const songDurationTime = $('.duration_time');
        const songCurrentTime = $('.current_time');
        const currentBar = $('.current-range');
        // const entireBackgroundImage = $('.entire-background-img');
        const entireBackgroundImageWrap = $('.entire-background-img-wrap');
        const playlistBtn = $('.playlist-btn');
        const menuSongInfo = $('.menu-song-info');
        const songName =$('.song_name');
        const songSinger =$('.song_singer');
        const songInfo =$('.song-info-wrap');
        const rangeInputs = $$('input[type="range"]');
        const volumeMenu = $('#volume');
        const blurBar =$('.blur-bar');
        const PLAYER_STORAGE_KEY = 'WEB_PLAYER';




// css để cách list music với menu



    // Object.assign(playListFix.style, {
    //     position : 'relative',
    //     top: musicMenuHeight + 10 + 'px',

    // })
    // console.log(musicMenuHeight);

//app function
        


const app = {
    currentIndex: JSON.parse(localStorage.getItem('current song index')),
    updateCurrentIndex: function() {
        localStorage.setItem('current song index', JSON.stringify(this.currentIndex));
    },
    isPlaying : false,
    isRandom : false,
    isRepeat : false,
    isListOpen : false,
    config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
    songs: [...songs],
    setConfig: function(key, value) {
        this.config[key] = value;
        localStorage.setItem(PLAYER_STORAGE_KEY,JSON.stringify(this.config));
    },

    render: function() {
        const htmls = this.songs.map(function(song,index) {
            return `
            <div class="song-item">
            <div class="song-info">
                <div class="s-song_img-wrap">
                    <img src="${song.image}" alt="" class="s-song_img">
                </div>
                <div class="s-song-header ">
                    <div class="s-song-name">
                        ${song.name}
                    </div>
                    <div class="s-song-singer">
                    ${song.singer}
                    </div>
                    
                </div>
            </div>

            <div class="option-select">
                <i class="fa-solid fa-ellipsis"></i>
            </div>

        </div>
            `

        })
        // console.log(htmls);

        $('.play-list').innerHTML = htmls.join('');
    },

    handleEvent: function() {
        const songImage = $('.song_img-wrap');
        const songImageHeight = songImage.clientHeight;
        const songImageWidth = songImage.clientWidth;
        const currentSongItems = $$('.song-item');  
        const _this = this;
        
        // console.log(currentSongItems);
        // song image rotate

        const currentSongImageRotate = currentSongImage.animate(
        {
          transform: 'rotate(360deg)'   
        },
        {
            duration: 10000,
            iterations: Infinity
        })
        currentSongImageRotate.pause();
        // change song image size when scrolling
        // document.onscroll = function() {
            
        //     const scrollY = window.scrollY || document.documentElement.scrollTop;
        //     const newHeight = songImageHeight - scrollY ;
        //     const newWidth = songImageWidth - scrollY;
        //     songImage.style.height = newHeight > 0 ? newHeight + 'px' : 0 ;
        //     songImage.style.width = newWidth > 0 ? newWidth + 'px' : 0 ;
        //     songImage.style.opacity = newHeight/songImageHeight;
        // }

        // check playing

        const playBtnActive = $('.play-icon.play_active');

        const handleBtnClick = (e) => {
         

        }
        
        playBtn.onclick = function() { 
            pauseBtn.animate([
                
                {
                    transform: 'scale(0)'   
                },
                {
                    transform: 'scale(1.3)'   
                }

            ],
            {
                duration: 200,
                iterations: 1
            })

            audio.play();   
            _this.isPlaying = true;
            _this.changeSizeImage();

            audio.onplay = function () {
                playBtn.style.display = 'none';
                pauseBtn.style.display = 'block';
                currentSongImageRotate.play();
    
                // currentSongImage.classList.remove('active');
                
                // console.log(currentSongImageRotate.style.transform);
               
            }
      
                
        }

       

        pauseBtn.onclick = function() { 
            playBtn.animate([
                
                {
                    transform: 'scale(0)'   
                },
                {
                    transform: 'scale(1.3)'   
                }

            ],
            {
                duration: 200,
                iterations: 1
            })

            audio.pause();   
            _this.isPlaying = false;
            _this.changeSizeImage();

            audio.onpause = function () {
                pauseBtn.style.display = 'none';
                playBtn.style.display = 'block';
                currentSongImageRotate.pause();
    
                // currentSongImage.classList.remove('active');
                
                // console.log(currentSongImageRotate.style.transform);
               
            }
      
                
        }

        this.menuIconchange();
        //  change playing pausing icon

       

        audio.onpause = function() {
           
            currentSongImageRotate.pause();
        }

        // range move following the playing music
        
        var percentChange = function() {
            // console.log(range.value);
            if(audio.duration){
                const currentPercent = audio.currentTime/audio.duration*100;  
                    range.value = currentPercent;
                    range.style.backgroundSize = `${currentPercent}% 100%`
            }


            // _this.currentBarUpdate();
        } 

        // change range 

        audio.ontimeupdate = function(e) {
            percentChange();
            audio.addEventListener('loadeddata',function() {
                let autoTime = e.target.duration;
                // console.log(autoTime);
                let songDurationTimeMin = Math.floor(autoTime/60); 
                
                let songDurationTimeSec = Math.floor(autoTime%60);
                // console.log(songDurationTimeSec);
                songDurationTimeSec = songDurationTimeSec < 10 ? `0${songDurationTimeSec}`: songDurationTimeSec;
                songDurationTime.innerText = `${songDurationTimeMin}:${songDurationTimeSec}`;

               
               
            })
            
            let autoCurrentTime = e.target.currentTime;
            // console.log(autoCurrentTime);
            let songCurrentTimeMin = Math.floor(autoCurrentTime/60); 
            
            let songCurrentTimeSec = Math.floor(autoCurrentTime%60);
            // console.log(songCurrentTimeSec);
            songCurrentTimeSec = songCurrentTimeSec < 10 ? `0${songCurrentTimeSec}`: songCurrentTimeSec;
            songCurrentTime.innerText = `${songCurrentTimeMin}:${songCurrentTimeSec}`;

            // currentBar.style.width = `${range.value}%`;
            // console.log(currentBar.style.width, range.value);
            
        }

        range.oninput = function(e) {
            audio.pause();
            audio.currentTime = e.target.value * audio.duration / 100;

            range.ontouchend = function() {
                audio.play();
            }

            range.onmouseup = function() {
                audio.play();
            }

          
        }
        
        
        // on phone 

        // range.ontouchstart = function () {
        //     audio.pause();
        //         console.log(this.value);
        // }

        // range.ontouchmove = function () {
        //     audio.pause();
        //     range.onchange = function() {
               
        //         audio.currentTime = this.value * audio.duration / 100;
        //         // console.log(audio.currentTime);
        //     }
        //     range.ontouchend = function (){
        //         // audio.play();
    
        //     }
            
        // }

        //  click next button

        
       

        
        
        
        nextBtn.onclick = function() {
            var activeIndex = _this.currentIndex;
            if(_this.isRandom){
                _this.playRandomSong();
                range.value = 0;
                audio.play();

            }
            else {
                _this.next();
                range.value = 0;
                audio.play();
            }
            _this.activeCurrentSong(activeIndex );
            _this.changeView(currentSongItems[_this.currentIndex]);
    
        }
        //  click prev button
        prevBtn.onclick = function(e) {
            var activeIndex = _this.currentIndex;
            if(_this.isRandom){
                _this.playRandomSong();
                range.value = 0;
                audio.play();
            }
            else {
                _this.prev();
                range.value = 0;
                audio.play();

            }

            _this.activeCurrentSong(activeIndex );
            _this.changeView(currentSongItems[_this.currentIndex]);
        }
        
        // click on song        
        currentSongItems.forEach(function(currentSongItem, index) {

            currentSongItem.onclick = function() {
                range.value = 0;
                var activeIndex = _this.currentIndex;
                var currentActiveSongItem = $('.song-item.active');
                currentActiveSongItem.classList.remove('active');
                currentSongItem.classList.add('active');


                _this.currentIndex = index;
                _this.loadCurrentSong();
                audio.play();

                

        }
    } )

        //  click random btn

        randomBtn.onclick = function() {
            this.classList.toggle('active');
            _this.isRandom = this.classList.contains('active');
            // if(!_this.isRandom){
            //     this.style.opacity = '0.5';

            // }

            _this.setConfig('isRandom', _this.isRandom);
        }

        
        //  click repeat btn

        repeatBtn.onclick = function() {
            this.classList.toggle('active');
            _this.isRepeat = this.classList.contains('active');
          
            // if(!_this.isRepeat){
            //     this.style.opacity = '0.5';
            // }

            _this.setConfig('isRepeat', _this.isRepeat);
        }

        //  when audio end
        audio.onended = function() {
            var activeIndex = _this.currentIndex;
            if(_this.isRepeat) {
                _this.loadCurrentSong();
                this.play();
            }
            else {
                _this.nextSongEventWhenClicked();
            }

            _this.activeCurrentSong(activeIndex );
            _this.changeView(currentSongItems[_this.currentIndex]);

            
        }

        playlistBtn.onclick = function() {
            
          
            
            var currentActiveSongItem = $('.song-item.active');
            if(_this.isListOpen){
               
                this.style.backgroundColor = 'transparent';
                this.style.border= '5px solid transparent';
                this.style.color= 'var(--white-color)';


                currentSongImageWrap.style.width = _this.iData.wW + 'px';
                // console.log(currentSongImageWrap.style.width,_this.iData.wW );
                currentSongImageWrap.style.height = _this.iData.wH + 'px';
                
                currentSongImage.style.width = _this.iData.w + 'px';
                currentSongImage.style.height = _this.iData.h + 'px';
                _this.isListOpen = !_this.isListOpen;
                songName.style.display = 'none';
                currentSongImageWrap.style.border = '5px solid rgb(99 97 255)';
                setTimeout(function() {
                    menuSongInfo.style.flexDirection = 'column'
                    songName.style.display = 'block';
                  }, 100 );
               
                playListWrap.style.display = 'none'
                blurBar.style.display = 'none';
            }
            else {
                this.style.backgroundColor = 'var(--white-color)';
                this.style.border= '5px solid var(--white-color)';
                this.style.borderRadius= '4px';
                this.style.color= 'var(--black-color)';
                

                currentSongImageWrap.style.width = '85px'
                currentSongImageWrap.style.height = '85px'
                currentSongImage.style.width = '65px'
                currentSongImage.style.height = '65px'
                menuSongInfo.style.flexDirection = 'row'
                songName.style.fontSize = '22px'
                songSinger.style.fontSize = '18px'
                _this.isListOpen = !_this.isListOpen;
                songInfo.style.display = 'none';
                currentSongImageWrap.style.border = 'transparent'
                setTimeout(function() {
                    // menuSongInfo.style.flexDirection = 'column'

                    songInfo.style.display = 'block';
                  
                  }, 10 );
                setTimeout(function() {
                    playListWrap.style.display = 'block';
                    blurBar.style.display = 'block';
                    _this.changeView(currentActiveSongItem);
                  }, 200);
                
            }
            

        }

        volumeMenu.oninput = function(e){
            audio.volume = e.target.value/100;
           this.style.backgroundSize = `${e.target.value}% 100%`
        }
       
       
    },
    activeCurrentSong : function( activeIndex) {
        
        const currentSongItems = $$('.song-item');  
        currentSongItems[activeIndex].classList.remove('active');
        currentSongItems[this.currentIndex].classList.add('active');
        
    },
    iData: {

    },
    changeSizeImage: function () {
        if(!this.isListOpen){
            if(this.isPlaying){
                currentSongImageWrap.style.transitionDuration = '0.3s'
                currentSongImageWrap.style.transform = 'scale(0.87)';
                setTimeout(
                    function() {
                        currentSongImageWrap.style.transform = 'scale(0.8)';
                    },
                400
                )   
            }
            else {
                currentSongImageWrap.style.transform = 'scale(0.6)';
                currentSongImageWrap.style.transitionDuration = '0.15s'

    
            }
                
        }
        
        
        
    },
    getFirstImageSize: function() {
        const ImgWrapW = currentSongImageWrap.offsetWidth;
        const ImgWrapH = currentSongImageWrap.offsetHeight;
        const ImgW = currentSongImage.offsetWidth;
        const ImgH = currentSongImage.offsetHeight;

        this.iData = {
            wW : ImgWrapW,
            wH : ImgWrapH,
            w : ImgW,
            h : ImgH
        }
    },
    defineProperties: function() {
        Object.defineProperty(this, 'currentSong', { 
            get: function() {
                return this.songs[this.currentIndex];
            }
        })

        
    },
    playRandomSong : function() {
        
        let newIndex;

        do {
            newIndex = Math.floor(Math.random() * this.songs.length);
        }   
        while(newIndex === this.currentIndex)
        this.currentIndex= newIndex;
        this.loadCurrentSong();

    },    
    loadCurrentSong: function() {
       
        heading.textContent = this.songs[this.currentIndex].name;
        songSinger.textContent = this.currentSong.singer;
        currentSongImage.src = this.currentSong.image;
        // entireBackgroundImage.style.backgroundImage = `url("${this.currentSong.image}")`;
        entireBackgroundImageWrap.style.backgroundImage = `url("${this.currentSong.image}")`;
        // console.log(this.currentSong.image,currentSongImage);
        range.style.backgroundSize = '0% 100%';
        audio.src = this.currentSong.path;
        this.updateCurrentIndex();
        const currentSongItems = $$('.song-item'); 
        this.activeCurrentSong(this.currentIndex);
        this.changeView(currentSongItems[this.currentIndex]);
        this.changeSizeImage();
    },
    loadConfig: function() {
        this.isRandom = this.config.isRandom;
        this.isRepeat = this.config.isRepeat;
        if(this.isRandom){
            randomBtn.classList.toggle('active');
            // if(!this.isRandom){
            //     randomBtn.style.opacity = '0.5';
            // }
        }

        if(this.isRepeat){
            repeatBtn.classList.toggle('active');
            // if(!this.isRepeat){
            //     repeatBtn.style.opacity = '0.5';
            // }
        }

    },
    next: function() {
        this.songs[this.currentIndex++];
        
        if(this.currentIndex > this.songs.length -1) {
            this.currentIndex = 0;
        }

        // console.log(this.currentIndex,  this.songs.length );
        this.loadCurrentSong();

    },
    menuIconchange : function() {
        menuBtns.forEach((menuBtn) => {
                menuBtn.onclick =function() {
                        this.animate([
                            {
                                transform: 'scale(1)'   
                            },
                            {
                                transform: 'scale(0.8)'   
                            },
                            {
                                transform: 'scale(1)'   
                            }

                        ],
                        {
                            duration: 300,
                            iterations: 1
                        })
                }

        }
        )

        // changeIconRepeat.onclick = function() {
        //     this.animate({
        //         transform: 'rotate(360deg)'
        //     },
        //     {   
        //         duration: 500,
        //         iterations: 1

        //     }
        //     )

        // }

    },
    nextSongEventWhenClicked: function() {
        if(this.isRandom){
            this.playRandomSong();
            range.value = 0;
            audio.play();
        }
        else {
            this.next();
            range.value = 0;
            audio.play();

        }
     

    },
    prev : function() {
        this.songs[this.currentIndex--];
        
        if(this.currentIndex < 0) {
            this.currentIndex = this.songs.length -1;
        }
        // console.log(this.currentIndex,  this.songs.length );
        this.loadCurrentSong();
    },
    changeView : function(currentActiveSongItem){
        setTimeout(() => {
            currentActiveSongItem.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
                inline: 'center'
            });
        }, 150);
    },

    start: function() {
        this.defineProperties();
        this.render();
        this.loadConfig();
        this.getFirstImageSize();
        this.handleEvent();
        this.loadCurrentSong();
        
    }   

}

app.start();





// const ngrok = require('ngrok');
// (async function() {
//   const url = await ngrok.connect();
// })();