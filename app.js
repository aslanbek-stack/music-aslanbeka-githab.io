// ---------- ГЛОБАЛЬНОЕ СОСТОЯНИЕ ----------
const App = {
  currentUser: null,
  favorites: [],
  playlist: [],
  currentTrackIndex: 0,
  audio: new Audio(),
  genres: [
    { id: 'rock', name: 'Рок', bg: 'https://pic.rutubelist.ru/user/16/be/16be20a5cb99a5635293b843ea6f3d57.jpg' },
    { id: 'rap', name: 'Рэп', bg: 'https://cdn-images.dzcdn.net/images/cover/82ab067350ffdefff308076e3c73ba2a/1000x1000.jpg' },
    { id: 'pop', name: 'Поп', bg: 'https://bigfoto.name/photo/uploads/posts/2023-09/1695639417_bigfoto-name-p-v-kakom-interere-ispolnyayut-pop-muziku-1.jpg' },
    { id: 'jazz', name: 'Джаз', bg: 'https://i.pinimg.com/736x/0f/b9/30/0fb9309cda611d5cae21c9e8cb51b84a.jpg' },
    { id: 'classic', name: 'Классика', bg: 'https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/85/1f/d3/851fd342-ae9f-9cfd-3af7-5673a4a45718/cover.jpg/1200x1200bf-60.jpg' },
    { id: 'electro', name: 'Электроника', bg: 'https://i.pinimg.com/originals/c2/d5/7a/c2d57a39dfbb17c19494d78a7f004d11.jpg' }
  ],
  tracks: [
    // Рок
    { id: 'r1', title: 'Beggin\'', artist: 'Måneskin', genre: 'rock', cover: 'https://i.ytimg.com/vi/GwPozMGEDkk/maxresdefault.jpg', file: 'music/rock1.mp3' },
    { id: 'r2', title: 'I Was Made For Lovin\' You', artist: 'KISS', genre: 'rock', cover: 'https://i.pinimg.com/736x/3e/88/ea/3e88eabf981252abb68dd3dfe5da31e0.jpg', file: 'music/rock2.mp3' },
    { id: 'r3', title: 'Stressed Out', artist: 'Twenty One Pilots', genre: 'rock', cover: 'https://avatars.yandex.net/get-music-user-playlist/27701/272723645.1001.12248/m1000x1000?1492025374307&webp=false', file: 'music/rock3.mp3' },
    // Рэп
    { id: 'p1', title: 'Lose Yourself', artist: 'Eminem', genre: 'rap', cover: 'https://static.wikia.nocookie.net/e__/images/d/d6/Lose_Yourself.jpg/revision/latest/scale-to-width-down/1200?cb=20250907050821&path-prefix=eminem', file: 'music/rap1.mp3' },
    { id: 'p2', title: 'Положение', artist: 'Скриптонит', genre: 'rap', cover: 'https://images.genius.com/1565c528a2f14e83c9905da0dfa9c087.1000x1000x1.jpg', file: 'music/rap2.mp3' },
    // Поп
    { id: 'o1', title: 'Easy On Me', artist: 'Adele', genre: 'pop', cover: 'https://static.wikia.nocookie.net/adeles/images/c/c3/Adele_-_Easy_On_Me.jpg/revision/latest/scale-to-width-down/1200?cb=20211015035425', file: 'music/pop1.mp3' },
    { id: 'o2', title: 'Bad Guy', artist: 'Billie Eilish', genre: 'pop', cover: 'https://i.ytimg.com/vi/cxgBcx5-qfM/maxresdefault.jpg', file: 'music/pop2.mp3' },
    { id: 'o3', title: 'Uptown Funk', artist: 'Bruno Mars', genre: 'pop', cover: 'https://avatars.mds.yandex.net/get-entity_search/362296/291746030/S600xU', file: 'music/pop3.mp3' },
    { id: 'o4', title: 'Венера-Юпитер', artist: 'Ваня Дмитриенко', genre: 'pop', cover: 'https://avatars.mds.yandex.net/get-entity_search/44747/603854187/S600xU', file: 'music/pop4.mp3' },
    { id: 'o5', title: 'Невозможное возможно', artist: 'Дима Билан', genre: 'pop', cover: 'https://avatars.mds.yandex.net/get-entity_search/2334190/1230849182/S600xU', file: 'music/pop5.mp3' },
    { id: 'o6', title: 'Pizza', artist: 'Романс', genre: 'pop', cover: 'https://avatars.mds.yandex.net/get-entity_search/371130/291070923/S600xU', file: 'music/pop6.mp3' },
    // Джаз
    { id: 'j1', title: 'Take Five', artist: 'Dave Brubeck', genre: 'jazz', cover: 'https://avatars.mds.yandex.net/get-entity_search/365997/287949123/S600xU', file: 'music/jazz1.mp3' },
    // Классика
    { id: 'c1', title: 'Лунная соната', artist: 'Бетховен', genre: 'classic', cover: 'https://cdn-images.dzcdn.net/images/cover/5fc82acbb40ab911947d05c16f4bcc80/1000x1000.jpg', file: 'music/classic1.mp3' },
    // Электроника
    { id: 'e1', title: 'Strobe', artist: 'deadmau5', genre: 'electro', cover: 'https://i.ytimg.com/vi/rnxok3YdmjE/maxresdefault.jpg?sqp=-oaymwEmCIAKENAF8quKqQMa8AEB-AH-CYAC0AWKAgwIABABGFsgZSgwMA8=&rs=AOn4CLAVOtJaoYy8D_0Ej3TS1EwyqBd5Lw', file: 'music/electro1.mp3' }
  ]
};

// ---------- УТИЛИТЫ ----------
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function showToast(message, type = 'info') {
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 4000);
}

function formatTime(sec) {
  if (isNaN(sec)) return '0:00';
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

// ---------- ИНИЦИАЛИЗАЦИЯ ХРАНИЛИЩА ----------
function initStorage() {
  if (!localStorage.getItem('harmony_users')) {
    const demo = { id: '1', login: 'demo', password: btoa('demo'), fullname: 'Демо Пользователь', phone: '+79991234567', email: 'demo@harmony.ru' };
    const admin = { id: 'admin1', login: 'admin', password: btoa('admin'), fullname: 'Администратор', phone: '-', email: 'admin@harmony.ru', role: 'admin' };
    localStorage.setItem('harmony_users', JSON.stringify([demo, admin]));
  }
  if (!localStorage.getItem('harmony_orders')) {
    localStorage.setItem('harmony_orders', JSON.stringify([
      { id: '101', userId: '1', service: 'Сведение', address: 'ул. Мира, 5', contact: '+79991234567', date: '2025-05-20', time: '14:00', payment: 'card', status: 'Новая' }
    ]));
  }
  const fav = localStorage.getItem('harmony_favorites');
  App.favorites = fav ? JSON.parse(fav) : [];
}

// ---------- ПЛЕЕР ----------
function loadAndPlayTrack(track) {
  App.audio.src = track.file;
  App.audio.play().catch(e => showToast('Ошибка воспроизведения', 'error'));
  document.querySelector('.player-track-title').textContent = track.title;
  document.querySelector('.player-track-artist').textContent = track.artist;
  document.getElementById('playerPlayBtn').textContent = '⏸';
  if ('mediaSession' in navigator) {
    navigator.mediaSession.metadata = new MediaMetadata({
      title: track.title,
      artist: track.artist,
      artwork: [{ src: track.cover }]
    });
  }
}

function initPlayer() {
  const audio = App.audio;
  const playBtn = document.getElementById('playerPlayBtn');
  const progress = document.getElementById('playerProgress');
  const currentTimeSpan = document.getElementById('playerCurrentTime');
  const durationSpan = document.getElementById('playerDuration');
  const volumeSlider = document.getElementById('playerVolumeSlider');
  const volumeBtn = document.getElementById('playerVolumeBtn');

  audio.volume = 0.8;

  playBtn.addEventListener('click', () => {
    if (audio.paused) {
      audio.play();
      playBtn.textContent = '⏸';
    } else {
      audio.pause();
      playBtn.textContent = '▶';
    }
  });

  audio.addEventListener('timeupdate', () => {
    const pct = (audio.currentTime / audio.duration) * 100 || 0;
    progress.value = pct;
    currentTimeSpan.textContent = formatTime(audio.currentTime);
  });

  audio.addEventListener('loadedmetadata', () => {
    durationSpan.textContent = formatTime(audio.duration);
  });

  progress.addEventListener('input', () => {
    audio.currentTime = (progress.value / 100) * audio.duration;
  });

  volumeSlider.addEventListener('input', () => {
    audio.volume = volumeSlider.value;
    volumeBtn.textContent = audio.volume === 0 ? '🔇' : '🔊';
  });

  volumeBtn.addEventListener('click', () => {
    audio.muted = !audio.muted;
    volumeBtn.textContent = audio.muted ? '🔇' : '🔊';
  });

  document.getElementById('playerPrevBtn').addEventListener('click', () => {
    if (App.playlist.length) {
      App.currentTrackIndex = (App.currentTrackIndex - 1 + App.playlist.length) % App.playlist.length;
      loadAndPlayTrack(App.playlist[App.currentTrackIndex]);
    }
  });

  document.getElementById('playerNextBtn').addEventListener('click', () => {
    if (App.playlist.length) {
      App.currentTrackIndex = (App.currentTrackIndex + 1) % App.playlist.length;
      loadAndPlayTrack(App.playlist[App.currentTrackIndex]);
    }
  });
}

// ---------- ИЗБРАННОЕ ----------
function toggleFavorite(trackId) {
  const idx = App.favorites.indexOf(trackId);
  if (idx === -1) {
    App.favorites.push(trackId);
    showToast('Добавлено в избранное ❤️', 'success');
  } else {
    App.favorites.splice(idx, 1);
    showToast('Удалено из избранного', 'info');
  }
  localStorage.setItem('harmony_favorites', JSON.stringify(App.favorites));
  if (window.location.hash === '#favorites') {
    renderFavoritesPage();
  } else {
    document.querySelectorAll('.btn-favorite').forEach(btn => {
      if (btn.dataset.id === trackId) {
        btn.textContent = App.favorites.includes(trackId) ? '❤️' : '🤍';
      }
    });
  }
}

// ---------- РЕНДЕР СТРАНИЦ ----------
function renderHomePage() {
  const main = document.getElementById('mainContent');
  main.innerHTML = `<h2>🎧 Жанры</h2><div class="genre-grid" id="genreGrid"></div>`;
  const grid = document.getElementById('genreGrid');
  App.genres.forEach(g => {
    const card = document.createElement('div');
    card.className = 'genre-card';
    card.innerHTML = `<img class="genre-bg" src="${g.bg}" alt="${g.name}"><div class="genre-overlay"><span class="genre-name">${g.name}</span></div>`;
    card.addEventListener('click', () => navigate(`genre/${g.id}`));
    grid.appendChild(card);
  });
}

function renderGenrePage(genreId) {
  const genre = App.genres.find(g => g.id === genreId);
  if (!genre) return navigate('home');
  const tracks = App.tracks.filter(t => t.genre === genreId);
  App.playlist = tracks;
  const main = document.getElementById('mainContent');
  main.innerHTML = `
    <button class="back-btn" id="backToGenresBtn">Назад к жанрам</button>
    <h2>${genre.name}</h2>
    <div class="track-grid" id="trackGrid"></div>
  `;
  document.getElementById('backToGenresBtn').addEventListener('click', () => navigate('home'));
  const grid = document.getElementById('trackGrid');
  tracks.forEach((t, i) => {
    const card = document.createElement('div');
    card.className = 'track-card';
    card.style.setProperty('--i', i);
    const isFav = App.favorites.includes(t.id);
    card.innerHTML = `
      <img class="track-cover" src="${t.cover}" alt="${escapeHtml(t.title)}">
      <div class="track-title">${escapeHtml(t.title)}</div>
      <div class="track-artist">${escapeHtml(t.artist)}</div>
      <div class="track-actions">
        <button class="btn-icon play-track" data-id="${t.id}">▶</button>
        <a class="btn-icon" href="${t.file}" download>⬇</a>
        <button class="btn-icon btn-favorite" data-id="${t.id}">${isFav ? '❤️' : '🤍'}</button>
      </div>
    `;
    grid.appendChild(card);
  });
  attachTrackEvents();
}

function renderFavoritesPage() {
  const favTracks = App.tracks.filter(t => App.favorites.includes(t.id));
  const main = document.getElementById('mainContent');
  main.innerHTML = `
    <h2>❤️ Избранное</h2>
    ${favTracks.length ? '' : '<p>Пока пусто</p>'}
    <div class="track-grid" id="trackGrid"></div>
  `;
  if (favTracks.length) {
    const grid = document.getElementById('trackGrid');
    favTracks.forEach(t => {
      const card = document.createElement('div');
      card.className = 'track-card';
      card.innerHTML = `
        <img class="track-cover" src="${t.cover}" alt="${escapeHtml(t.title)}">
        <div class="track-title">${escapeHtml(t.title)}</div>
        <div class="track-artist">${escapeHtml(t.artist)}</div>
        <div class="track-actions">
          <button class="btn-icon play-track" data-id="${t.id}">▶</button>
          <a class="btn-icon" href="${t.file}" download>⬇</a>
          <button class="btn-icon btn-favorite" data-id="${t.id}">❤️</button>
        </div>
      `;
      grid.appendChild(card);
    });
    attachTrackEvents();
  }
}

function attachTrackEvents() {
  document.querySelectorAll('.play-track').forEach(btn => {
    btn.addEventListener('click', e => {
      const id = e.currentTarget.dataset.id;
      const idx = App.playlist.findIndex(t => t.id === id);
      if (idx !== -1) {
        App.currentTrackIndex = idx;
        loadAndPlayTrack(App.playlist[idx]);
      }
    });
  });
  document.querySelectorAll('.btn-favorite').forEach(btn => {
    btn.addEventListener('click', e => toggleFavorite(e.currentTarget.dataset.id));
  });
}

// ---------- ФОРМЫ АВТОРИЗАЦИИ И РЕГИСТРАЦИИ ----------
function renderLoginPage() {
  const main = document.getElementById('mainContent');
  main.innerHTML = `
    <div class="form-container">
      <h2 class="form-title">Вход</h2>
      <form id="loginForm">
        <div class="form-group"><label>Логин</label><input name="login" class="form-control" required></div>
        <div class="form-group"><label>Пароль</label><input type="password" name="password" class="form-control" required></div>
        <button type="submit" class="btn">Войти</button>
      </form>
    </div>
  `;
  document.getElementById('loginForm').addEventListener('submit', e => {
    e.preventDefault();
    const login = e.target.login.value.trim();
    const pass = e.target.password.value;
    const users = JSON.parse(localStorage.getItem('harmony_users') || '[]');
    const user = users.find(u => u.login === login && u.password === btoa(pass));
    if (!user) return showToast('Неверный логин или пароль', 'error');
    App.currentUser = user;
    sessionStorage.setItem('harmony_session', JSON.stringify(user));
    showToast(`Добро пожаловать, ${user.fullname}!`, 'success');
    if (user.role === 'admin') navigate('admin');
    else navigate('profile');
  });
}

function renderRegisterPage() {
  const main = document.getElementById('mainContent');
  main.innerHTML = `
    <div class="form-container">
      <h2 class="form-title">Регистрация</h2>
      <form id="regForm">
        <div class="form-group"><label>Логин</label><input name="login" class="form-control" required></div>
        <div class="form-group"><label>Пароль</label><input type="password" name="password" class="form-control" required></div>
        <div class="form-group"><label>ФИО</label><input name="fullname" class="form-control" required></div>
        <div class="form-group"><label>Телефон</label><input name="phone" class="form-control" required></div>
        <div class="form-group"><label>Email</label><input type="email" name="email" class="form-control" required></div>
        <button type="submit" class="btn">Зарегистрироваться</button>
      </form>
    </div>
  `;
  document.getElementById('regForm').addEventListener('submit', e => {
    e.preventDefault();
    const f = e.target;
    const login = f.login.value.trim();
    const pass = f.password.value;
    const fullname = f.fullname.value.trim();
    const phone = f.phone.value.trim();
    const email = f.email.value.trim();
    if (!login || !pass || !fullname || !phone || !email) return showToast('Все поля обязательны', 'error');
    const users = JSON.parse(localStorage.getItem('harmony_users') || '[]');
    if (users.find(u => u.login === login)) return showToast('Логин занят', 'error');
    const newUser = { id: Date.now().toString(), login, password: btoa(pass), fullname, phone, email };
    users.push(newUser);
    localStorage.setItem('harmony_users', JSON.stringify(users));
    App.currentUser = newUser;
    sessionStorage.setItem('harmony_session', JSON.stringify(newUser));
    showToast('Регистрация успешна', 'success');
    navigate('profile');
  });
}

// ---------- ЛИЧНЫЙ КАБИНЕТ (с датой/временем и выровненными радио) ----------
function renderProfilePage() {
  if (!App.currentUser) return navigate('login');
  const orders = JSON.parse(localStorage.getItem('harmony_orders') || '[]').filter(o => o.userId === App.currentUser.id);

  const formatOrderDate = (isoDate) => {
    if (!isoDate) return '';
    const [y, m, d] = isoDate.split('-');
    return `${d}.${m}.${y}`;
  };

  const today = new Date();
  const defaultDate = today.toISOString().split('T')[0];

  const defaultTime = (() => {
    const d = new Date();
    d.setHours(d.getHours() + 1);
    let minutes = d.getMinutes();
    minutes = minutes < 30 ? 0 : 30;
    d.setMinutes(minutes, 0, 0);
    const hh = String(d.getHours()).padStart(2, '0');
    const mm = String(d.getMinutes()).padStart(2, '0');
    return `${hh}:${mm}`;
  })();

  const main = document.getElementById('mainContent');
  main.innerHTML = `
    <h2>Личный кабинет</h2>
    <p>Добро пожаловать, ${escapeHtml(App.currentUser.fullname)}!</p>
    <h3>История заявок</h3>
    <table class="orders-table">
      <tr><th>Услуга</th><th>Дата</th><th>Время</th><th>Статус</th></tr>
      ${orders.map(o => `<tr><td>${o.service}</td><td>${formatOrderDate(o.date)}</td><td>${o.time}</td><td>${o.status}</td></tr>`).join('')}
    </table>
    <h3>Новая заявка</h3>
    <form id="orderForm" class="form-container" style="max-width:100%">
      <div class="form-group"><label>Адрес</label><input name="address" class="form-control" required></div>
      <div class="form-group"><label>Контакты</label><input name="contact" class="form-control" required></div>
      <div class="form-group"><label>Дата</label><input type="date" name="date" class="form-control" value="${defaultDate}" required></div>
      <div class="form-group"><label>Время</label><input type="time" name="time" class="form-control" value="${defaultTime}" required></div>
      <div class="form-group"><label>Услуга</label>
        <select name="service" class="form-control">
          <option>Запись</option><option>Сведение</option><option>Мастеринг</option><option>Аренда</option><option>Консультация</option>
        </select>
      </div>
      <div class="form-group">
        <label>Оплата</label>
        <div class="radio-group">
          <label class="radio-label"><input type="radio" name="payment" value="cash" checked> Наличные</label>
          <label class="radio-label"><input type="radio" name="payment" value="card"> Карта</label>
        </div>
      </div>
      <button type="submit" class="btn">Отправить</button>
    </form>
  `;

  document.getElementById('orderForm').addEventListener('submit', e => {
    e.preventDefault();
    const f = e.target;
    const newOrder = {
      id: Date.now().toString(),
      userId: App.currentUser.id,
      service: f.service.value,
      address: f.address.value,
      contact: f.contact.value,
      date: f.date.value,
      time: f.time.value,
      payment: f.payment.value,
      status: 'Новая'
    };
    const orders = JSON.parse(localStorage.getItem('harmony_orders') || '[]');
    orders.push(newOrder);
    localStorage.setItem('harmony_orders', JSON.stringify(orders));
    showToast('Заявка создана', 'success');
    renderProfilePage();
  });
}

// ---------- АДМИН-ПАНЕЛЬ ----------
function renderAdminPage() {
  if (!App.currentUser || App.currentUser.role !== 'admin') return navigate('home');
  const orders = JSON.parse(localStorage.getItem('harmony_orders') || '[]');
  const users = JSON.parse(localStorage.getItem('harmony_users') || '[]');
  const main = document.getElementById('mainContent');
  main.innerHTML = `
    <h2>🛠️ Админ-панель</h2>
    <h3>Все заявки</h3>
    <table class="orders-table">
      <tr><th>ID</th><th>Пользователь</th><th>Услуга</th><th>Дата</th><th>Статус</th><th>Действие</th></tr>
      ${orders.map(o => {
        const user = users.find(u => u.id === o.userId) || { fullname: 'Неизвестно' };
        return `<tr>
          <td>${o.id}</td><td>${user.fullname}</td><td>${o.service}</td><td>${o.date}</td>
          <td><span class="status-badge status-${o.status === 'Новая' ? 'new' : o.status === 'В работе' ? 'progress' : 'done'}">${o.status}</span></td>
          <td>
            <select data-id="${o.id}" class="status-select form-control" style="width:auto">
              <option ${o.status === 'Новая' ? 'selected' : ''}>Новая</option>
              <option ${o.status === 'В работе' ? 'selected' : ''}>В работе</option>
              <option ${o.status === 'Завершена' ? 'selected' : ''}>Завершена</option>
            </select>
          </td>
        </tr>`;
      }).join('')}
    </table>
  `;
  document.querySelectorAll('.status-select').forEach(select => {
    select.addEventListener('change', e => {
      const id = e.target.dataset.id;
      const newStatus = e.target.value;
      const orders = JSON.parse(localStorage.getItem('harmony_orders') || '[]');
      const order = orders.find(o => o.id === id);
      if (order) {
        order.status = newStatus;
        localStorage.setItem('harmony_orders', JSON.stringify(orders));
        showToast(`Статус заявки #${id} изменён`, 'success');
        renderAdminPage();
      }
    });
  });
}

// ---------- НАВИГАЦИЯ ----------
const routes = {
  home: renderHomePage,
  favorites: renderFavoritesPage,
  login: renderLoginPage,
  register: renderRegisterPage,
  profile: renderProfilePage,
  admin: renderAdminPage
};

function updateMenuVisibility() {
  const isAuth = !!App.currentUser;
  const isAdmin = App.currentUser?.role === 'admin';
  document.querySelectorAll('[data-nav="profile"]').forEach(el => el.style.display = isAuth && !isAdmin ? 'block' : 'none');
  document.querySelectorAll('[data-nav="admin"]').forEach(el => el.style.display = isAdmin ? 'block' : 'none');
  document.querySelectorAll('[data-nav="login"]').forEach(el => el.style.display = isAuth ? 'none' : 'block');
  document.querySelectorAll('[data-nav="register"]').forEach(el => el.style.display = isAuth ? 'none' : 'block');
  document.getElementById('logoutBtn').style.display = isAuth ? 'block' : 'none';
}

function navigate(path) {
  if (path.startsWith('genre/')) {
    const genre = path.split('/')[1];
    renderGenrePage(genre);
    window.location.hash = `#genre/${genre}`;
    updateMenuVisibility();
    document.getElementById('sidebar').classList.remove('open');
    document.getElementById('overlay').classList.remove('open');
    return;
  }
  if (path === 'profile' && !App.currentUser) {
    showToast('Сначала войдите', 'error');
    return navigate('login');
  }
  if (path === 'admin' && (!App.currentUser || App.currentUser.role !== 'admin')) {
    showToast('Доступ запрещён', 'error');
    return navigate('home');
  }
  window.location.hash = path;
  const render = routes[path] || routes.home;
  render();
  updateMenuVisibility();
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('overlay').classList.remove('open');
}

function checkSession() {
  const sess = sessionStorage.getItem('harmony_session');
  if (sess) {
    try { App.currentUser = JSON.parse(sess); } catch (e) { App.currentUser = null; }
  }
}

// ---------- БУРГЕР-МЕНЮ ----------
function initBurger() {
  const burger = document.getElementById('burgerBtn');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('overlay');
  burger.addEventListener('click', () => {
    sidebar.classList.toggle('open');
    overlay.classList.toggle('open');
  });
  overlay.addEventListener('click', () => {
    sidebar.classList.remove('open');
    overlay.classList.remove('open');
  });
}

// ---------- ЗАПУСК ----------
initStorage();
checkSession();
initPlayer();
initBurger();

document.querySelectorAll('[data-nav]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    navigate(link.dataset.nav);
  });
});

document.getElementById('logoutBtn').addEventListener('click', () => {
  App.currentUser = null;
  sessionStorage.removeItem('harmony_session');
  showToast('Вы вышли', 'info');
  navigate('home');
});

window.addEventListener('hashchange', () => {
  const hash = window.location.hash.slice(1) || 'home';
  if (hash.startsWith('genre/')) {
    const genre = hash.split('/')[1];
    renderGenrePage(genre);
    updateMenuVisibility();
  } else {
    const render = routes[hash] || routes.home;
    render();
    updateMenuVisibility();
  }
});

const initialHash = window.location.hash.slice(1) || 'home';
if (initialHash.startsWith('genre/')) {
  const genre = initialHash.split('/')[1];
  renderGenrePage(genre);
} else {
  (routes[initialHash] || routes.home)();
}
updateMenuVisibility();