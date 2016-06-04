window.onload = function() {

  var example1 = new alistair.Carousel("example1");
}

var alistair = alistair || {};
alistair.Carousel = alistair.Carousel || {};

alistair.Carousel = function(label) {
  this.label = label;
  this.slots = document.querySelector("."+ this.label).children;
  this.activate();
}

alistair.Carousel.prototype = {
  activate: function() {
    this.setSlideWidth()
  },
  getSlideWidth: function(marginSize) {
    var slotsWidth = 0;
    for (var i = 0; i < this.slots.length; i++) {
      slotsWidth += (this.slots[i].offsetWidth + 1);
    }
    return slotsWidth;
  },
  setSlideWidth: function() {
    var slide = document.querySelector("."+ this.label);
    var imagesWidth = this.getSlideWidth();
    slide.style.width = imagesWidth + "px";
  }
}
