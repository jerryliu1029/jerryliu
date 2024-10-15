// Custom cursor
document.addEventListener("DOMContentLoaded", function () {
  const customCursor = document.getElementById("customCursor");

  document.addEventListener("mousemove", function (e) {
    customCursor.style.left = e.pageX + "px";
    customCursor.style.top = e.pageY + "px";
  });

  // Custom cursor for text-block
  const aboutText = document.getElementById("text-block");

  aboutText.addEventListener("mouseenter", function () {
    customCursor.classList.add("rect");
  });

  aboutText.addEventListener("mouseleave", function () {
    customCursor.classList.remove("rect");
  });

  // Custom cursor for links
  const links = document.querySelectorAll("a");

  links.forEach((link) => {
    link.addEventListener("mouseenter", function () {
      customCursor.classList.add("link-hover");
    });

    link.addEventListener("mouseleave", function () {
      customCursor.classList.remove("link-hover");
    });
  });
});

// Toggles socials
document.getElementById("socials").addEventListener("click", function (event) {
  event.preventDefault(); // Prevent the default link behavior
  document.getElementById("socials-icons").classList.toggle("socials-visible");
  document.getElementById("container").classList.toggle("container-socials");

  const menuItems = document.getElementsByClassName("menu-item");
  for (let i = 0; i < menuItems.length; i++) {
    menuItems[i].classList.toggle("menu-item-shifted");
  }

  const otherLinks = document.querySelectorAll(".menu-item:not(#socials)");
  otherLinks.forEach((link) => {
    link.classList.toggle("disabled-link");
  });
});

// Toggles aboutMe
document.getElementById("aboutMe").addEventListener("click", function (event) {
  event.preventDefault(); // Prevent the default link behavior
  document.getElementById("about-text").classList.toggle("about-visible");
  document.getElementById("container").classList.toggle("container-about");

  const menuItems = document.getElementsByClassName("menu-item");
  for (let i = 0; i < menuItems.length; i++) {
    menuItems[i].classList.toggle("menu-item-shifted");
  }

  const otherLinks = document.querySelectorAll(".menu-item:not(#aboutMe)");
  otherLinks.forEach((link) => {
    link.classList.toggle("disabled-link");
  });
});

// Hide socials-icons when clicking outside
document.addEventListener("click", function (event) {
  const socialsIcons = document.getElementById("socials-icons");
  const socialsMenuItem = document.getElementById("socials");

  if (
    socialsIcons &&
    !socialsIcons.contains(event.target) &&
    !socialsMenuItem.contains(event.target)
  ) {
    if (socialsIcons.classList.contains("socials-visible")) {
      socialsIcons.classList.remove("socials-visible");
      document
        .getElementById("container")
        .classList.remove("container-socials");

      const menuItems = document.getElementsByClassName("menu-item");
      for (let i = 0; i < menuItems.length; i++) {
        menuItems[i].classList.remove("menu-item-shifted");
      }

      const otherLinks = document.querySelectorAll(".menu-item:not(#socials)");
      otherLinks.forEach((link) => {
        link.classList.remove("disabled-link");
      });
    }
  }
});
