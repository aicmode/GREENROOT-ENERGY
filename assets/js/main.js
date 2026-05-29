const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav-links");

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });
}

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    nav?.classList.remove("open");
    toggle?.setAttribute("aria-expanded", "false");
  });
});

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 }
  );

  document.querySelectorAll(".reveal").forEach((element) => {
    revealObserver.observe(element);
  });

  const formatAnimatedNumber = (value, decimals, suffix, shouldUseComma) => {
    const fixedValue = value.toFixed(decimals);
    const displayValue = shouldUseComma
      ? Number(fixedValue).toLocaleString("en-US", {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        })
      : fixedValue;

    return `${displayValue}${suffix}`;
  };

  const numberObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const element = entry.target;
        const target = Number(element.dataset.target || 0);
        const suffix = element.dataset.suffix || "";
        const decimals = Number(element.dataset.decimals || 0);
        const shouldUseComma = element.dataset.format === "comma";
        const duration = 1300;
        const start = performance.now();

        const tick = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const value = target * eased;
          element.textContent = formatAnimatedNumber(value, decimals, suffix, shouldUseComma);

          if (progress < 1) {
            requestAnimationFrame(tick);
          } else {
            element.textContent = formatAnimatedNumber(target, decimals, suffix, shouldUseComma);
          }
        };

        element.textContent = formatAnimatedNumber(0, decimals, suffix, shouldUseComma);
        requestAnimationFrame(tick);
        numberObserver.unobserve(element);
      });
    },
    { threshold: 0.4 }
  );

  document.querySelectorAll(".animated-number").forEach((element) => {
    numberObserver.observe(element);
  });
} else {
  document.querySelectorAll(".reveal").forEach((element) => {
    element.classList.add("visible");
  });
}
