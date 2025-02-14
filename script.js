    document.getElementById("songBlock").style.top = "400px";
    document.getElementById("songBlock").style.opacity = "0";
 
    document.addEventListener("DOMContentLoaded", () => {
        let currentIndex = 0;
        const cards = document.querySelectorAll(".card");
        const nextBtn = document.getElementById("nextBtn");
        const prevBtn = document.getElementById("prevBtn");
        const openBtns = document.querySelectorAll(".openBtn");
        const closeBtns = document.querySelectorAll(".closeBtn");
        const songText = document.getElementById("songText");
        const songImage = document.getElementById("songImage");


        const songs = [
            { 
                src: "Cavetown - My Love Mine All Mine (Mitski Cover).mp3", 
                startTime: 35,
                lyrics: [
                    { time: 35, text: "So when I die, which I must do" },
                    { time: 38, text: "Could it shine down here with you?" },
                    { time: 43, text: "'Cause my love is mine, all mine" },
                    { time: 47, text: "I love, my, my, mine" },
                    { time: 53, text: "Nothing in the world belongs to me" },
                    { time: 57, text: "But my love, mine, all mine, all mine" },
                    { time: 82, text: "My baby here on Earth" },
                    { time: 86, text: "Showed me what my heart was worth" },
                    { time: 89, text: "So when it comes to be my turn" },
                    { time: 100, text: "'Cause my love is mine, all mine" },
                    { time: 103, text: "I love, my, my, mine" },
                    { time: 107, text: "Nothing in the world belongs to me" }
                ],
                images: ["img/img1.jpg", "img/img2.jpg", "img/img3.jpg", "img/img4.jpg", "img/img5.jpg"]
            },
            { 
                src: "Айскрин - Между нами километры.mp3", 
                startTime: 15,
                lyrics: [
                    { time: 15, text: "Забей на километры и сколько бы их не было" },
                    { time: 19, text: "Доверил своё сердце и ты в ответ поверила" },
                    { time: 22, text: "Хватило трёх секунд, чтоб успеть в тебя влюбиться мне" },
                    { time: 25, text: "Хватило трёх секунд,чтоб полюбить твои ресницы, но." },
                    { time: 30, text: "Ты не любишь запах сигарет" },
                    { time: 32, text: "Запах на одежде." },
                    { time: 33, text: "Всё что от тебя осталось мне" },
                    { time: 35, text: "О нас мы никому не скажем," },
                    { time: 37, text: "Сохраним секрет." }
                ],
                images: ["img/img6.jpg", "img/img5.jpg", "img/img4.jpg", "img/img3.jpg", "img/img2.jpg"]
            }
        ];


        let audio = new Audio(songs[0].src);
        audio.currentTime = songs[0].startTime;
        audio.loop = true;
        
        let currentSongIndex = 0; // 0 - первая песня, 1 - вторая





        const cardTexts = [
            ["You're my everything ❤️", "Forever together 💕"],
            ["My heart is only yours 💖", "You will always be mine, only mine💕"],
            ["I love you sooo much! ❤️", "You're my sunshine ☀️", "Always in my heart 💗"],
            ["Ты – мое всё ❤️", " ты и есть личный сорт моей слабости💕", "Ты самое лучшее, что у меня есть, моя маленькая принцесса ❤️", "Мое сердце принадлежит только тебе 💖", "Я так сильно тебя люблю! ❤️", "Ты – мое солнышко ☀️", "Всегда в моем сердце 💗"]
        ];


        function showCard(index) {
            cards.forEach((card, i) => {
                card.classList.toggle("active", i === index);
            });
        }
        function updateSongText() {
            const song = songs[currentSongIndex]; 
            let currentTime = audio.currentTime;
        
            console.log(`🕒 Время: ${currentTime}, Песня: ${currentSongIndex}`);
        
            let lyricIndex = song.lyrics.findIndex((line, index) => {
                return index === song.lyrics.length - 1 || (currentTime >= line.time && currentTime < song.lyrics[index + 1].time);
            });
        
            if (lyricIndex !== -1) {
                console.log(`🎤 Новый текст: ${song.lyrics[lyricIndex].text}`);
        
                songText.classList.add("fade-out");
                songImage.classList.add("fade-out");
        
                setTimeout(() => {
                    songText.textContent = song.lyrics[lyricIndex].text;
                    songImage.src = song.images[lyricIndex % song.images.length];
        
                    songText.classList.remove("fade-out");
                    songImage.classList.remove("fade-out");
                    songText.classList.add("fade-in");
                    songImage.classList.add("fade-in");
                }, 300);
            }
        }
        
        
        
        
        
        audio.addEventListener("timeupdate", updateSongText);


        nextBtn.addEventListener("click", () => {
            if (currentIndex < cards.length - 1) {
                currentIndex++;
                showCard(currentIndex);
            }
        });

        prevBtn.addEventListener("click", () => {
            if (currentIndex > 0) {
                currentIndex--;
                showCard(currentIndex);
            }
        });

        openBtns.forEach((btn, i) => {
            btn.addEventListener("click", () => {
                console.log(`📖 Открытие карточки ${i}`);
        
                const wrapper = cards[i].querySelector(".wrapper");
                wrapper.classList.add("open");
                btn.style.display = "none";
                closeBtns[i].style.display = "inline-block";
                songBlock.style.opacity = "1";
        
                if (i === 3) { // Если открыли 4-ю карточку
                    let confirmSwitch = confirm("Песня будет переключена. Продолжить?");
                    if (!confirmSwitch) return;
                    if (currentSongIndex !== 1) { // Если не играет вторая песня, переключаем
                        switchSong(1);
                    }
                } else {
                    if (audio.paused) {
                        audio.play();
                    }
                }
        
                spawnHearts();
                startTextAnimation(i);
            });
        });
        

        closeBtns.forEach((btn, i) => {
            btn.addEventListener("click", () => {
                const wrapper = cards[i].querySelector(".wrapper");
                wrapper.classList.remove("open");
                btn.style.display = "none";
                openBtns[i].style.display = "inline-block";
                audio.pause();
                if (i === 3) {
                    switchSong(0);
                }
            });
        });

        function switchSong(index) {
            console.log(`🎵 Переключение на песню ${index}`);
        
            audio.pause();
            audio = new Audio(songs[index].src);
            audio.currentTime = songs[index].startTime;
            audio.play();
        
            currentSongIndex = index;
            console.log(`✅ Текущая песня: ${songs[currentSongIndex].src}`);
        
            audio.addEventListener("timeupdate", updateSongText);
        
            setTimeout(() => {
                updateSongText();
            }, 1000);
        }
        
        

        

        function spawnHearts() {
            for (let i = 0; i < 10; i++) {
                const heart = document.createElement("div");
                heart.classList.add("heart");
                heart.innerHTML = "❤️";

                let size = Math.random() * 20 + 10;
                heart.style.fontSize = `${size}px`;

                heart.style.position = "fixed";
                heart.style.left = Math.random() * window.innerWidth + "px";
                heart.style.bottom = "0px";
                heart.style.zIndex = "9999";

                let duration = Math.random() * 3 + 2;
                heart.style.animation = `float ${duration}s linear`;

                document.body.appendChild(heart);

                setTimeout(() => heart.remove(), duration * 1000);
            }
        }

        function startTextAnimation(index) {
            const letter = cards[index].querySelector(".letter p");
            let currentTextIndex = 0;

            function changeText() {
                letter.style.opacity = 0;
                setTimeout(() => {
                    letter.textContent = cardTexts[index][currentTextIndex];
                    letter.style.opacity = 1;
                    currentTextIndex = (currentTextIndex + 1) % cardTexts[index].length;
                }, 500);
            }

            setInterval(changeText, 3000);
        }

        function startTextAnimation(index) {
            const letter = cards[index].querySelector(".letter p");
            let currentTextIndex = 0;
    
            function changeText() {
                letter.style.opacity = 0;
                setTimeout(() => {
                    letter.textContent = cardTexts[index][currentTextIndex];
                    letter.style.opacity = 1;
                    currentTextIndex = (currentTextIndex + 1) % cardTexts[index].length;
                }, 500);
            }
    
            setInterval(changeText, 3000);
        }
    
        showCard(currentIndex);
        

        function updateSongBlockPosition() {
            const songBlock = document.getElementById("songBlock");
        
            if (window.innerWidth <= 480) {
                songBlock.style.top = "85%"; // Для мобильных экранов
            } else if (window.innerWidth <= 768) {
                songBlock.style.top = "90%"; // Для планшетов
            } else {
                songBlock.style.top = "450px"; // Для больших экранов
            }
        }
        
        // Вызываем функцию при загрузке страницы и изменении размеров окна
        window.addEventListener("load", updateSongBlockPosition);
        window.addEventListener("resize", updateSongBlockPosition);
        

    });
