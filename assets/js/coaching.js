(() => {
  const coachData = [
    {
      number: '01',
      code: 'Adya Jaz',
      name: 'Adya Jaz',
      role: 'Beginner coach',
      bestFor: 'First climbs',
      focus: 'Footwork • Route reading • Confidence building',
      description: 'Adya Jaz guides first-time climbers through movement basics, cleaner foot placement, and simple route-reading cues so each climb feels more approachable, more enjoyable, and easier to understand from the start.',
      watermark: 'ADYA',
      instagram: '@adyascends',
      instagramUrl: 'https://www.instagram.com/adyascends?igsh=cHllc2wzeWpnemlm',
      stageImage: './images/coaches/coach-01-stage.png',
      stageHoverImage: './images/coaches/coach-01-stage-hover.png',
      stageAlt: 'Adya Jaz coaching portrait.',
      stageHoverAlt: 'Adya Jaz coaching portrait.',
      metrics: [
        { title: 'Beginner support', label: 'Focus' },
        { title: 'Movement flow', label: 'Style' },
        { title: 'Footwork', label: 'Strength' },
        { title: 'Confidence build', label: 'Outcome' }
      ]
    }
  ];

  const board = document.querySelector('[data-coach-board]');
  if (!board) {
    return;
  }

  const tabs = Array.from(document.querySelectorAll('[data-coach-tab]')).filter((tab) => !tab.hidden);
  const stagePrimary = document.querySelector('[data-stage-primary]');
  const stageSecondary = document.querySelector('[data-stage-secondary]');
  const watermark = document.querySelector('[data-coach-watermark]');
  const number = document.querySelector('[data-coach-number]');
  const bestFor = document.querySelector('[data-coach-best-for]');
  const name = document.querySelector('[data-coach-name]');
  const role = document.querySelector('[data-coach-role]');
  const focus = document.querySelector('[data-coach-focus]');
  const description = document.querySelector('[data-coach-description]');
  const instagram = document.querySelector('[data-coach-instagram]');
  const initialInstagramText = instagram ? instagram.textContent.trim() : '';
  const initialInstagramHref = instagram ? (instagram.getAttribute('href') || '').trim() : '';

  if (initialInstagramText) {
    coachData[0].instagram = initialInstagramText;
  }

  if (initialInstagramHref) {
    coachData[0].instagramUrl = initialInstagramHref;
  }
  const metricsWrap = document.querySelector('[data-coach-metrics]');
  const arrows = Array.from(document.querySelectorAll('[data-coach-arrow]'));

  let activeIndex = tabs.findIndex((tab) => tab.getAttribute('aria-selected') === 'true');
  if (activeIndex < 0) {
    activeIndex = 0;
  }

  tabs.forEach((tab, index) => {
    const coach = coachData[index];
    const titleNode = tab.querySelector('[data-tab-title]');
    const roleNode = tab.querySelector('[data-tab-role]');

    if (coach && titleNode) {
      titleNode.textContent = coach.code;
    }
    if (coach && roleNode) {
      roleNode.textContent = coach.role;
    }
  });

  const renderMetrics = (items) => {
    if (!metricsWrap) {
      return;
    }

    metricsWrap.innerHTML = '';
    items.forEach((item) => {
      const article = document.createElement('article');
      article.className = 'coach-metric';
      article.innerHTML = `
        <p class="coach-metric__title">${item.title}</p>
        <p class="coach-metric__label">${item.label}</p>
      `;
      metricsWrap.appendChild(article);
    });
  };

  const multipleCoaches = coachData.length > 1 && tabs.length > 1;

  const setActiveCoach = (index, moveFocus = false) => {
    const bounded = multipleCoaches ? (index + coachData.length) % coachData.length : 0;
    const coach = coachData[bounded];
    activeIndex = bounded;

    tabs.forEach((tab, tabIndex) => {
      const selected = tabIndex === bounded;
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
      if (selected && moveFocus) {
        tab.focus();
      }
    });

    board.dataset.activeCoach = coach.number;

    if (stagePrimary) {
      stagePrimary.src = coach.stageImage;
      stagePrimary.alt = coach.stageAlt;
    }
    if (stageSecondary) {
      stageSecondary.src = coach.stageHoverImage;
      stageSecondary.alt = coach.stageHoverAlt;
    }
    if (watermark) {
      watermark.textContent = coach.watermark;
    }
    if (number) {
      number.textContent = coach.number;
    }
    if (bestFor) {
      bestFor.textContent = coach.bestFor;
    }
    if (name) {
      name.textContent = coach.name;
    }
    if (role) {
      role.textContent = coach.role;
    }
    if (focus) {
      focus.textContent = coach.focus;
    }
    if (description) {
      description.textContent = coach.description;
    }
    if (instagram) {
      instagram.textContent = coach.instagram;
      instagram.href = coach.instagramUrl;
    }

    renderMetrics(coach.metrics);
  };

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => setActiveCoach(index));

    tab.addEventListener('keydown', (event) => {
      if (!multipleCoaches) {
        return;
      }

      if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
        event.preventDefault();
        setActiveCoach(index + 1, true);
      }
      if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
        event.preventDefault();
        setActiveCoach(index - 1, true);
      }
      if (event.key === 'Home') {
        event.preventDefault();
        setActiveCoach(0, true);
      }
      if (event.key === 'End') {
        event.preventDefault();
        setActiveCoach(coachData.length - 1, true);
      }
    });
  });

  arrows.forEach((arrow) => {
    if (!multipleCoaches) {
      arrow.setAttribute('aria-disabled', 'true');
      arrow.tabIndex = -1;
      return;
    }

    arrow.removeAttribute('aria-disabled');
    arrow.addEventListener('click', () => {
      const direction = arrow.getAttribute('data-direction');
      setActiveCoach(activeIndex + (direction === 'next' ? 1 : -1));
    });
  });

  setActiveCoach(activeIndex);
})();
