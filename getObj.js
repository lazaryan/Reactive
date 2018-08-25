/**
* @function getObj - функция генерации js объекта на основе html строки
* @param {String} template - html шаблон
* Шаблон должен иметь структуру:
* - каждый вложенный элемент начинается с новой строки
* - иерархия сохраняется с помощью табов
* - все атрибуды html объекта находятся на той же строке
* @return Объект, описывающий данную html структуру
*/
function getObj(template) {
	let s = trim(template);
	let block = s.match(/^<.+>/m);

	if (!block) {
		return s;
	}

	let childs = s.match(/\n\t(.+)/g);
	childs = childs ? getChild(childs): undefined;

	let type = block[0].match(/\w+/)[0];
	let props = getProps(block[0]);
	let children = childs ? childs.reduce((child, el) => {
		child.push(getObj(el));
		return child;
	}, []) : undefined;

	return {
		type: type,
		props: props ,
		children: children
	}
}

const trim = (s) => 
	s.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');

const getProps = (block) => {
	let attr = block.match(/\w+=".+?"/g);

	return attr ? attr.reduce((p, e) => {
				let attr = e.match(/(.+)="(.+)"/);
				p[attr[1]] = attr[2];
				return p;
			}, {}) : '';		
};

const getChild = (childs) => {
	let arr = [];
	let tab = false;
	let i = 0;

	childs.forEach((child) => {
		child = child.replace(/\t/, '');

		if (!child.match(/\t/)) {
			if (!tab) {
				i++;
				arr.push(child);
			} else {
				tab = false;
			}
		} else {
			tab = true;
			arr[i - 1] = arr[i - 1] + child;
		}
	})

	return arr;
}