import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';

function App() {
  return (
    <div className="App">
      <div className={'header'}>
        <h1>Документация</h1>
      </div>
      <div className={'document'}>
        <h1>Социальная сеть Паритет v0.0.1</h1>

        <div className='d-flex '>
          <div className='flex-fill'>
            <Inclosure title={<h2>Фронтенд</h2>}>
              <Inclosure title={<h2>Модули (компоненты)</h2>}>
                <Inclosure title={<h3>Шаблон страницы</h3>}>
                  <div className='bg-white'>
                    {/* some content */}
                    <header>
                      <div className='container '>


                        <div className='d-flex justify-content-between'>
                          <div>header first side</div>
                          <div>header second side</div>
                          <div>header third side</div>
                        </div>
                      </div>
                    </header>
                    <footer>
                      <div className='d-flex justify-content-between'>
                        <div>header first side</div>
                        <div>header second side</div>
                        <div>header third side</div>
                      </div>
                    </footer>
                    <div className='p-2 bg-dark text-white'>{'//'}ну тут короче tmp щас сделаем...</div>
                  </div>
                </Inclosure>
                <Inclosure title={<h3>Форма авторизации</h3>}>
                  <Inclosure title={<h4>Верстка</h4>}>
                    {/* <div className=''></div> */}
                    <ModuleDemoBox>
                      <form>
                        <div className="form-group mb-3">
                          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Логин" />
                        </div>
                        <div className="form-group">
                          <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Пароль" />
                        </div>
                        <div className='d-flex my-3'>
                          <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                            <label className="form-check-label" htmlFor="exampleCheck1">Запомнить меня</label>
                          </div>
                          <div className="form-check">
                            <a className='text-nowrap'>Забыли пароль?</a>
                          </div>
                        </div>
                        <button type="submit" className="btn btn-sm btn-primary">Войти</button>
                      </form>
                    </ModuleDemoBox>

                  </Inclosure>
                  <Inclosure title={<h4>Стора</h4>}>
                    <pre>
                      <code>
                        {`
  const setAuthData = createEvent()
  const clearAuthData = createEvent()

  const $authData = createStore(null)
  .on(setAuthData, (state, todo) => [...state, todo])
  .reset(clearAuthData);
                      `}
                      </code>
                    </pre>
                  </Inclosure>
                  <Inclosure title={<h4>Методы</h4>}>
                    <p>Использует fetcher для отправки запросов</p>
                    <p>Использует effector для хранения стором авторизации</p>
                    <p>Использует react-effector для работы со сторой в реакт-компонентах</p>
                    <p>Использует что-то еще...</p>
                    {/* <ul>
                  <li>fetching()</li>
                </ul> */}
                  </Inclosure>
                </Inclosure>
              </Inclosure>
            </Inclosure>
          </div>
          <div className='flex-fill'>
            <Inclosure title={<h2>Бэкенд</h2>}>
              {/* api */}
              <form class="row g-3">
                <div className='d-flex align-items-stretch'>
                  <label className='p-1 bg-secondary text-white bg-success'>GET</label>
                  <label className='p-1 '>https://paritet27.ru/api/v2/</label>
                  {/* <input type="text" class="p-1" placeholder={"Логин"} />
                <input type="text" class="p-1" placeholder={"Пароль"} />
                <button type="submit" class="btn btn-sm btn-primary">Confirm</button> */}
                </div>
              </form>

              <div className='mt-2'>
                <pre>
                  <code>
                    {JSON.stringify({
                      users: [
                        {
                          id: "manam",
                          login: "superuser",
                          password: "password",
                          token: "adasd123c",
                          tokenUpdate: "11.11.1111 11.11.11"
                        },
                        "..."
                      ]
                    }, null, " ")}
                  </code>
                </pre>
              </div>
            </Inclosure>
          </div>
        </div>


        <Inclosure>
          <div
            style={{
              border: "1px solid",
              padding: "5px"
            }}
          >

            <div
              style={{
                border: "1px solid",
                padding: "5px"
              }}
            >
              <div>Функционал</div>
              <div
                style={{
                  border: "1px solid",
                  padding: "5px"
                }}>
                Верстка
                <ul>
                  <li>Шаблон страницы</li>
                  <li>Форма авторизации</li>
                </ul>
              </div>
              <div
                style={{
                  border: "1px solid",
                  padding: "5px"
                }}
              >
                <div>Стора</div>
                <div
                  style={{
                    border: "1px solid",
                    padding: "5px"
                  }}>
                  Авторизация
                  <pre>
                    <code>
                      {`
  const setAuthData = createEvent()
  const clearAuthData = createEvent()

  const $authData = createStore(null)
  .on(setAuthData, (state, todo) => [...state, todo])
  .reset(clearAuthData);
              `}

                    </code>
                  </pre>

                </div>
              </div>
            </div>
          </div>

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
                <div className={'comment'}>{'//'}состояние авторизации</div>
              </div>
              <div className={'paragraph'}>
                <div className={'horizontal'}>
                  <div className={'text-bold'}>*getAuth</div>
                  <div className={'comment'}>{'//'}событие получения текущего состояния авторизации</div>
                </div>
                <div className={'horizontal'}>
                  <div className={'text-bold'}>*resetAuth</div>
                  <div className={'comment'}>{'//'}событие сброса авторизации</div>
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
                <div className={'comment'}>{'//'}метод запроса состояния авторизации</div>
              </div>
              <div className={'horizontal'}>
                <div className={'text-bold'}>*setAuth(user, password)</div>
                <div className={'comment'}>{'//'}метод установки/сброса авторизации</div>
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
        </Inclosure>


      </div>
    </div>
  );
}



const Inclosure = ({ title, children }) => <div
  style={{
    border: "1px solid",
    padding: "5px",
    margin: 5
  }}
>
  {title && <div>{title}</div>}
  {children}
</div>

const ModuleDemoBox = ({ children }) => {
  return <div className="card" style={{
    maxWidth: "100%",
    display: "inline-block",
    minHeight: "1px",
    paddingRight: "5px",
    paddingLeft: "5px",


  }}>
    <div className="card-body">
      <div

      >
        {children}
        {/* <form>
          <div className="form-group mb-3">
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Логин" />
          </div>
          <div className="form-group">
            <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Пароль" />
          </div>
          <div className='d-flex my-3'>
            <div className="form-check">
              <input type="checkbox" className="form-check-input" id="exampleCheck1" />
              <label className="form-check-label" htmlFor="exampleCheck1">Запомнить меня</label>
            </div>
            <div className="form-check">
              <a className='text-nowrap'>Забыли пароль?</a>
            </div>
          </div>
          <button type="submit" className="btn btn-sm btn-primary">Войти</button>
        </form> */}
      </div>
    </div>
  </div>
}

export default App;