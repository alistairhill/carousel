window.onload = function() {
  var example1 = new alistair.Carousel("example1");
}

var alistair = alistair || {};

alistair.Carousel = function(name, height) {
  // this.title = title;
  // this.description = description;
  this.name = name;
  this.height = height;
  this.slide = new alistair.Slide(name);
  this.activate();
}
alistair.Carousel.prototype = {
  activate: function() {
    this.setSlideWidth();
    this.initializeSlidePosition();
    this.loadListeners();
  },
  loadListeners: function() {
  },
  slideMovement: function(direction) {
  },
  getCarouselWidth: function() {
    var caro = document.querySelector(".carousel");
    return caro.offsetWidth;
  },
  setSlideWidth: function() {
    this.slide.element.style.width = this.slide.width + "px";
  },
  initializeSlidePosition: function() {
    var caroMiddle = this.getCarouselWidth() / 2;
    var slotMiddle = this.slide.slots[this.slide.currentSlot].width / 2;
    this.slide.leftPosition = (caroMiddle - slotMiddle);
    this.setSlidePosition(this.slide.leftPosition);
  },
  setSlidePosition: function(num) {
    this.slide.element.style.left = num + "px";
  },
  resizeSlide: function() {
  }
}

alistair.Slide = function(name) {
  this.slots = [];
  this.width = 1;
  this.currentSlot = 0;
  this.leftPosition = 0;
  this.element = document.querySelector("."+ name);
  this.makeSlots(name);
}
alistair.Slide.prototype = {
  makeSlots: function(name) {
    var allSlots = document.querySelector("."+ name).children;
    for (var i = 0; i < allSlots.length; i++) {
      this.slots.push(new alistair.Slot(allSlots[i].offsetWidth));
    }
    this.getSlideWidth();
  },
  getSlideWidth: function() {
    for (var i = 0; i < this.slots.length; i++) {
      this.width += this.slots[i].width;
    }
  }
}

alistair.Slot = function(width) {
  // this.imageName = imageName;
  this.width = width;
}
