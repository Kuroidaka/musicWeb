$ = document.querySelector.bind(document);
$$ = document.querySelectorAll.bind(document);




let musicMenuHeight = $('.music-menu').clientHeight ; 




// css để cách list music với menu
var playListFix = $('.play-list');
var playListWrapFix = $('.play-list-wrap');


    // Object.assign(playListFix.style, {
    //     position : 'relative',
    //     top: musicMenuHeight + 10 + 'px',

    // })
    // console.log(musicMenuHeight);

//app function
        const heading = $('.music-menu .song_name');
        // const currentSongImage = $('.song_img');
        const currentSongImage = $('.song_img-wrap');
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
        const entireBackgroundImage = $('.entire-background-img');
        const entireBackgroundImageWrap = $('.entire-background-img-wrap');
        
        
        const rangeInputs = $$('input[type="range"]')

        const PLAYER_STORAGE_KEY = 'WEB_PLAYER';

const app = {
    currentIndex: 0,
    // isplaying : false,
    isRandom : false,
    isRepeat : false,
    config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
    songs: [
        {
            name: 'Perfect ',
            singer: 'Ed Sheeran',
            path: './assets/songs/Vietsub - Perfect - Ed Sheeran - Lyrics Video.mp3',
            image: '/assets/img/song/Ed_Sheeran_Perfect_Music_Video-262499921-large.jpeg'
        },
        {
            name: 'Yêu em hơn mỗi ngày',
            singer: 'Andiez',
            path: './assets/songs/Yêu Em Hơn Mỗi Ngày - Andiez - Official MV.mp3',
            image: '/assets/img/song/Yêu em hơn mỗi ngày.jpg'
        },
        {
            name: 'Buồn thì cứ khóc đi',
            singer: 'Lynk Lee',
            path: './assets/songs/Buồn Thì Cứ Khóc Đi - Lynk Lee - Official MV.mp3',
            image: '/assets/img/song/buồn thì cứ khóc.jpeg'
        },
        {
            name: 'Kẻ Theo Đuổi Ánh Sáng',
            singer: 'Huy Vạc x Tiến Nguyễn',
            path: './assets/songs/Kẻ Theo Đuổi Ánh Sáng - Huy Vạc x Tiến Nguyễn (Official MV).mp3',
            image: '/assets/img/song/Kể theo đuổi ánh sáng.jpg'
        },
        {
            name: 'Miền an nhiên',
            singer: 'Phạm Minh Thành',
            path: './assets/songs/Miền an nhiên -Lyrics- - Phạm Minh Thành.mp3',
            image: '/assets/img/song/Miền an nhiên.jpeg'
        },
        {
            name: 'Răng Khôn',
            singer: 'PHÍ PHƯƠNG ANH',
            path: './assets/songs/PHÍ PHƯƠNG ANH ft. RIN9 - Răng Khôn - Official Music Video.mp3',
            image: '/assets/img/song/Răng khôn.jpeg'
        },
        {
            name: 'Bông hoa đẹp nhất',
            singer: 'QUÂN A.P',
            path: './assets/songs/QUÂN A.P - BÔNG HOA ĐẸP NHẤT - OFFICIAL MUSIC VIDEO.mp3',
            image: '/assets/img/song/Bông hoa đẹp nhất.jpeg'
        },
        {
            name: 'Quên đặt tên',
            singer: 'Phạm Nguyên Ngọc',
            path: './assets/songs/QUÊN ĐẶT TÊN - Phạm Nguyên Ngọc (OFFICIAL MV).mp3',
            image: '/assets/img/song/Quên đặt tên.jpeg'
        },
        {
            name: 'Nghe Như Tình Yêu',
            singer: 'HIEUTHUHAI',
            path: './assets/songs/HIEUTHUHAI - Nghe Như Tình Yêu (prod. by Kewtiie) [Official Lyric Video].mp3',
            image: '/assets/img/song/Nghe như tình yêu.jpeg'
        },
        {
            name: 'LỜI ĐƯỜNG MẬT',
            singer: 'HIEUTHUHAI',
            path: './assets/songs/LỜI ĐƯỜNG MẬT - LYLY ft HIEUTHUHAI (Official Music Video).mp3',
            image: '/assets/img/song/Lời đường mật.jpeg'
        },
        {
            name: 'Xem Như Tôi Từng Cưới Được Cô Ấy',
            singer: 'Mạc Khiếu Tỷ Tỷ',
            path: './assets/songs/[Vietsub] Xem Như Tôi Từng Cưới Được Cô Ấy - Mạc Khiếu Tỷ Tỷ - 当我娶过她 - 莫叫姐姐.mp3',
            image: '/assets/img/song/coi như tôi cưới cô ấy.jpeg'
        },


    ],
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
        const _this = this;
        const currentSongItems = $$('.song-item');
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
        playBtn.onclick = function() { 
                audio.play();    
                this.animate([
                    {
                        transform: 'scale(1)'   
                    },
                    {
                        transform: 'scale(1.3)'   
                    },
                    {
                        transform: 'scale(1)'   
                    }

                ],
                {
                    duration: 500,
                    iterations: 1
                })
        }

        pauseBtn.onclick = function() {
            audio.pause();
            this.animate([
                {
                    transform: 'scale(1)'   
                },
                {
                    transform: 'scale(1.3)'   
                },
                {
                    transform: 'scale(1)'   
                }

            ],
            {
                duration: 500,
                iterations: 1
            })
        }

        this.menuIconchange();
        //  change playing pausing icon

        audio.onplay = function() {
            playBtn.style.display = 'none';
            pauseBtn.style.display = 'block';
            currentSongImageRotate.play();

            // currentSongImage.classList.remove('active');
            
            // console.log(currentSongImageRotate.style.transform);
           
        }

        audio.onpause = function() {
            playBtn.style.display = 'block';
            pauseBtn.style.display = 'none';
            currentSongImageRotate.pause();
        }

        // range move following the playing music
        
        percentChange = function() {
            // console.log(range.value);
            if(audio.duration){
                const currentPercent = audio.currentTime/audio.duration*100;  
                    range.value = currentPercent;
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

        
        activeCurrentSong =  function(activeIndex) {
          
            currentSongItems[activeIndex].classList.remove('active');
            currentSongItems[_this.currentIndex].classList.add('active');
            
        }

        changeView = function(currentActiveSongItem){
            setTimeout(() => {
                currentActiveSongItem.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center',
                    inline: 'center'
                });
            }, 150);
        }
        
        
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
            activeCurrentSong(activeIndex);
            changeView(currentSongItems[_this.currentIndex]);
    
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
            activeCurrentSong(activeIndex);
            changeView(currentSongItems[_this.currentIndex]);
        }
        
        // click on song        
        currentSongItems.forEach(function(currentSongItem, index) {

            currentSongItem.onclick = function() {
                range.value = 0;
                var activeIndex = _this.currentIndex;
                currentActiveSongItem = $('.song-item.active');
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
            this.style.opacity = '1';
            // if(!_this.isRandom){
            //     this.style.opacity = '0.5';

            // }

            _this.setConfig('isRandom', _this.isRandom);
        }

        
        //  click repeat btn

        repeatBtn.onclick = function() {
            this.classList.toggle('active');
            _this.isRepeat = this.classList.contains('active');
            this.style.opacity = '1';
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

            activeCurrentSong(activeIndex);
            changeView(currentSongItems[_this.currentIndex]);

            
        }

        // when input range
       
        
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
        heading.textContent = this.currentSong.name;
        currentSongImage.style.backgroundImage = `url("${this.currentSong.image}")`;
        entireBackgroundImage.style.backgroundImage = `url("${this.currentSong.image}")`;
        entireBackgroundImageWrap.style.backgroundImage = `url("${this.currentSong.image}")`;
        console.log(this.currentSong.image,currentSongImage);
        audio.src = this.currentSong.path;
    },
    loadConfig: function() {
        this.isRandom = this.config.isRandom;
        this.isRepeat = this.config.isRepeat;
        if(this.isRandom){
            randomBtn.classList.toggle('active');
            randomBtn.style.opacity = '1';
            // if(!this.isRandom){
            //     randomBtn.style.opacity = '0.5';
            // }
        }

        if(this.isRepeat){
            repeatBtn.classList.toggle('active');
            repeatBtn.style.opacity = '1';
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
                            transform: 'scale(1.3)'   
                        },
                        {
                            transform: 'scale(1)'   
                        }

                    ],
                    {
                        duration: 500,
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
    checkCurrentSong: function(){
    
            const currentSongItems = $$('.song-item');
            currentSongItems[0].classList.add('active');
            

       
    },

    start: function() {
        this.defineProperties();
        this.loadCurrentSong();
        this.render();
        this.checkCurrentSong();
        this.loadConfig();
        this.handleEvent();
  

    }   

}

app.start();





