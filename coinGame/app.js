function isTouching(a, b) {
	const aRect = a.getBoundingClientRect();
	const bRect = b.getBoundingClientRect();

	return !(
		aRect.top + aRect.height < bRect.top ||
		aRect.top > bRect.top + bRect.height ||
		aRect.left + aRect.width < bRect.left ||
		aRect.left > bRect.left + bRect.width
	);
}

const player = document.querySelector('#player');
const coin   = document.querySelector('#coin');

window.addEventListener('keyup',function(event){
	if(event.key        === 'ArrowDown'  || event.key === 'Down'){
		moveVertical(player,50);
	}else if(event.key  === 'ArrowUp'    || event.key === 'Up'){
		moveVertical(player,-50);
	}else if(event.key  === 'ArrowLeft'  || event.key === 'Left'){
		moveHorizontal(player,-50);
	}else if(event.key  === 'ArrowRight' || event.key === 'Right'){
		moveHorizontal(player,50);
	}
	if(isTouching(player,coin)) moveCoin();

}); 

const moveVertical = (element,positon)=>{
	const currentTop  = extractPos(element.style.top)
	player.style.top  = `${currentTop+positon}px`;
}

const moveHorizontal = (element,positon)=>{
	const currentTop  = extractPos(element.style.left)
	player.style.left = `${currentTop+positon}px`;
	//it flip the image
	const flip = positon > 0 ? 'scale(1,1)':'scale(-1,1)';
	player.style.transform = flip;
}
const extractPos = (pos)=>{
	console.log(pos);
	if(!pos) return 100;
	return parseInt(pos.slice(0,-2));
}

const moveCoin = ()=>{
	const x = Math.floor(Math.random()*window.innerWidth);
	const y = Math.floor(Math.random()*window.innerHeight);

	coin.style.top = `${y}px`;
	coin.style.left = `${x}px`;

}

