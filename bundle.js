(()=>{"use strict";var e={};function t(e,t,n,r,o,c,a){var u=document.querySelector("#card-template").content.querySelector(".places__item").cloneNode(!0),i=u.querySelector(".card__image"),l=u.querySelector(".card__title"),s=u.querySelector(".card__delete-button"),d=u.querySelector(".card__like-button"),p=u.querySelector(".card__like-count");return l.textContent=e,i.src=t,i.alt=e,p.textContent=c.likes.length,c.owner._id!==a?s.style.display="none":s.addEventListener("click",(function(){return n(u,c._id)})),d.addEventListener("click",(function(){return r(d,c._id,p)})),i.addEventListener("click",(function(){return o(e,t)})),u}function n(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",o)}function r(e){e&&(e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",o))}function o(e){if("Escape"===e.key){var t=document.querySelector(".popup_is-opened");t&&r(t)}}function c(e){e.querySelector(".popup__close").addEventListener("click",(function(){return r(e)})),e.addEventListener("click",(function(t){t.target===e&&r(document.querySelector(".popup_is-opened"))}))}function a(e,t,n){var r=e.closest("form").querySelector("#".concat(e.id,"-error"));r&&(e.classList.add(n.inputErrorClass),r.textContent=t,r.classList.add(n.errorClass))}function u(e,t){var n=e.closest("form").querySelector("#".concat(e.id,"-error"));n&&(e.classList.remove(t.inputErrorClass),n.textContent="",n.classList.remove(t.errorClass))}function i(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.classList.remove(n.inactiveButtonClass),t.disabled=!1):(t.classList.add(n.inactiveButtonClass),t.disabled=!0)}function l(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);n.forEach((function(e){u(e,t)})),i(n,r,t)}e.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),(()=>{var t;e.g.importScripts&&(t=e.g.location+"");var n=e.g.document;if(!t&&n&&(n.currentScript&&"SCRIPT"===n.currentScript.tagName.toUpperCase()&&(t=n.currentScript.src),!t)){var r=n.getElementsByTagName("script");if(r.length)for(var o=r.length-1;o>-1&&(!t||!/^http(s?):/.test(t));)t=r[o--].src}if(!t)throw new Error("Automatic publicPath is not supported in this browser");t=t.replace(/^blob:/,"").replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),e.p=t})();var s={baseUrl:"https://nomoreparties.co/v1/wff-cohort-32",headers:{authorization:"0f00c5bc-ccf0-4b81-a6de-c8d6484c5381","Content-Type":"application/json"}};function d(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}const p=e.p+"assets/logo.svg";function f(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}var m,y,v=document.querySelector(".places__list"),h=document.querySelector(".profile__image"),_=document.querySelector(".logo"),S=document.querySelector(".profile__edit-button"),b=document.querySelector(".profile__add-button"),g=document.querySelector(".profile__avatar-edit-button"),q=document.querySelector(".profile__title"),C=document.querySelector(".profile__description"),E=document.querySelector("#edit-profile-popup"),L=document.querySelector("#add-card-popup"),k=document.querySelector("#image-preview-popup"),x=document.querySelector("#delete-confirm-popup"),w=document.querySelector("#avatar-edit-popup"),A=E.querySelector(".popup__form"),U=L.querySelector(".popup__form"),T=x.querySelector(".popup__form"),j=w.querySelector(".popup__form"),P=A.querySelector('input[name="name"]'),B=A.querySelector('input[name="description"]'),D=U.querySelector('input[name="name"]'),O=U.querySelector('input[name="link"]'),I=j.querySelector('input[name="avatar"]'),N={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"};function M(e,t){var r=k.querySelector(".popup__image"),o=k.querySelector(".popup__caption");r.src=t,r.alt=e,o.textContent=e,n(k)}function $(e,t,n){(e.classList.contains("card__like-button_is-active")?function(e){return fetch("".concat(s.baseUrl,"/cards/likes/").concat(e),{method:"DELETE",headers:s.headers}).then(d)}(t):function(e){return fetch("".concat(s.baseUrl,"/cards/likes/").concat(e),{method:"PUT",headers:s.headers}).then(d)}(t)).then((function(t){e.classList.toggle("card__like-button_is-active"),n.textContent=t.likes.length})).catch((function(e){return console.log(e)}))}function J(e,t){n(x),T.onsubmit=function(n){n.preventDefault(),function(e){return fetch("".concat(s.baseUrl,"/cards/").concat(e),{method:"DELETE",headers:s.headers}).then(d)}(t).then((function(){!function(e){e.remove()}(e),r(x)})).catch((function(e){return console.log(e)}))}}Promise.all([fetch("".concat(s.baseUrl,"/users/me"),{headers:s.headers}).then(d),fetch("".concat(s.baseUrl,"/cards"),{headers:s.headers}).then(d)]).then((function(e){var n,r,o=(r=2,function(e){if(Array.isArray(e))return e}(n=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c,a,u=[],i=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;i=!1}else for(;!(i=(r=c.call(n)).done)&&(u.push(r.value),u.length!==t);i=!0);}catch(e){l=!0,o=e}finally{try{if(!i&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(l)throw o}}return u}}(n,r)||function(e,t){if(e){if("string"==typeof e)return f(e,t);var n={}.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?f(e,t):void 0}}(n,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),c=o[0],a=o[1];m=c._id,q.textContent=c.name,C.textContent=c.about,h.style.backgroundImage="url(".concat(c.avatar,")"),_.src=p,a.forEach((function(e){var n=t(e.name,e.link,J,$,M,e,m);v.append(n)}))})).catch((function(e){return console.log(e)})),S.addEventListener("click",(function(){P.value=q.textContent,B.value=C.textContent,l(A,N),n(E)})),b.addEventListener("click",(function(){l(U,N),n(L)})),g.addEventListener("click",(function(){l(j,N),n(w)})),A.addEventListener("submit",(function(e){e.preventDefault();var t,n,o=A.querySelector(".popup__button");o.textContent="Сохранение...",(t=P.value,n=B.value,fetch("".concat(s.baseUrl,"/users/me"),{method:"PATCH",headers:s.headers,body:JSON.stringify({name:t,about:n})}).then(d)).then((function(e){q.textContent=e.name,C.textContent=e.about,r(E)})).catch((function(e){return console.log(e)})).finally((function(){return o.textContent="Сохранить"}))})),U.addEventListener("submit",(function(e){e.preventDefault();var n,o,c=U.querySelector(".popup__button");c.disabled||(c.disabled=!0,c.textContent="Сохранение...",(n=D.value,o=O.value,fetch("".concat(s.baseUrl,"/cards"),{method:"POST",headers:s.headers,body:JSON.stringify({name:n,link:o})}).then(d)).then((function(e){var n=t(e.name,e.link,J,$,M,e,m);v.prepend(n),r(L),U.reset(),l(U,N)})).catch((function(e){return console.log(e)})).finally((function(){c.textContent="Создать",c.disabled=!1})))})),T.addEventListener("submit",(function(e){return e.preventDefault()})),j.addEventListener("submit",(function(e){e.preventDefault();var t,n=j.querySelector(".popup__button");n.textContent="Сохранение...",(t=I.value,fetch("".concat(s.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:s.headers,body:JSON.stringify({avatar:t})}).then(d)).then((function(e){h.style.backgroundImage="url(".concat(e.avatar,")"),r(w),j.reset(),l(j,N)})).catch((function(e){return console.log(e)})).finally((function(){return n.textContent="Сохранить"}))})),c(E),c(L),c(k),c(x),c(w),y=N,Array.from(document.querySelectorAll(y.formSelector)).forEach((function(e){!function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);n.forEach((function(e){e.addEventListener("input",(function(){!function(e,t){e.validity.valueMissing?a(e,"Вы пропустили это поле",t):e.validity.tooShort?a(e,"Минимальное количество символов: 2. Длина текста сейчас: ".concat(e.value.length),t):e.validity.patternMismatch?a(e,e.dataset.patternError||"Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы",t):e.validity.typeMismatch?a(e,"Введите корректный URL",t):u(e,t)}(e,t),i(n,r,t)}))})),i(n,r,t)}(e,y)}))})();