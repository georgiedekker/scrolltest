const html = document.documentElement;
const canvas = document.getElementById("ribbon");
const context = canvas.getContext("2d");

const frameCount = 147;
let currentRotation = 0;
let oldScroll = 1;
const currentFrame = index => (
  `https://www.apple.com/105/media/us/airpods-pro/2019/1299e2f5_9206_4470_b28e_08307a42f19b/anim/sequence/large/01-hero-lightpass/${index.toString().padStart(4, '0')}.jpg`
)

const preloadImages = () => {
  for (let i = 1; i < frameCount; i++) {
    const img = new Image();
    img.src = currentFrame(i);
  }
};

const img = new Image()
img.src = currentFrame(1);
canvas.width=1158;
canvas.height=770;
img.onload=function(){
  context.drawImage(img, 0, 0);
}

const updateImage = index => {
  img.src = currentFrame(index);
  context.clearRect(0, 0, canvas.width, canvas.height);
  console.log('oldScroll: '+oldScroll+' newScroll: '+index+' rotate: '+index/10000)
  if(oldScroll<index && index/1000<0.1){context.rotate(index/10000)}
  if(oldScroll>index && index/1000<0.1){context.rotate(-index/10000)}
  if(index<2){context.resetTransform()}
  oldScroll = index
  context.drawImage(img, 0, 0);
}

window.addEventListener('scroll', () => {  
  const scrollTop = html.scrollTop;
  const maxScrollTop = html.scrollHeight - window.innerHeight;
  const scrollFraction = scrollTop / maxScrollTop;
  const frameIndex = Math.min(
    frameCount - 1,
    Math.ceil(scrollFraction * frameCount)
  );
  requestAnimationFrame(() => updateImage(frameIndex + 1))
});

preloadImages();