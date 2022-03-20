const $ =document.querySelector.bind(document)
const $$ =document.querySelectorAll.bind(document)
const PLAYER_STORAGE_KEY ='MINH_QUAN'

const heading = $('header h2')
const cdThumb = $('.cd-thumb')
const audio = $('#audio')
const cd = $('.cd')
const playBtn = $('.btn-toggle-play')
const player = $('.player')
const progress = $('#progress')
const nextBtn = $('.btn-next')
const prevBtn = $('.btn-prev')
const randomBtn = $('.btn-random')
const repeatBtn = $('.btn-repeat')
const playlist = $('.playlist')

const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom:false,
    isRepeat:false,
    config: JSON.parse(localStorage.getItem('PLAYER_STORAGE_KEY')) || {},
    songs : [
        {
            name: 'Dịu Dàng Em Đến Remix',
            singer: 'Erik',
            path: './assets/songs/Dịu Dàng Em Đến  ERIKCukak Remix.mp3',
            image: './assets/img/diudangngayemden.jpg'
        },
        {
            name: 'I Love You So',
            singer: 'The Walters',
            path: './assets/songs/I Love You So .mp3',
            image: './assets/img/0.jpg'
        },
        {
            name: 'Build a B*tch',
            singer: ' Bella Poarch',
            path: './assets/songs/y2mate.com - Build a Btch  Bella Poarch Lyrics  Vietsub .mp3',
            image: './assets/img/buildabitch.jpg'
        },
        {
            name: ' Cưới Thôi',
            singer: 'Masew x Masiu x B Ray x TAP',
            path: './assets/songs/y2mate.com - Cưới Thôi  Masew x Masiu x B Ray x TAP  Lyrics Audio .mp3',
            image: './assets/img/cuoithoi.jpg'
        },
        {
            name: 'MONTERO (Call Me By Your Name) ',
            singer: 'Lil Nas',
            path: './assets/songs/y2mate.com - Lil Nas X  MONTERO Call Me By Your Name Lyrics.mp3',
            image: './assets/img/montero.jpg'
        },
        {
            name: ' At My Worst Remix',
            singer: 'Pink Sweat',
            path: './assets/songs/y2mate.com - Pink Sweat  At My Worst Remix Lyrics Ft Kehlani.mp3',
            image: './assets/img/atmyworst.jpg'
        },
        {
            name: 'Tát Nước Đầu Đình',
            singer: 'Lynk Lee ft Binz',
            path: './assets/songs/y2mate.com - Tát Nước Đầu Đình  Lynk Lee ftBinz Cowvy Mix.mp3',
            image: './assets/img/tatnuocdaudinh.jpg'
        },
        {
            name: ' Tâm Sự Tuổi 30',
            singer: 'Trịnh Thăng Bình',
            path: './assets/songs/y2mate.com - TÂM SỰ TUỔI 30  TRỊNH THĂNG BÌNH  OST ÔNG NGOẠI TUỔI 30.mp3',
            image: './assets/img/tamuuoi30.jpg'
        },
        {
            name: ' Tell Ur Mom II',
            singer: 'Winno ft Heily',
            path: './assets/songs/y2mate.com - Tell Ur Mom II  Winno ft HeilyCukak Remix Audio Lyrics Video.mp3',
            image: './assets/img/tell.jpg'
        },
        {
            name: 'Mẹ',
            singer: 'Trung Tự',
            path: './assets/songs/y2mate.com - Trung Tự  Mẹ  Xa Nhà  BFF Remix Lofi Ver    Dự Án Lofi 02 .mp3',
            image: './assets/img/me.jpg'
        },
        {
            name: 'Vũ hội hoá trang',
            singer: ' Ngận Mỹ Vị',
            path: './assets/songs/y2mate.com - Vietsub Vũ hội hoá trang  Ngận Mỹ Vị   假面舞会  很美味.mp3',
            image: './assets/img/vuhoihoatrang.jpg'
        },
        {
            name: 'Ai Đưa Em Về Remix',
            singer: 'Tia ft Lê Thiện Hiếu, Cukak ',
            path: './assets/songs/y2mate.com - Ai Đưa Em Về  Tia ft Lê Thiện HiếuCukak Remix Audio Lyrics Video.mp3',
            image: './assets/img/aiduaemve.jpg'
        },
        {
            name: 'Tiệc Trà Sao灰澈',
            singer: '星茶会',
            path: './assets/songs/y2mate.com - 星茶会  Tiệc Trà Sao灰澈  Nhạc Douyin.mp3',
            image: './assets/img/tiệctrasao.jpg'
        },
        {
            name: 'Em Là Hoàng Hôn Remix',
            singer: 'Vang x CLoud 5',
            path: './assets/songs/y2mate.com - Em Là Hoàng Hôn Frexs Remix  Vang x CLoud 5  Má Của Em Tựa Hồng Cành Thắm Remix.mp3',
            image: './assets/img/emlahoanghon.jpg'
        },
        {
            name: 'Như Một Người Dưng Remix ',
            singer: 'Nguyễn Thạc Bảo Ngọc',
            path: './assets/songs/y2mate.com - Như Một Người Dưng Remix  từng ngày em vẫn bên anh thế nhưng anh vương vấn điều gì Hot TikTok 2021.mp3',
            image: './assets/img/nhumotnguoidung.jpg'
        },
        {
            name: 'Teen Vọng Cổ Remix TikTok',
            singer: 'Umie x Teddy x meChill',
            path: './assets/songs/y2mate.com - Teen Vọng Cổ Remix TikTok Umie x Teddy x meChill.mp3',
            image: './assets/img/teenvongco.jpg'
        },
        {
            name: 'Không Bằng Remix ',
            singer: 'Na - RIN Music',
            path: './assets/songs/y2mate.com - Nói Với Em Một Lời Trước Khi Xa Rời  Không Bằng RIN Music Remix  Na.mp3',
            image: './assets/img/khongbang.jpg'
        },
        {
            name: 'Mắt Nice Cha Cha Tune ',
            singer: ' Ssahita ft Duy LionCukak Remix',
            path: './assets/songs/y2mate.com - Mắt Nice Cha Cha Tune  Ssahita ft Duy LionCukak Remix Audio Lyrics Video.mp3',
            image: './assets/img/matnai.jpg'
        },
        {
            name: ' Phượng Buồn',
            singer: 'H2K x Sli Petey',
            path: './assets/songs/y2mate.com - Phượng Buồn  H2K x Sli Petey by H2K  VN MIXCLOUD.mp3',
            image: './assets/img/phuongbuon.jpg'
        },
            ],
    setConfig: function (key, value) {
        this.config[key] = value;
        localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config))
    },
    render: function () {
        const htmls = this.songs.map((song, index) => {
            return `
            <div class="song ${index === this.currentIndex ? 'active' : ''}" data-index="${index}">
                <div class="thumb" style="background-image: url('${song.image}')">
                </div>
                <div class="body">
                    <h3 class="title">${song.name}</h3>
                    <p class="author">${song.singer}</p>
                </div>
                <div class="option">
                    <i class="fas fa-ellipsis-h"></i>
                </div>
            </div>
            `
        })
        $('.playlist').innerHTML = htmls.join('')
    },
    defineProperties:function () {
        Object.defineProperty(this, 'currentSong',{
            get: function () {
                return this.songs[this.currentIndex]
            }
        })
    },
    handleEvents: function () {
        const _this = this
        const cdWidth = cd.offsetWidth

        //Xử lý CD quay / dừng
        const cdThumbAnimate = cdThumb.animate([
            {transform: 'rotate(360deg)'}
        ],{
            duration: 10000, //10s
            iterations: Infinity
        })
        cdThumbAnimate.pause()

        //Xử lý phóng to / thu nhỏ CD 
        document.onscroll = function () {
            const scrollTop = window.scrollY
            const newCdWidth = cdWidth - scrollTop

            cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0
            cd.style.opacity = newCdWidth / cdWidth

        }

        //Xử lý khi click play 
        playBtn.onclick = function() {
            if(_this.isPlaying) {
                audio.pause()
            }else{
                audio.play()
            }
        }

        //Khi song play
        audio.onplay = function () {
            _this.isPlaying = true
            player.classList.add('playing')
            cdThumbAnimate.play()
        }

        //Khi song pause
        audio.onpause = function () {
            _this.isPlaying = false
            player.classList.remove('playing')
            cdThumbAnimate.pause()
        }

        //Khi tiến độ bài hát thay đổi
        audio.ontimeupdate = function () {
            if(audio.duration){
                const progressPercent = Math.floor(audio.currentTime / audio.duration *100)
                progress.value = progressPercent
            }
        }

        //Khi tua song 
        progress.onchange = function (e) {
            const seekTime = audio.duration / 100 * e.target.value
            audio.currentTime = seekTime
        }

        //Khi next song 
        nextBtn.onclick = function () {
            if (_this.isRandom) {
                _this.playRandomSong()
            } else {
                _this.nextSong()
            }
            audio.play()
            _this.render()
            _this.scrollToActiveSong()
        }
        //Khi prev song 
        prevBtn.onclick = function () {
            if (_this.isRandom) {
                _this.playRandomSong()
            } else {
                _this.prevSong()
            }
            audio.play()
            _this.render()
            _this.scrollToActiveSong()
        }
        //Khi random bài hát
        randomBtn.onclick = function () {
            _this.isRandom = !_this.isRandom
            _this.setConfig('isRandom', _this.isRandom)
            randomBtn.classList.toggle('active', _this.isRandom)
        }

        //Phát lại 1 bài hát 
        repeatBtn.onclick = function () {
            _this.isRepeat = !_this.isRepeat
            _this.setConfig('isRepeat', _this.isRepeat)
            repeatBtn.classList.toggle('active', _this.isRepeat)
        }

        //Xử lý next song song khi audio ended
        audio.onended = function () {
            if (_this.isRepeat){
                audio.play()
            } else {
                nextBtn.click()
            }
        }
        //Lắng nghe hành vi click vào play list
        playlist.onclick = function (e) {
            const songNode = e.target.closest('.song:not(.active)') 
            if(songNode || e.target.closest('.option')) {
                //Xử lý khi click vào song
                 {if (songNode) {
                    _this.currentIndex = Number(songNode.dataset.index)
                    _this.loadCurrentSong()
                    audio.play()
                    _this.render()
                }
                }
                //Xử lý khi click vào option
                if(e.target.closest('.option')){

                }
            }
        }
    },
    scrollToActiveSong: function () {
        if(this.currentIndex === 0){
            document.documentElement.scrollTop = 0
        }
        setTimeout(() =>{
            $('.song.active').scrollIntoView({
                behavior: 'smooth',
                block:'nearest',
            })
        },0)
    },
    loadCurrentSong: function () {
        heading.textContent = this.currentSong.name
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`
        audio.src = this.currentSong.path

        console.log(heading, cdThumb, audio)

    },
    loadConfig: function () {
        this.isRandom = this.config.isRandom
        this.isRepeat = this.config.isRepeat
    },
    nextSong: function () {
        this.currentIndex++
        if(this.currentIndex >= this.songs.length ) {
            this.currentIndex = 0
        }
        this.loadCurrentSong()
    },
    prevSong: function () {
        this.currentIndex--
        if(this.currentIndex < 0) {
            this.currentIndex = this.songs.length - 1
        }
        this.loadCurrentSong()
    },
    playRandomSong: function () {
        let newIndex
        do {
            newIndex = Math.floor(Math.random() * this.songs.length)
        } while(newIndex === this.currentIndex)

        this.currentIndex = newIndex
        this.loadCurrentSong()
    },
    start: function () {
        //Gán cấu hình từ cònfig vào app
        // this.loadConfig()

        //Định nghĩa các thuộc tính cho object
        this.defineProperties()

        //Lắng nghe xử lý các sự kiện (DOM event)
        this.handleEvents()


        //Tải thông tin bài hát đầu tiên vào UI khi chạy ứng dụng
        this.loadCurrentSong()

        //Render playlist
        this.render()

        //Hiển thị trạng thái ban đầu của button repeat và ban đầu 
        randomBtn.classList.toggle('active', _this.isRandom)
        repeatBtn.classList.toggle('active', _this.isRepeat)
    }        
}
app.start()

