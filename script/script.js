// Базовый JavaScript для всего приложения

const popular_books = [
    { id: 1, title: "Связанные честью ", category: [1, 2], coverImage: "p1.jpg", series_id:2, author_id:1},
    { id: 2, title: "Связанные долгом", category: [1, 2], coverImage: "p2.jpg", series_id:2, author_id:1 },
    { id: 11, title: "Курок", category: [1, 2, 3], coverImage: "p8.jpg", series_id:1, author_id:2 },
    { id: 12, title: "Конклав", category: [1, 2], coverImage: "p9.jpg", series_id:1, author_id:2 },
];

/*
const books = [
    { id: 1, title: "Связанные честью ", category: [1, 2], coverImage: "p1.jpg", series_id:2, author_id:1},
    { id: 2, title: "Связанные долгом", category: [1, 2], coverImage: "p2.jpg", series_id:2, author_id:1 },
    { id: 3, title: "Связанные ненавистью", category: [1, 2], coverImage: "p3.jpg", series_id:2 , author_id:1},
    { id: 4, title: "Связанные искушением", category: [1, 2], coverImage: "p4.jpg", series_id:2 , author_id:1},
    { id: 5, title: "Связанные местью", category: [1, 2], coverImage: "p5.jpg", series_id:2 , author_id:1},
    { id: 6, title: "Связанные любовью", category: [1, 2], coverImage: "p6.jpg", series_id:2, author_id:1 },
    { id: 6, title: "Связанные прошлым", category: [1, 2], coverImage: "p7.jpg", series_id:2 , author_id:1},
    { id: 7, title: "Сладкое искушение", category: [1, 2], coverImage: "p8.jpg", series_id:2, author_id:1},
    { id: 8, title: "Лука Витиелло", category: [1, 2], coverImage: "p9.jpg", series_id:2, author_id:1 },


    { id: 9, title: "Испорченный", category: [1, 2, 3], coverImage: "p6.jpg", series_id:1, author_id:2 },
    { id: 10, title: "Убежище", category: [1, 2], coverImage: "p7.jpg", series_id:1, author_id:2 },
    { id: 11, title: "Курок", category: [1, 2, 3], coverImage: "p8.jpg", series_id:1, author_id:2 },
    { id: 12, title: "Конклав", category: [1, 2], coverImage: "p9.jpg", series_id:1, author_id:2 },
    { id: 11, title: "Сумрак", category: [1, 2], coverImage: "p8.jpg", series_id:1 , author_id:2},
    { id: 12, title: "Панк 57", category: [1, 2, 3], coverImage: "p9.jpg", series_id:1, author_id:2 },



    
];

const series = [
    { 
        id: 1, 
        name: "Ночь дьявола", 
        image: "devils_night.jpg", 
        description: '', 
        authors_id: 2
    },
    { 
        id: 2, 
        name: "Хроники мафии. Рожденные в крови",
        description: '«Хроники мафии. Рожденные в крови», который взорвал Tik-tok. Цикл с успехом вышел в 7 странах: Бразилия, Франция, Германия, Италия, Польша, Испания. Автор имеет свой собственный фан-клуб. Видео с хештегом #корарейли в Tiktok собрало 311 млн. просмотров, а с хештегом #хроникимафии 100,6 млн. Просмотров',  
        image: "devils_night.jpg", 
        authors_id: 1 
    },
    { 
        id: 3, 
        name: "Хроники мафии. Рожденные в крови",
        description: '«Хроники мафии. Рожденные в крови», который взорвал Tik-tok. Цикл с успехом вышел в 7 странах: Бразилия, Франция, Германия, Италия, Польша, Испания. Автор имеет свой собственный фан-клуб. Видео с хештегом #корарейли в Tiktok собрало 311 млн. просмотров, а с хештегом #хроникимафии 100,6 млн. Просмотров',  
        image: "devils_night.jpg", 
        authors_id: 1 
    },
    { 
        id: 4, 
        name: "Хроники мафии. Рожденные в крови",
        description: '«Хроники мафии. Рожденные в крови», который взорвал Tik-tok. Цикл с успехом вышел в 7 странах: Бразилия, Франция, Германия, Италия, Польша, Испания. Автор имеет свой собственный фан-клуб. Видео с хештегом #корарейли в Tiktok собрало 311 млн. просмотров, а с хештегом #хроникимафии 100,6 млн. Просмотров',  
        image: "devils_night.jpg", 
        authors_id: 1 
    },
    { 
        id: 5, 
        name: "Хроники мафии. Рожденные в крови",
        description: '«Хроники мафии. Рожденные в крови», который взорвал Tik-tok. Цикл с успехом вышел в 7 странах: Бразилия, Франция, Германия, Италия, Польша, Испания. Автор имеет свой собственный фан-клуб. Видео с хештегом #корарейли в Tiktok собрало 311 млн. просмотров, а с хештегом #хроникимафии 100,6 млн. Просмотров',  
        image: "devils_night.jpg", 
        authors_id: 1 
    },

];

const categories = [
    { id: 1, name: "Современные", image: "kora_reili.jpg" },
    { id: 2, name: "Триллеры", image: "author2.jpg" },
    { id: 3, name: "Драма", image: "author2.jpg" },
    { id: 4, name: "Детективы", image: "author2.jpg" },
    { id: 5, name: "Фэнтези", image: "author2.jpg" },
];

const authors = [
    { id: 1, name: "Кора Рейли", image: "penelopa_duglas.jpg" },
    { id: 2, name: "Пенелопа Дуглас", image: "penelopa_duglas.jpg" },
    { id: 3, name: "Пенелопа Дуглас", image: "penelopa_duglas.jpg" },
    { id: 4, name: "Пенелопа Дуглас", image: "penelopa_duglas.jpg" },
    { id: 5, name: "Пенелопа Дуглас", image: "penelopa_duglas.jpg" },
    { id: 6, name: "Пенелопа Дуглас", image: "penelopa_duglas.jpg" },
    // ... другие авторы ...
];

*/