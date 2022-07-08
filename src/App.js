import './App.scss';

function App() {
  return (
    <div className="App">
      <div className={'header'}>
        <h3>Документация</h3>
      </div>
      <div className={'document'}>
        <h1>Название проекта "Социальная сеть Паритет"</h1>
        <h2>ВЕРСИЯ 0.0.1</h2>
        <h3>Фронтенд</h3>
        <h3>*** Страница авторизации ***</h3>

        <div className={'space'}> </div>
        <div className={'text'}>Инструменты разработки: React, axios, Effector, React Final Form.</div>

        <div className={'space'}> </div>
        <div className={'text-bold'}>Шаблон страницы</div>
        <div className={'space'}> </div>
        <div className={'paragraph'}>
          <div className={'text-bold'}>- Контейнер формы</div>
          <div className={'text-bold'}>- Форма(React Final Form)</div>
          <div className={'paragraph'}>
            <div className={'text-bold'}>- Заголовок("Авторизация")</div>
            <div className={'text-bold'}>- Поле ввода логина</div>
            <div className={'text-bold'}>- Поле ввода пароля</div>
            <div className={'text-bold'}>- Кнопка подтверждения ввода формы</div>
          </div>
        <div className={'space'}> </div>
        </div>

        <div className={'text-bold'}>Функционал</div>
        <div className={'space'}> </div>
        <div className={'paragraph'}>
          <div className={'text-bold'}>- Роутинг</div>
          <div className={'paragraph'}>
            <div className={'text-bold'}>MainPage - /</div>
            <div className={'text-bold'}>AuthPage - /auth</div>
          </div>
        </div>

        <div className={'space'}> </div>
        <div className={'paragraph'}>
          <div className={'text-bold'}>- Effector Store(хранилище состояний приложения)</div>
          <div className={'paragraph'}>
            <div className={'horizontal'}>
              <div className={'text-bold'}>- authState</div>
              <div className={'comment'}>//состояние авторизации</div>
            </div>
            <div className={'paragraph'}>
              <div className={'horizontal'}>
                <div className={'text-bold'}>*getAuth</div>
                <div className={'comment'}>//событие получения текущего состояния авторизации</div>
              </div>
              <div className={'horizontal'}>
                <div className={'text-bold'}>*resetAuth</div>
                <div className={'comment'}>//событие сброса авторизации</div>
              </div>
            </div>
          </div>
        </div>

        <div className={'space'}> </div>
        <div className={'paragraph'}>
          <div className={'text-bold'}>- RequestsController(оболочка для axios)</div>
          <div className={'paragraph'}>
            <div className={'horizontal'}>
              <div className={'text-bold'}>*getAuth(user)</div>
              <div className={'comment'}>//метод запроса состояния авторизации</div>
            </div>
            <div className={'horizontal'}>
              <div className={'text-bold'}>*setAuth(user, password)</div>
              <div className={'comment'}>//метод установки/сброса авторизации</div>
            </div>
          </div>
        </div>

        <div className={'space'}> </div>
        <div className={'paragraph'}>
          <div className={'text-bold'}>- Формы</div>
          <div className={'paragraph'}>
            <div className={'text-bold'}>*валидация пустых форм</div>
            <div className={'text-bold'}>*валидация количества введенных символов форм(6-20)</div>
          </div>
        </div>

        <div className={'space'}> </div>
        <div className={'paragraph'}>
          <div className={'text-bold'}>- Кнопка подтверждения ввода формы</div>
          <div className={'paragraph'}>
            <div className={'text-bold'}>*отправляет запрос на сервер с данными из полей ввода</div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;