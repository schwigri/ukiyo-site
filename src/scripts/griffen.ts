export const griffen: Griffen = {
  blurContent,
};

//----------------------
// State
//----------------------

let isReady = false;

//----------------------
// APIs
//----------------------

function blurContent() {
  getDocument().body.classList.toggle("blurred");
}

function getDocument() {
  return document;
}

function ready(cb: () => void) {
  if (isReady || getDocument().readyState === "complete") {
    cb();
  } else {
    getDocument().addEventListener("DOMContentLoaded", cb);
  }
}

export default griffen;

//----------------------
// Initialization
//----------------------

getDocument().addEventListener("DOMContentLoaded", function () {
  isReady = true;
});

ready(function () {
  const header = getDocument().getElementById("header");
  const scrollThreshold = getDocument().getElementById("scroll-threshold");

  if (header && scrollThreshold) {
    const globalObserver = new IntersectionObserver(
      function (entries) {
        if (!entries[0].isIntersecting) {
          getDocument().body.classList.add("scrolled");
        } else {
          getDocument().body.classList.remove("scrolled");
        }
      },
      {
        rootMargin: `${header.getBoundingClientRect().height / 2}px 0px 0px 0px`,
        threshold: 0,
      },
    );

    globalObserver.observe(scrollThreshold);
    console.log(globalObserver);
  }
});
