import './App.scss';

function App() {
  return (
    <div className="App">
      <div className={'header'}>
        <h3>Документация</h3>
      </div>
      <div className={'document'}>
        <h1>Название проекта "Социальная сеть Паритет"</h1>
        <h2>ВЕРСИЯ 0.0.0</h2>
        <h3>Фронтенд</h3>
        <h3>*** Главная страница ***</h3>

        <div className={'space'}> </div>

        <div className={'text-bold'}>Шаблон главной страницы</div>
        <div className={'text'}>Инструменты разработки: React, Bootstrap.</div>

        <div className={'space'}> </div>

        <div className={'text-bold'}>Основные компоненты:</div>

        <div className={'space'}> </div>

        <div className={'text-bold'}>- Хедер</div>
        <div className={'paragraph'}>С левого края Логотип, кнопка меню</div>
        <div className={'paragraph'}>С правого края Поисковик, иконка ЛК</div>

        <div className={'space'}> </div>


        <div className={'text-bold'}> - Тело</div>
        <div className={'paragraph'}>В тело могут импортироваться любые компоненты(модули)</div>
        <div className={'paragraph'}>Ширина полезного контента внутри тела ограничивается шириной Container</div>
        <div className={'paragraph'}>Минимальная высота тела: высота экрана минус совокупность высот хедера и футера</div>

        <div className={'space'}> </div>

        <div className={'paragraph'}>
          <div className={'text-bold'}>  - Компоненты (модули)</div>
          <div className={'paragraph'}>Ширина фона модуля может растягиваться на всю ширину экрана</div>
          <div className={'paragraph'}>Ширина содержимого модуля соответствует ширине Container в котором оно находится</div>
          <div className={'paragraph'}>В исключительных случаях полезный контент может выходить за пределы Container</div>
        </div>


        <div className={'space'}> </div>

        <div className={'text-bold'}> - Футер</div>
        <div className={'paragraph'}>Расположение дочерних компонентов в ряд</div>
        <div className={'paragraph'}>Контактные данные УК Паритет</div>



      </div>
    </div>
  );
}

export default App;

/*
* Документация

Название проекта "Социальная сеть Паритет"

ВЕРСИЯ 0.0.0

Фронтенд

    *** Главная страница ***

    Шаблон главной страницы

    Инструменты разработки: React, Bootstrap.

    Основные компоненты:
        - Хедер
            - С левого края Логотип, кнопка меню
            - С правого края Поисковик, иконка ЛК

        - Тело
            В тело могут импортироваться любые компоненты (модули).
            Ширина полезного контента внутри тела ограничивается шириной Container

            Минимальная высота тела: высота экрана минус совокупность высот хедера и футера
            - Компоненты (модули)
                Ширина фона модуля может растягиваться на всю ширину экрана
                Ширина содержимого модуля соответствует ширине Container в котором оно находится
                В исключительных случаях полезный контент может выходить за пределы Container

        - Футер
            Расположение дочерних компонентов в ряд
            - Контактные данные УК Паритет
* */