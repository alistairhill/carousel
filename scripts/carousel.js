window.onload = function() {
  var example1 = new alistair.Carousel("example1");
  var example2 = new alistair.Carousel("example2");

}

var alistair = alistair || {};

alistair.Carousel = function(name) {
  this.name = ("."+ name);
  this.element = document.querySelector(".carousel");
  this.center = 0;
  this.slide = new alistair.Slide(this.name);
  this.leftControl = document.querySelector(this.name + " .carousel-left");
  this.rightControl = document.querySelector(this.name + " .carousel-right");
  this.activate();
}
alistair.Carousel.prototype = {
  activate: function() {
    this.setSlideWidth();
    this.moveSlide();
    this.loadListeners();
  },
  loadListeners: function() {
    this.leftControl.addEventListener("click", this.previousSlot.bind(this));
    this.rightControl.addEventListener("click", this.nextSlot.bind(this));
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
    this.center = this.element.offsetWidth / 2;
    return this.center;
  },
  getCaroHeight: function(percent) {
    return window.innerHeight / 100 * percent;
  },
  updateCaroHeight: function(percent) {
    this.element.style.height = this.getCaroHeight(percent) + "px";
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
    this.slide.updateSlotWidths();
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
      this.slots.push(new alistair.Slot(0));
    }
    this.updateSlotWidths();
    this.addCurrentOpacity();
  },
  updateSlotWidths: function() {
    for (var i = 0; i < this.slots.length; i++) {
      this.slots[i].width = this.allSlots[i].offsetWidth;
    }
    this.getSlideWidth();
  },
  getSlideWidth: function() {
    this.width = 1;
    for (var i = 0; i < this.allSlots.length; i++) {
      this.width += this.slots[i].width;
    }
  },
  getSlidePosition: function() {
    return (this.getPreviousSlotWidths() + this.currentSlotCenter());
  },
  getPreviousSlotWidths: function() {
    var widthTotal = 0;
    for (var i = 0; i < this.currentSlot; i++) {
      widthTotal += this.slots[i].width;
    }
    return widthTotal;
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
}
