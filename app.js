const btn = document.querySelector('button');

btn.addEventListener('mouseover',function(){
	console.log("Mouse Over Me!")
	const width = Math.floor(Math.random()*window.innerWidth);
	const hight = Math.floor(Math.random()*window.innerHeight);
	btn.style.left = `${width}px`;
	btn.style.top = `${hight}px`;
});

btn.addEventListener('click',function(){
	btn.innerText = 'You Click Me!';
});