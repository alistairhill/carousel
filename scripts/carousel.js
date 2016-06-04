window.onload = function() {

  var eg1Imgs = ["eg1-1.jpg", "eg1-2.jpg", "eg1-3.jpg", "eg1-4.jpg", "eg1-5.jpg"];
  var example1 = new alistair.Carousel("example1", eg1Imgs);
}

var alistair = alistair || {};
alistair.Carousel = alistair.Carousel || {};

alistair.Carousel = function(label, images) {
  this.label = label;
  this.loadImages(images);
}

alistair.Carousel.prototype = {
  loadImages: function(images) {
    for (var i = 0; i < images.length; i++) {
      var slide = document.querySelector("." + this.label);
      var div = document.createElement("DIV");
      div.className = "slot";
      var img = document.createElement("IMG");
      slide.appendChild(div);
      div.appendChild(img).src = "images/" + images[i];
    }
  }
}
