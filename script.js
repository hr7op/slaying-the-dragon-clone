const count_tags = document.querySelectorAll("count");

const stats = [];

count_tags.forEach((numbers) => {
  stats.push(numbers.innerHTML);
  numbers.innerHTML = 0;
});

function formatNumber(num) {
  return new Intl.NumberFormat().format(num);
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function loopWithDelay1(element, index) {
  let j = parseInt(stats[index]);
  for (let i = 0, x = j / 35; i <= j; i = i + x) {
    await delay(50);
    element.innerHTML = formatNumber(Math.floor(i));
  }
  element.innerHTML = formatNumber(j);
}

let i = 0;

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        loopWithDelay1(entry.target, i);
        observer.unobserve(entry.target);
        i++;
      }
    });
  },

  {
    threshold: 0.8,
  }
);

async function loopWithDelay2(element) {
  for (let i = 1, j = parseInt(stats[3]); i <= j; i++) {
    await delay(130);
    element.innerHTML = formatNumber(i);
  }
}

const observer2 = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        loopWithDelay2(entry.target);
        observer2.unobserve(entry.target);
      }
    });
  },

  {
    threshold: 0.8,
  }
);

count_tags.forEach((numbers, index) => {
  if (index !== 3) {
    observer.observe(numbers);
  } else {
    observer2.observe(numbers);
  }
});
