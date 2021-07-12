// ==UserScript==
// @name         Super bot
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       George Rozanov
// @match        https://www.google.com/*
// @match        https://yandex.ru/*
// @match        https://napli.ru/*
// @match        https://psyholog.me/*
// @match        https://xn----7sbab5aqcbiddtdj1e1g.xn--p1ai/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

let sites = {
    "napli.ru":["10 самых популярных шрифтов от Google", "Отключение редакций и ревизий в WordPress", "Вывод произвольных типов записей и полей в WordPress"],
    "psyholog.me":["Центр здоровых отношений", "Услуги центра здоровых отношений", "Чекалина Елена психолог"],
    "xn----7sbab5aqcbiddtdj1e1g.xn--p1ai":["Гобой", "Тромбон", "Сузафон", "Виолончель", "Арфа"]
}
let start = ["https://www.google.com", "https://yandex.ru"];
let site = Object.keys(sites)[getRandom(0, Object.keys(sites).length)];
let keywords = sites[site];
let keyword = keywords[getRandom(0, keywords.length)];
let yandexInput = document.getElementsByName('text')[0];
let googleInput = document.getElementsByName("q")[0];
let btn = document.getElementsByClassName("button mini-suggest__button button_theme_search button_size_search i-bem button_js_inited")[0];
let btnK = document.getElementsByName("btnK")[0];
let links = document.links;
let i=0;
let hostStart = start[getRandom(0, start.length)];
let button;

if (location.hostname=="yandex.ru") button = btn;
else if (location.hostname=="www.google.com") button = btnK;

if (button !== undefined) {
    document.cookie = `site = ${site}`;
}else if(location.hostname == "yandex.ru" || location.hostname == "www.google.com"){
    site = getCookie("site");
}else{
    site = location.hostname;
}
console.log(site);
if (button !== undefined) {
    document.cookie = `site = ${site}`;
    if (location.hostname=="yandex.ru"){
    let timerId = setInterval(() => {
        yandexInput.value += keyword[i];
        i++;
        if (i == keyword.length){
            clearInterval(timerId);
            button.click();}
            },600);
            console.log(location.hostname);
        }else if (location.hostname=="www.google.com") {
        let timerId = setInterval(() => {
            googleInput.value += keyword[i];
        i++;
        if (i == keyword.length){
            clearInterval(timerId);
            button.click();
            }
            },650);
            console.log(location.hostname);}
}else if (location.hostname == site) {
            console.log("Мы на "+site);
            setInterval(()=>{
                let index = getRandom(0, links.length);
                console.log(links.length);
            if (getRandom(0, 101)>=80) {
               location.href = hostStart;
            }else if (links[index].href.indexOf(site) !== -1) {
               links[index].click();
                   }
        }, getRandom(3000, 4500));

} else {
    let nextPage = true;
    for (let i = 0; i<links.length; i++) {
        if (links[i].href.includes(site)){
            let link = links[i];
            nextPage = false;
            console.log("Найдена строка "+link);
            setTimeout(() => {
                location.href = link;
            }, getRandom(3000,5000));
            break;
        }
    }
    console.log(document.querySelector("[aria-label='Текущая страница 5']"));

    if (location.hostname=="yandex.ru") {
        if (document.querySelector("[aria-label='Текущая страница 5']") != null) {
            console.log('URA!!!');
            let nextPage = false;
            location.href = hostStart;
        }
    }else if (location.hostname=="www.google.com") {
        if (document.querySelector(".YyVfkd").innerText == "5") {
        let nextPage = false;
        location.href = hostStart;
    }
    }

    if (nextPage) {
            console.log("next");
        if (location.hostname=="yandex.ru"){
            setTimeout(() => {document.querySelector('[aria-label="Следующая страница"]').click();
             }, getRandom(3000,4500));
        } else if (location.hostname=="www.google.com") {
            setTimeout(() => {pnnext.click();
            }, getRandom(3000,4500));
        }
    }
}

function getRandom(min, max) {
    return Math.floor(Math.random()*(max-min)+min);
}
function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}
