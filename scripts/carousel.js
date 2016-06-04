window.onload = function() {

  var eg1Imgs = ["eg1-1.jpg", "eg2-2.jpg", "eg2-3.jpg", "eg3-4.jpg", "eg4-5.jpg"];
  var example1 = new alistair.Carousel("example1", eg1Imgs);
}

var alistair = alistair || {};
alistair.Carousel = alistair.Carousel || {};

alistair.Carousel = function(label, images) {
  this.label = label;
  this.images = images;

}
