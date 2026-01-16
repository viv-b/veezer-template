/*
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
FILE: init-modules.js

DESCRIPTION: Used to initialize all the modules used throughout the site. This happens
on each partial page refresh.
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
*/



import {
  initGsap
} from './gsap/init-gsap.js';
import {
  initCarousel
} from './components/component-carousel.js';
import {
  initFlipCard
} from './components/component-flip-card.js';
import {
  initSlider
} from './components/component-slider.js';
import {
  initFaq
} from './components/component-faq.js';
import {
  initYouTube
} from './components/component-youtube.js';
import {
  initModals
} from './init-modals.js';
import {
  initRecaptcha
} from './recaptcha.js';
import {
  initFleet
} from './components/component-fleet.js';
import {
  initTabs
} from './components/component-tabs.js';
import {
  initForm
} from './components/component-form.js';
import {
  initCarouselMini
} from './components/component-carousel-mini.js';
import {
  initMasonry
} from './init-masonry.js';
import {
  initEvents
} from './init-events.js';
import {
  initGsapBatchStagger
} from './gsap/init-gsap-batch-stagger.js';
import {
  initGsapFeatureSmooth
} from './components/component-feature-smooth.js';
import {
  initFsLightbox
} from './init-fs-lightbox.js';

function initModules() {

    initGsap();

    initCarousel();

    initFlipCard();

    initSlider();

    initFaq();

    initYouTube();

    initModals();

    initRecaptcha();

    initFleet();

    initTabs();

    initForm();

    initCarouselMini();

    initMasonry();

    initEvents();

    initGsapBatchStagger();

    initGsapFeatureSmooth();

    initFsLightbox();

};



export {initModules};