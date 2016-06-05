window.onload = function() {
  var example1 = new alistair.Carousel("example1");
  var example2 = new alistair.Carousel("example2");
}

var alistair = alistair || {};

alistair.Carousel = function(name) {
  this.name = ("."+ name);
  this.center = 0;
  this.slide = new alistair.Slide(this.name);
  this.activate();
}
alistair.Carousel.prototype = {
  activate: function() {
    this.setSlideWidth();
    this.moveSlide();
    this.loadListeners();
  },
  loadListeners: function() {
    // previous img button
    var leftControl = document.querySelector(this.name + " .carousel-left");
    leftControl.addEventListener("click", this.previousSlot.bind(this));
    // next img button
    var rightControl = document.querySelector(this.name + " .carousel-right");
    rightControl.addEventListener("click", this.nextSlot.bind(this));
    // if the window is resized, then widths and positioning are updated
    window.addEventListener("resize", this.resizeSlide.bind(this));
  },
  nextSlot: function() {
    if (this.slide.currentSlot < this.slide.slots.length-1) {
      this.slide.removeCurrentOpacity();
      this.slide.currentSlot++;
      this.moveSlide();
      this.slide.addCurrentOpacity();
    }
  },
  previousSlot: function() {
    if (this.slide.currentSlot > 0) {
      this.slide.removeCurrentOpacity();
      this.slide.currentSlot--;
      this.moveSlide();
      this.slide.addCurrentOpacity();
    }
  },
  getCaroCenter: function() {
    var carouselElement = document.querySelector(".carousel");
    this.center = carouselElement.offsetWidth / 2;
    return this.center;
  },
  setSlideWidth: function() {
    this.slide.element.style.width = this.slide.width + "px";
  },
  moveSlide: function() {
    this.slide.leftPosition = (this.getCaroCenter() - this.slide.getSlidePosition());
    this.setSlidePosition();
  },
  setSlidePosition: function() {
    this.slide.element.style.left = this.slide.leftPosition + "px";
  },
  resizeSlide: function() {
    this.slide.updateAllSlotWidths();
    this.setSlideWidth();
    this.moveSlide();
  }
}

alistair.Slide = function(name) {
  this.slots = [];
  this.width = 0;
  this.currentSlot = 0;
  this.leftPosition = 0;
  this.element = document.querySelector(name + " .slide");
  this.allSlots = document.querySelector(name + " .slide").children;
  this.initializeSlots();
}
alistair.Slide.prototype = {
  initializeSlots: function() {
    for (var i = 0; i < this.allSlots.length; i++) {
      // add initial width of 0 to available slots
      this.slots.push(new alistair.Slot(0));
    }
    this.updateAllSlotWidths();
    this.addCurrentOpacity();
  },
  updateAllSlotWidths: function() {
    for (var i = 0; i < this.slots.length; i++) {
      // updating latest width based on the auto width of images
      this.slots[i].width = this.allSlots[i].offsetWidth;
    }
    this.updateSlideWidth();
  },
  updateSlideWidth: function() {
    this.width = 0;
    for (var i = 0; i < this.allSlots.length; i++) {
      // gets the latest slide width, based on slot widths + padding
      this.width += (this.slots[i].width + this.slots[i].padding);
    }
  },
  getSlidePosition: function() {
    return (this.getPreviousSlotWidths() + this.currentSlotCenter());
  },
  getPreviousSlotWidths: function() {
    var previousSlotWidths = 0;
    for (var i = 0; i < this.currentSlot; i++) {
      // add up previous slot widths for slider positioning
      previousSlotWidths += this.slots[i].width;
    }
    return previousSlotWidths;
  },
  removeCurrentOpacity() {
    this.allSlots[this.currentSlot].classList.remove("current");
  },
  addCurrentOpacity() {
    this.allSlots[this.currentSlot].classList.add("current");
  },
  currentSlotCenter: function() {
    return (this.slots[this.currentSlot].width / 2);
  }
}

alistair.Slot = function(width) {
  this.width = width;
  this.padding = 4;
}
