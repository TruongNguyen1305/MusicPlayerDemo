const $=document.querySelector.bind(document);
const $$=document.querySelectorAll.bind(document);

const PLAYER_STORAGE_KEY='F8_PLAYER';

const player=$('.player')
const cd=$('.cd');
const heading =$('header h2');
const cdThumb=$('.cd-thumb');
const audio=$('#audio');
const playBtn=$('.btn-toggle-play');
const progress=$('#progress');
const nextBtn=$('.btn-next');
const prevBtn=$('.btn-prev');
const randomBtn=$('.btn-random');
const repeatBtn=$('.btn-repeat');
const playlist=$('.playlist');

const app={
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
    songs: [
        {
            name: "Bước Qua Nhau",
            singer: "Vũ",
            path: "https://c1-ex-swe.nixcdn.com/NhacCuaTui1024/BuocQuaNhau-Vu-7120388.mp3?st=I9W59X1Odyi9QRGTehWfHg&e=1638708688",
            image: "https://avatar-nct.nixcdn.com/song/2021/11/19/6/d/9/1/1637317177185.jpg"
        },
        {
            name: "Ái Nộ",
            singer: "Masew, Khôi Vũ",
            path: "https://c1-ex-swe.nixcdn.com/NhacCuaTui1021/AiNo1-MasewKhoiVu-7078913.mp3?st=ngcoKLRyRorVu8KqUeS1wg&e=1638762705",
            image: "https://avatar-nct.nixcdn.com/song/2021/08/30/2/1/a/e/1630316309035.jpg"
        },
        {
            name: "Muộn Rồi Mà Sao Còn",
            singer: "Sơn Tùng M-TP",
            path: "https://c1-ex-swe.nixcdn.com/Believe_Audio19/MuonRoiMaSaoCon-SonTungMTP-7011803.mp3?st=tD-Ln6qGqkdH659AeuHsjQ&e=1638782546",
            image: "https://avatar-nct.nixcdn.com/song/2021/04/29/9/1/f/8/1619691182261.jpg"
        },
        {
            name: "Thức Giấc",
            singer: "Da LAB",
            path: "https://c1-ex-swe.nixcdn.com/NhacCuaTui1018/ThucGiac-DaLAB-7048212.mp3?st=1LcQhTisk8WrOQuzK4p86Q&e=1638782708",
            image: "https://avatar-nct.nixcdn.com/song/2021/07/14/8/c/f/9/1626231010810.jpg"
        },
        {
            name: "Độ Tộc 2",
            singer: "Masew, Độ Mixi, Phúc Du, Pháo",
            path: "https://c1-ex-swe.nixcdn.com/NhacCuaTui1020/DoToc2-MasewDoMixiPhucDuPhao-7064730.mp3?st=ehahZN3-iX9xYdBFgDgGcg&e=1638782785",
            image: "https://avatar-nct.nixcdn.com/song/2021/08/10/b/2/e/0/1628579601228.jpg"
        },
        {
            name: "Chúng Ta Sau Này",
            singer: "T.R.I",
            path: "https://c1-ex-swe.nixcdn.com/NhacCuaTui1010/ChungTaSauNay-TRI-6929586.mp3?st=l56Wr1fLE9fMnFehhpo5xg&e=1638782875",
            image: "https://avatar-nct.nixcdn.com/song/2021/01/27/5/2/2/b/1611738358661.jpg"
        },
        {
            name: "Dịu Dàng Em Đến",
            singer: "ERIK, NinjaZ",
            path: "https://c1-ex-swe.nixcdn.com/NhacCuaTui1021/DiuDangEmDen-ERIKNinjaZ-7078877.mp3?st=QmjyqbnGv3jClPKm4oA1YQ&e=1638782938",
            image: "https://avatar-nct.nixcdn.com/song/2021/08/30/2/1/a/e/1630307726211.jpg"
        },
        {
            name: "Hương",
            singer: "Văn Mai Hương, Negav",
            path: "https://c1-ex-swe.nixcdn.com/NhacCuaTui1010/Huong-VanMaiHuongNegav-6927340.mp3?st=PvHOWlRnF6TymvggYGding&e=1638783027",
            image: "https://avatar-nct.nixcdn.com/song/2021/01/22/9/f/2/1/1611280898757.jpg"
        },
        {
            name: "Miên Man",
            singer: "DUTZUX",
            path: "https://c1-ex-swe.nixcdn.com/NhacCuaTui1024/MienMan-DUTZUX-7120884.mp3?st=yTOFq5aH8FGEvbm-_n_KTA&e=1638783090",
            image: "https://avatar-nct.nixcdn.com/song/2021/11/19/6/d/9/1/1637320885751.jpg"
        },
        {
            name: "Có hẹn với thanh xuân",
            singer: "MONSTAR",
            path: "https://c1-ex-swe.nixcdn.com/NhacCuaTui1020/cohenvoithanhxuan-MONSTAR-7050201.mp3?st=PjrrnZ2dZ3ffA6R7dRrppQ&e=1638783161",
            image: "https://avatar-nct.nixcdn.com/song/2021/07/16/f/4/9/8/1626425507034.jpg"
        },
        {
            name: "Mình chia tay đi",
            singer: "ERIK",
            path: "https://c1-ex-swe.nixcdn.com/NhacCuaTui968/MinhChiaTayDi-ERIK-5612413.mp3?st=DJt8XOLEQY_KOJDu8zmCHA&e=1644418513&download=true",
            image: "https://avatar-ex-swe.nixcdn.com/playlist/2018/08/28/7/5/c/3/1535450323572_500.jpg"
        },
        {
            name: "Dịu dàng em đến",
            singer: "ERIK",
            path: "https://c1-ex-swe.nixcdn.com/NhacCuaTui1021/DiuDangEmDen-ERIKNinjaZ-7078877.mp3?st=HvPzqDmLolk4yk-TLQT16g&e=1644418819&download=true",
            image: "https://avatar-ex-swe.nixcdn.com/playlist/2021/09/27/7/7/5/f/1632738875136_500.jpg"
        },
        {
            name: "Yêu và yêu",
            singer: "ERIK",
            path: "https://c1-ex-swe.nixcdn.com/NhacCuaTui922/YeuVaYeuBenhVienMaOST-ERIKSt319-4398957.mp3?st=XdrmtTf6hqE-45Fp8jFUiw&e=1644419013&download=true",
            image: "https://avatar-ex-swe.nixcdn.com/song/2017/11/29/0/6/1/1/1511950731975_500.jpg"
        },
        {
            name: "Lạc nhau có phải muôn đời",
            singer: "ERIK",
            path: "https://c1-ex-swe.nixcdn.com/NhacCuaTui935/LacNhauCoPhaiMuonDoiMovieVersionChoEmDenNgayMaiOST-ERIKST319-4724804.mp3?st=HVj9jpt5pIsejA7I-ftUbA&e=1644419187&download=true",
            image: "https://avatar-ex-swe.nixcdn.com/song/2017/11/29/0/6/1/1/1511950465014_500.jpg"
        }
      ],
    setConfig: function(key, value){
        this.config[key]=value;
        localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config));
    },
    render: function(){
        const htmls=this.songs.map((song, index) => {
            return `
            <div class="song${index==this.currentIndex ? ' active' : ''}" data-index="${index}">
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
        playlist.innerHTML=htmls.join('');
    },
    defineProperties: function(){
        Object.defineProperty(this, 'currentSong', {
            get: function(){
                return this.songs[this.currentIndex];
            } 
        })
    },
    handleEvents: function(){
        const _this=this;
        const cdWidth=cd.offsetWidth;

        //Xu li CD rotate/pause
        const cdThumbAnimate=cdThumb.animate([
            // keyframes
            { transform: 'rotate(360deg)' },
        ], {
            // timing options
            duration: 10000,
            iterations: Infinity
        });

        cdThumbAnimate.pause();

        //Xu li phong to thu nho
        document.onscroll=function(){
            const scrollTop=window.scrollY || document.documentElement.scrollTop;
            const newCdWidth=cdWidth-scrollTop;

            cd.style.width=newCdWidth>0 ? newCdWidth + 'px' : 0;
            cd.style.opacity=newCdWidth/cdWidth;
        }

        //Xu li nut play
        playBtn.onclick=function(){
            if(_this.isPlaying){
                audio.pause();
            }
            else{
                audio.play();
            }
        }

        //Khi bai hat dc play
        audio.onplay=function(){
            _this.isPlaying=true;
            player.classList.add('playing');
            cdThumbAnimate.play();
        }

        //Khi song dang pause
        audio.onpause=function(){
            _this.isPlaying=false;
            player.classList.remove('playing');
            cdThumbAnimate.pause();
        }

        //Khi tien do bai hat thay doi
        audio.ontimeupdate=function(){
            if(audio.duration){
                const progressPercent=Math.floor(audio.currentTime / audio.duration * 100);
                progress.value=progressPercent;
            }
        }

        //Xu li khi tua
        progress.oninput=function(e){
            audio.currentTime=audio.duration*(e.target.value)/100;
        }

        //Khi next song
        nextBtn.onclick=function(){
            if(_this.isRandom){
                _this.playRandom();
            }
            else{
                _this.nextSong();
            }
            audio.play();
        }

        //Khi prev song
        prevBtn.onclick=function(){
            if(_this.isRandom){
                _this.playRandom();
            }
            else{
                _this.prevSong();
            }
            audio.play();
        }

        //Khi random song bat/tat
        randomBtn.onclick=function(e){
            _this.isRandom= !_this.isRandom;
            _this.setConfig('isRandom', _this.isRandom);
            randomBtn.classList.toggle('active', _this.isRandom);
        }

        //xu li phat lai mot bai
        repeatBtn.onclick=function(){
            _this.isRepeat=!_this.isRepeat;
            _this.setConfig('isRepeat', _this.isRepeat);
            repeatBtn.classList.toggle('active', _this.isRepeat);
        }

        //Xu li next song khi song ended
        audio.onended=function(){
            if(_this.isRepeat){
                audio.play();
            }
            else{
                nextBtn.click();
            }
        }

        playlist.onclick=function(e){
            //Xu li khi click vao song
            const song=e.target.closest('.song:not(.active)');
            if(song || e.target.closest('.option')){
                if(e.target.closest('.option')){

                }
                else{
                    _this.currentIndex=Number(song.dataset.index);
                    _this.loadCurrentSong();
                    _this.render();
                    audio.play();
                }
            }
        }
    },
    loadCurrentSong: function(){
        heading.textContent=this.currentSong.name;
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`
        audio.src=this.currentSong.path;
    },
    loadConfig: function(){
        if(this.config.isRandom){
            this.isRandom=this.config.isRandom;
        }
        if(this.config.isRepeat){
            this.isRepeat=this.config.isRepeat;
        }
        randomBtn.classList.toggle('active', this.isRandom);
        repeatBtn.classList.toggle('active', this.isRepeat);
    },
    scrollToActiveSong: function(){
        setTimeout(()=>{
            $('.song.active').scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            }); //truot toi song active
        },500)
    },
    nextSong: function(){
        this.currentIndex++;
        if(this.currentIndex>=this.songs.length){
            this.currentIndex=0;
        }
        this.loadCurrentSong();
        this.render();
        this.scrollToActiveSong();
    },
    prevSong: function(){
        this.currentIndex--;
        if(this.currentIndex<0){
            this.currentIndex=this.songs.length-1;
        }
        this.loadCurrentSong();
        this.render();
        this.scrollToActiveSong();
    },
    playRandom: function(){
        const oldIndex=this.currentIndex;
        do{
            this.currentIndex=Math.floor(Math.random() * this.songs.length)
        }
        while(oldIndex == this.currentIndex)
        this.loadCurrentSong();
        this.render();
        this.scrollToActiveSong();
    },
    start: function(){
        //Load config
        this.loadConfig();

        //Dinh nghia cac thuoc tinh
        this.defineProperties();

        //Lang nghe cac su kien
        this.handleEvents();

        //Load bai hat hien tai
        this.loadCurrentSong()

        //render playlist
        this.render();
    }
}

app.start();