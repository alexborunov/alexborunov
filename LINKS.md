# Ссылки на кейсы для резюме и писем

Замени `alexborunov.com` на свой домен после деплоя. Ссылки постоянные: они привязаны к id в HTML, а не к порядку блоков, так что можно переставлять кейсы и ничего не сломается.

| Кейс | Ссылка | Куда вставлять |
|---|---|---|
| Просто Спросить, сервис на пожертвованиях пользователей | `https://alexborunov.com/cases/prosto-sprosit.html` | 0→1, healthtech, monetization, donations/fundraising, consumer |
| DefeatCovid, ковидная справочная за полторы недели | `https://alexborunov.com/cases/defeatcovid.html` | кризисный запуск, скорость, healthtech, ops, работа с волонтёрами |
| Genomed, чекаут: +45% конверсии в оплату | `https://alexborunov.com/cases/genomed-checkout.html` | conversion, CRO, e-commerce, checkout, forms |
| Genomed, брошенные корзины и колл-центр | `https://alexborunov.com/cases/genomed-abandoned.html` | conversion, CRO, retention of leads, sales ops |
| Genomed, журнал: трафик x2 без бюджета | `https://alexborunov.com/cases/genomed-journal.html` | SEO, content, growth, acquisition |
| Genomed, шаблонизатор лендингов: недели → 1–2 дня | `https://alexborunov.com/cases/genomed-landings.html` | process, delivery, CMS, landing pages, time-to-market |
| Публикации и пресса | `https://alexborunov.com/#publications` | когда нужен внешний пруф |

На сайте у каждого кейса есть кнопка «Copy link to this case», чтобы не лазить сюда.

---

## Как вставлять в резюме

**Не делай так.** Одна ссылка «Portfolio: alexborunov.com» в шапке. Ее не открывают, потому что непонятно, что там.

**Делай так.** Ссылка стоит внутри того буллета, который она подтверждает, и текст говорит, что за ней:

```
Achieved 8x web channel revenue growth (~5M to ~40M RUB) through checkout
optimization, mobile UX fixes, dynamic pricing, and SEO.
Full case: alexborunov.com/#genomed-growth
```

Два практических момента:

1. **ATS-парсеры теряют гиперссылки.** Пиши URL текстом, а не прячь его под словом «здесь». Тогда он выживет и в распарсенной версии.

---

## Как вставлять в холодное письмо

Одна ссылка, на релевантный кейс, с указанием, почему именно он:

```
Вы ищете PM на платежный домен. Ближайшее, что у меня есть: аудит-логирование
и RBAC в мультирельсовом платежном бэк-офисе (чек-раны, EFT, X9.37, lockbox).
Разбор на 3 минуты: alexborunov.com/#payments-backoffice
```

Ссылка на главную работает хуже: получатель попадает на страницу и должен сам искать, что относится к его вакансии. Обычно не ищет.

---

## Внешние пруфы, которые уже стоят на сайте

1. **JCO Global Oncology**, 2021;7:353-360. DOI 10.1200/GO.20.00546, PMID 33667114.
   Baron E, Sittig M, Kotov M, Fomintsev I, Gushchin V.
   Изучение ВШО. Ты не автор, ты основатель изучаемой программы. Формулировка на сайте это разводит явно.
2. **Journal of Clinical Oncology**, 2025;43(16_suppl):e21028. Абстракт ASCO про десять лет ВШО.
3. **РБК Тренды**, 2 апреля 2020. Запуск ковидной справочной. Ты в цитате как руководитель справочной службы Фонда профилактики рака.
4. **ITMO.News**, 11 февраля 2019. Запуск «Просто спросить». Ты в цитате как руководитель проекта: первые 300 консультаций разобрали за пару дней, дальше ~30 обращений в день. На сайте стоит английская версия статьи.

---

## Что осталось доделать

- [ ] Заменить `REPLACE-WITH-PODCAST-URL` в `index.html` на ссылку на подкаст
- [ ] Задеплоить и привязать домен
- [ ] Обновить `Alex_Borunov_Master_CV.md`: строка про публикации в блок Фонда, ссылки на кейсы в буллеты Genomed и Lucent
- [ ] Свести должность за период Фонда: в РБК ты «руководитель справочной службы», в CV блок идет как Project Manager → Product Manager. Если рекрутер откроет ссылку, лучше чтобы одно объясняло другое
- [ ] Свести срок запуска ковидного сервиса: РБК пишет «полторы недели», в CV «within 2 weeks». На сайте стоит «in under two weeks», верное для обоих
- [ ] Опционально: скриншоты продуктов в кейсы 02 и 05
