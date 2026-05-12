document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const menuToggle = document.querySelector("[data-menu-toggle]");
  const menuClose = document.querySelector("[data-menu-close]");
  const mainNav = document.querySelector("[data-main-nav]");
  const navButtons = document.querySelectorAll(".nav-button");
  const filterToggle = document.querySelector("[data-filter-toggle]");
  const filterClose = document.querySelector("[data-filter-close]");
  const filters = document.querySelector("[data-filters]");

  const closeNav = () => {
    if (!mainNav || !menuToggle) return;
    mainNav.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    body.classList.remove("menu-open");
  };

  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = mainNav.classList.toggle("is-open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      body.classList.toggle("menu-open", isOpen);
    });
  }

  if (menuClose) {
    menuClose.addEventListener("click", closeNav);
  }

  navButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const currentItem = button.closest(".nav-item");
      const isOpen = currentItem.classList.contains("is-open");

      navButtons.forEach((otherButton) => {
        otherButton.setAttribute("aria-expanded", "false");
        otherButton.closest(".nav-item")?.classList.remove("is-open");
      });

      currentItem.classList.toggle("is-open", !isOpen);
      button.setAttribute("aria-expanded", String(!isOpen));
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    closeNav();
    closeFilters();
    navButtons.forEach((button) => {
      button.setAttribute("aria-expanded", "false");
      button.closest(".nav-item")?.classList.remove("is-open");
    });
  });

  const openFilters = () => {
    if (!filters) return;
    filters.classList.add("is-open");
    body.classList.add("filters-open");
  };

  function closeFilters() {
    if (!filters) return;
    filters.classList.remove("is-open");
    body.classList.remove("filters-open");
  }

  if (filterToggle) {
    filterToggle.addEventListener("click", openFilters);
  }

  if (filterClose) {
    filterClose.addEventListener("click", closeFilters);
  }

  document.querySelectorAll("[data-tabs]").forEach((tabsRoot) => {
    const tabButtons = tabsRoot.querySelectorAll("[data-tab]");
    const panels = tabsRoot.querySelectorAll("[data-panel]");

    tabButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const target = button.dataset.tab;

        tabButtons.forEach((tabButton) => {
          const active = tabButton === button;
          tabButton.classList.toggle("is-active", active);
          tabButton.setAttribute("aria-selected", String(active));
        });

        panels.forEach((panel) => {
          panel.classList.toggle("is-active", panel.dataset.panel === target);
        });
      });
    });
  });

  document.querySelectorAll("[data-quantity]").forEach((quantityRoot) => {
    const input = quantityRoot.querySelector("input");
    const minus = quantityRoot.querySelector("[data-qty-minus]");
    const plus = quantityRoot.querySelector("[data-qty-plus]");

    const updateQuantity = (delta) => {
      const min = Number(input.getAttribute("min")) || 1;
      const current = Number(input.value) || min;
      input.value = Math.max(min, current + delta);
    };

    minus?.addEventListener("click", () => updateQuantity(-1));
    plus?.addEventListener("click", () => updateQuantity(1));
  });

  document.querySelectorAll("form[action='#']").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
    });
  });
});
