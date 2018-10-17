import dogUrl from './dog.png';
import { fabric } from 'fabric';

//Create canvas object
var canvas1 = new fabric.Canvas('c', {backgroundColor:'#ffff99', isDrawingMode: false})

//create an rectangle object
var rect = new fabric.Rect({
  left: 150,
  top: 150,
  fill: 'red',
  width: 50,
  height: 50
});

//rotate the rectangle
rect.animate('angle', 90, {
  //bind this animation to this canvas
  onChange: canvas1.renderAll.bind(canvas1),
  //animation time is 2000
  duration: 2000,
  //shake
  easing: fabric.util.ease.easeOutBounce
})



// "add" rectangle onto canvas
canvas1.add(rect);

// I draw three lines hrer
// M is my start point x = 0, y = 0
// L is line to, x = 0, y = 150 and x = 200, y = 150
// and z close the path
var path = new fabric.Path('M 0 0 L 0 150 L 200 150 z');

// I set the color for the object I draw
// Try remove z, you find difference
path.set({ fill: 'red', stroke: 'green', opacity: 0.5 })

canvas1.add(path);

// I create a ball
var circle = new fabric.Circle({
  radius: 25,
  fill: 'green',
  left: 20,
  top: 300
});

// Ball animation
circle.animate('top', 150, {
  //bind this animation to this canvas
  onChange: canvas1.renderAll.bind(canvas1),
  //animation time is 2000
  duration: 2000,
  //shake
  easing: fabric.util.ease.easeOutBounce
})

canvas1.add(circle);

// I set my path1 at the same place as path
var path1 = new fabric.Path('M 0 0 L 0 150 L 200 150 z');
// I then set my path1 with new style
path1.set({ fill: 'orange', stroke: 'green', opacity: 0.7 });
// I make a rotate 90 degree. Start point becomes 150 to left and 200 to top
path1.animate({left: 150, top: 200, angle: 90 }, {
      duration: 2000,
      onChange: canvas1.renderAll.bind(canvas1),
  });

canvas1.add(path1);

fabric.Image.fromURL(dogUrl, function(img) {
    img.scale(0.5).set({
      left: 150,
      top: 150,
      angle: -15
    });
    canvas1.add(img).setActiveObject(img);
  canvas1.renderAll();
});



function download_img(el) {
    var image = canvas1.toDataURL("image/jpg");
    el.target.href = image;
};

const $download = document.getElementById('download');
$download.addEventListener('click', download_img);