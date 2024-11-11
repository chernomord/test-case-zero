<script setup>

</script>

<template>
  <v-container fluid>
    <v-container>
      <v-row>
        <v-col cols="12">
          <h1 class="display-1">Тестовое задание Frontend</h1>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <p>
            Необходимо с помощью Vue.js, Vuex, VueRouter, Vuetify написать приложение. Хэдер приложения должен содержать меню из 2-х пунктов: <strong>О задании</strong> и <strong>Карта</strong>. В основной части приложения должно отображаться содержимое разделов.
          </p>

          <h2 class="title mb-3 mt-6">Раздел “Карта”</h2>
          <p>На экране должны быть карта и список, как показано в примере:</p>

          <ol class="v-list v-list--dense" style="padding-left: 1.5rem;">
            <li class="v-list-item">
              <div class="v-list-item__content">
                <strong>При клике на кнопку добавления</strong>, карта должна перейти в режим добавления маркера:
                в месте клика должен появится маркер, а в списке - запись с адресом точки.
                <ol class="v-list v-list--dense">
                  <li class="v-list-item">
                    <span>Для поиска адреса можно использовать любое бесплатное API для геокодирования, например:
                      <a href="https://geocode.maps.co/" target="_blank">https://geocode.maps.co/</a></span>
                  </li>
                  <li class="v-list-item">
                    В случае, если адрес не найден, необходимо вывести ошибку и не добавлять маркер в список.
                  </li>
                </ol>
              </div>
            </li>

            <li class="v-list-item">
              <div class="v-list-item__content">
                <strong>При клике на маркер</strong> должна подсвечиваться запись в списке.
              </div>
            </li>

            <li class="v-list-item">
              <div class="v-list-item__content">
                <strong>При клике на запись в списке</strong> карта должна центрироваться на маркере.
              </div>
            </li>

            <li class="v-list-item">
              <div class="v-list-item__content">
                Маркеры должны храниться локально и не пропадать после перезагрузки страницы.
              </div>
            </li>

            <li class="v-list-item">
              <div class="v-list-item__content">
                В адресной строке должен отображаться <code>id</code> выбранного маркера.
              </div>
            </li>
          </ol>

          <h2 class="title mb-3 mt-6">Дополнительно</h2>
          <ol class="v-list v-list--dense" style="padding-left: 1.5rem;">
            <li class="v-list-item">
              <v-list-item-title>Продумать отображение на мобильных устройствах.</v-list-item-title>
            </li>
            <li class="v-list-item">
              <v-list-item-title>Предусмотреть локализацию.</v-list-item-title>
            </li>
            <li class="v-list-item">
              <v-list-item-title>Необходимо с помощью <strong>jest</strong> написать один модульный тест на любой компонент.</v-list-item-title>
            </li>
          </ol>

          <p>
            Напоминание: тестовое задание призвано показать умение писать хороший модульный код, а также умение пользоваться указанными технологиями и не только. Этим кодом нужно гордиться.
          </p>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<style scoped>
/* Стили для списков */
ol.v-list {
  counter-reset: item;
  list-style: none;
}

ol.v-list > li.v-list-item {
  counter-increment: item;
  align-self: baseline;
  align-items: baseline;
}

ol.v-list > li.v-list-item::before {
  content: counter(item) ". ";
  font-weight: bold;
  margin-right: 8px;
}
</style>
