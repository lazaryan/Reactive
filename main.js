let block = `<div class="arrr aee" id="new">
			dfgfdgfd
				<li></li>	
			</div>`;			
let obj = {};

function createObject(template, obj) {
	/*получаем открывабщий тэг*/
	let startBlock = template.match(/<.+>/m);
	let name = startBlock[0].match(/\w+/)[0];

	let regFinish =`<\/${name}>$`;
	let finishBlock = template.match(regFinish);

	let attrs = startBlock[0]
		.match(/\w+.=".+?"/g)
		.map((el) => {
			let attr = el.match(/(.+)="(.+)"/);
			return {attr: attr[1], value: attr[2]}
		});

		let text = template.substring(startBlock.index+startBlock[0].length, finishBlock.index);

		console.log(startBlock);
		console.log(finishBlock);
		console.log(text || 'aaa');

	return {
		element: name,
		attr: attrs
	}
}

let a = createObject(block, obj);
console.log(a);