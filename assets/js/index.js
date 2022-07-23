$ = document.querySelector.bind(document);
$$ = document.querySelectorAll.bind(document);




const musicMenuHeight = $('.music-menu').clientHeight ; 

const songs = $$('.song-item');
const songNames = $$('.s-song-name');
const songSingers = $$('.s-song-singer');

// song click

    songs.forEach(function(song, index) {
        songName = songNames[index];
        // songSinger = songSingers[index];
 

        song.onclick = function(){
            const songActive = $('.song-item.song_active');
            

            songActive.classList.remove('song_active');
            
            this.classList.add('song_active');

        } 

    })

// css để cách list music với menu
var playListFix = $('.play-list');

    Object.assign(playListFix.style, {
        position : 'relative',
        top: musicMenuHeight + 10 + 'px',

    })


//app function
        const heading = $('.music-menu .song_name');
        const currentSongImage = $('.song_img');
        const audio = $('#audio');
        const playBtn = $('.play-icon'); 
        const pauseBtn = $('.pause-icon');
        const range = $('.range');
        const nextBtn = $('#next');
        const prevBtn = $('#prev');
        const repeatBtn = $('.repeat');
        const randomBtn = $('.random');

        

const app = {
    currentIndex: 0,
    // isplaying : false,
    isRandom : false,
    isRepeat : false,
    songs: [
        {
            name: 'Yêu em hơn mỗi ngày',
            singer: 'Andiez',
            path: './assets/songs/Yêu Em Hơn Mỗi Ngày - Andiez - Official MV.mp3',
            image: './assets/img/song/Yêu em hơn mỗi ngày.jpg'
        },
        {
            name: 'Buồn thì cứ khóc đi',
            singer: 'Lynk Lee',
            path: './assets/songs/Buồn Thì Cứ Khóc Đi - Lynk Lee - Official MV.mp3',
            image: './assets/img/song/buồn thì cứ khóc.jpeg'
        },
        {
            name: 'Kẻ Theo Đuổi Ánh Sáng',
            singer: 'Huy Vạc x Tiến Nguyễn',
            path: './assets/songs/Kẻ Theo Đuổi Ánh Sáng - Huy Vạc x Tiến Nguyễn (Official MV).mp3',
            image: './assets/img/song/Kể theo đuổi ánh sáng.jpg'
        },
        {
            name: 'Miền an nhiên',
            singer: 'Phạm Minh Thành',
            path: './assets/songs/Miền an nhiên -Lyrics- - Phạm Minh Thành.mp3',
            image: './assets/img/song/Miền an nhiên.jpeg'
        },
        {
            name: 'Răng Khôn',
            singer: 'PHÍ PHƯƠNG ANH',
            path: './assets/songs/PHÍ PHƯƠNG ANH ft. RIN9 - Răng Khôn - Official Music Video.mp3',
            image: './assets/img/song/Răng khôn.jpeg'
        },
        {
            name: 'Bông hoa đẹp nhất',
            singer: 'QUÂN A.P',
            path: './assets/songs/QUÂN A.P - BÔNG HOA ĐẸP NHẤT - OFFICIAL MUSIC VIDEO.mp3',
            image: './assets/img/song/Bông hoa đẹp nhất.jpeg'
        },
        {
            name: 'Quên đặt tên',
            singer: 'Phạm Nguyên Ngọc',
            path: './assets/songs/QUÊN ĐẶT TÊN - Phạm Nguyên Ngọc (OFFICIAL MV).mp3',
            image: './assets/img/song/Quên đặt tên.jpeg'
        },
        {
            name: 'Nghe Như Tình Yêu',
            singer: 'HIEUTHUHAI',
            path: './assets/songs/HIEUTHUHAI - Nghe Như Tình Yêu (prod. by Kewtiie) [Official Lyric Video].mp3',
            image: './assets/img/song/Nghe như tình yêu.jpeg'
        },
        {
            name: 'LỜI ĐƯỜNG MẬT',
            singer: 'HIEUTHUHAI',
            path: './assets/songs/LỜI ĐƯỜNG MẬT - LYLY ft HIEUTHUHAI (Official Music Video).mp3',
            image: './assets/img/song/Lời đường mật.jpeg'
        },


    ],

    render: function() {
        const htmls = this.songs.map(function(song) {
            return `
            <div class="song-item ">
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

        $('.play-list').innerHTML = htmls.join('');
    },
    handleEvent: function() {
        const songImage = $('.song_img-wrap');
        const songImageHeight = songImage.clientHeight;
        const _this = this;

        // song image rotate

        const currentSongImageRotate = currentSongImage.animate({
            transform: 'rotate(360deg)'
        },
        {
            duration: 10000,
            iterations: Infinity
        })
        currentSongImageRotate.pause();
        // change song image size when scrolling
        document.onscroll = function() {
            
            const scrollY = window.scrollY || document.documentElement.scrollTop;
            const newHeight = songImageHeight - scrollY ;

            songImage.style.height = newHeight > 0 ? newHeight + 'px' : 0 ;
            songImage.style.opacity = newHeight/songImageHeight;
        }

        // check playing

        const playBtnActive = $('.play-icon.play_active');
        playBtn.onclick = () => {
            audio.play();
        }

        pauseBtn.onclick = () => {
            audio.pause();
        }

        //  change playing pausing icon

        audio.onplay = function() {
            playBtn.style.display = 'none';
            pauseBtn.style.display = 'block';
            currentSongImageRotate.play();
           
        }

        audio.onpause = function() {
            playBtn.style.display = 'block';
            pauseBtn.style.display = 'none';
            currentSongImageRotate.pause();
        }

        // range move following the playing music
        
        percentChange = function() {
            if(audio.duration){
                const currentPercent = Math.floor(audio.currentTime/audio.duration*100);  
                
                if(range.value != currentPercent){
                    range.value = currentPercent;
                    // console.log(range.value);
                }        
                
            }
        } 
        // change range 

        audio.ontimeupdate = function() {
            percentChange();
        }


        
        range.onchange = function(e) {
               
            audio.currentTime = e.target.value * audio.duration / 100;
            
        }
        // on phone 

        range.ontouchstart = function () {
            range.ontouchend = function (e) {
                console.log(e.target.value);
            }
           
            
        }

        range.ontouchmove = function () {
            audio.pause();
            range.onchange = function() {
               
                audio.currentTime = this.value * audio.duration / 100;
                // console.log(audio.currentTime);
            }
            range.ontouchend = function (){
                audio.play();
    
            }
            
        }

        //  click next button


        nextBtn.onclick = function() {
            _this.nextSongEventWhenClicked();
        }
        //  click prev button
        prevBtn.onclick = function(e) {

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

           
        }
        
        //  click random btn

        randomBtn.onclick = function() {
            
            this.classList.toggle('active');
            _this.isRandom = this.classList.contains('active');

        }

        
        //  click repeat btn

        repeatBtn.onclick = function() {
            this.classList.toggle('active');
            _this.isRepeat = this.classList.contains('active');
        }

        //  when audio end
        audio.onended = function() {
            if(_this.isRepeat) {
                _this.loadCurrentSong();
                this.play();
            }
            else {
                _this.nextSongEventWhenClicked();
            }
            
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

    repeatCurrentSong : function() {

    },
    loadCurrentSong: function() {
        heading.textContent = this.currentSong.name;
        currentSongImage.src = this.currentSong.image;
        audio.src = this.currentSong.path;
    },
    next: function() {
        this.songs[this.currentIndex++];
        
        if(this.currentIndex > this.songs.length -1) {
            this.currentIndex = 0;
        }

        // console.log(this.currentIndex,  this.songs.length );
        this.loadCurrentSong();

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

        console.log(this.currentIndex,  this.songs.length );
        this.loadCurrentSong();
    },

    start: function() {
    
        this.defineProperties();
        this.handleEvent();
        this.render();
        this.loadCurrentSong();
    }

}

app.start();

