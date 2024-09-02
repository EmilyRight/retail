import { detectDevice } from './components/detectDevice';
// import { videoTeaser } from './components/videoTeaser';
import { WOW } from './vendor/wow.min.js';
import { gaPush, gtmSet } from './components/gtmEvents';
import { closeModal, openModal } from './components/modal';
import Swiper from './vendor/swiper.min.js';

// import {fieldListener, validateFields, keyField, prepField} from './components/inputs';

document.addEventListener('DOMContentLoaded', () => {
  const $doc = document; const
    $body = document.querySelector('body');

  detectDevice();
  // videoTeaser();
  new WOW().init();
  gtmSet();
  faqOpener();
  setCurrentYear();

  $body.addEventListener('click', (e) => {
    const _class = 'teaser-more';
    const $trg = (e.target.classList.contains(_class)) ? e.target : e.target.closest(`.${_class}`);
    if ($trg) {
      const nextSection = $doc.querySelector('.section--about');
      goTo(nextSection);
    }
  });

  const $fotos = $doc.querySelectorAll('.js-showbig');
  $fotos.forEach((foto) => foto.addEventListener('click', (e) => {
    e.preventDefault();
    const bigImage = foto.getAttribute('href'); console.log(bigImage);
    $doc.querySelector('.gallery-img').setAttribute('src', bigImage);
    openModal('#gallery-modal-box');
  }));

  function faqOpener() {
    const cl = 'active';

    const $items = $doc.querySelectorAll('.faq__item');
    $items.forEach((itm) => itm.addEventListener('click', (e) => {
      e.preventDefault();
      const $self = e.target;
      const fq = itm.querySelector('.item');

      if ($self.hasAttribute('href')) { return; }

      if (fq.classList.contains(cl)) {
        // fq.classList.remove(cl);
        $items.forEach((fi) => fi.querySelector('.item').classList.remove(cl));
      } else {
        $items.forEach((fi) => fi.querySelector('.item').classList.remove(cl));
        fq.classList.add(cl);
      }
    }));
  }

  const swiperP = new Swiper('.photoslider', {
    navigation: {
      nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev',
    },

    slidesPerView: 2.45, // 3
    spaceBetween: 24,
    // freeMode: false,
    breakpoints: {
      320: { freeMode: true, slidesPerView: 'auto', spaceBetween: 0 },
      600: { freeMode: false, slidesPerView: 1.3, spaceBetween: 16 },
    },
  });
});

function setCurrentYear() {
  const yearSpan = document.querySelectorAll('.current-year');
  yearSpan.forEach((span) => {
    span.innerHTML = new Date().getFullYear().toString();
  });
}
function goTo(el) {
  const offs = 0;
  const y = el.getBoundingClientRect().top + window.scrollY + offs;
  window.scrollTo({ top: y, behavior: 'smooth' }); // element.scrollIntoView();
}
