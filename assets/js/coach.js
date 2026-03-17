(() => {
  const coachData = [
    {
      number: '01',
      title: 'COACH 01',
      role: 'Beginner coach',
      bestFor: 'First climbs',
      focus: 'Footwork · Route reading · Confidence building',
      description:
        'A friendly starting point for first-time climbers who want cleaner foot placement, calmer sequencing, and a coach who makes the wall feel more approachable from the first session.',
      instagram: '@bhub.bouldering',
      instagramUrl: 'https://www.instagram.com/bhub.bouldering/',
      stageImage: './images/coaches/coach-01-stage.png',
      stageHoverImage: './images/coaches/coach-01-stage-hover.png',
      stageAlt: 'Coach 01 placeholder portrait.',
      stageHoverAlt: 'Coach 01 alternate placeholder portrait.',
      metrics: [
        { title: 'Beginner support', label: 'Focus' },
        { title: 'Movement flow', label: 'Style' },
        { title: 'Footwork', label: 'Strength' },
        { title: 'Confidence build', label: 'Outcome' }
      ]
    },
    {
      number: '02',
      title: 'COACH 02',
      role: 'Movement coach',
      bestFor: 'Technique tune-ups',
      focus: 'Body positioning · Efficient movement · Cleaner beta',
      description:
        'Best for climbers who already know the basics and want sharper technique. Sessions focus on body positioning, reducing wasted effort, and finding smoother solutions on the wall.',
      instagram: '@bhub.bouldering',
      instagramUrl: 'https://www.instagram.com/bhub.bouldering/',
      stageImage: './images/coaches/coach-02-stage.png',
      stageHoverImage: './images/coaches/coach-02-stage-hover.png',
      stageAlt: 'Coach 02 placeholder portrait.',
      stageHoverAlt: 'Coach 02 alternate placeholder portrait.',
      metrics: [
        { title: 'Technique drills', label: 'Focus' },
        { title: 'Body awareness', label: 'Style' },
        { title: 'Precision', label: 'Strength' },
        { title: 'Cleaner beta', label: 'Outcome' }
      ]
    },
    {
      number: '03',
      title: 'COACH 03',
      role: 'Progression coach',
      bestFor: 'Project confidence',
      focus: 'Reading movement · Coaching on the wall · Session progression',
      description:
        'A more progression-focused option for climbers who want direct feedback while working through harder sequences, stronger attempts, and better decision-making on real problems.',
      instagram: '@bhub.bouldering',
      instagramUrl: 'https://www.instagram.com/bhub.bouldering/',
      stageImage: './images/coaches/coach-03-stage.png',
      stageHoverImage: './images/coaches/coach-03-stage-hover.png',
      stageAlt: 'Coach 03 placeholder portrait.',
      stageHoverAlt: 'Coach 03 alternate placeholder portrait.',
      metrics: [
        { title: 'On-wall cues', label: 'Focus' },
        { title: 'Supportive push', label: 'Style' },
        { title: 'Progression', label: 'Strength' },
        { title: 'Stronger attempts', label: 'Outcome' }
      ]
    }
  ];

  const board = document.querySelector('[data-coach-board]');
  const tabs = Array.from(document.querySelectorAll('.coach-tab'));
  const tabTitles = Array.from(document.querySelectorAll('.coach-tab__title'));
  const tabRoles = Array.from(document.querySelectorAll('.coach-tab__role'));
  const stagePrimary = document.querySelector('[data-coach-stage-primary]');
  const stageSecondary = document.querySelector('[data-coach-stage-secondary]');
  const watermark = document.querySelector('[data-coach-watermark]');
  const number = document.querySelector('[data-coach-number]');
  const bestFor = document.querySelector('[data-coach-best-for]');
  const title = document.querySelector('[data-coach-name]');
  const focus = document.querySelector('[data-coach-focus]');
  const description = document.querySelector('[data-coach-description]');
  const instagram = document.querySelector('[data-coach-instagram]');
  const metrics = document.querySelector('[data-coach-metrics]');
  const arrows = Array.from(document.querySelectorAll('[data-direction]'));

  if (!board || tabs.length === 0) {
    return;
  }

  let activeIndex = tabs.findIndex((tab) => tab.getAttribute('aria-selected') === 'true');
  if (activeIndex < 0) {
    activeIndex = 0;
  }

  const renderMetrics = (items) => {
    if (!metrics) {
      return;
    }

    metrics.innerHTML = '';
    items.forEach((item) => {
      const article = document.createElement('article');
      article.className = 'coach-metric';
      article.innerHTML = `
        <span class="coach-metric__title">${item.title}</span>
        <span class="coach-metric__label">${item.label}</span>
      `;
      metrics.appendChild(article);
    });
  };

  const setActiveCoach = (nextIndex, moveFocus = false) => {
    const boundedIndex = (nextIndex + coachData.length) % coachData.length;
    activeIndex = boundedIndex;
    const coach = coachData[boundedIndex];

    tabs.forEach((tab, index) => {
      const selected = index === boundedIndex;
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
      if (moveFocus && selected) {
        tab.focus();
      }
    });

    if (tabTitles[boundedIndex]) {
      tabTitles[boundedIndex].textContent = coach.title;
    }

    if (tabRoles[boundedIndex]) {
      tabRoles[boundedIndex].textContent = coach.role;
    }

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
      watermark.textContent = coach.title;
    }
    if (number) {
      number.textContent = coach.number;
    }
    if (bestFor) {
      bestFor.textContent = coach.bestFor;
    }
    if (title) {
      title.textContent = coach.title;
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
    arrow.addEventListener('click', () => {
      const direction = arrow.getAttribute('data-direction');
      setActiveCoach(activeIndex + (direction === 'next' ? 1 : -1));
    });
  });

  setActiveCoach(activeIndex);
})();
