function getObj (template) {
	let text = template;

	text = convertText(text);
	text = getStartBlocks(text);
	text = getFinishBlocks(text);
	text = removeFinishComma(text);
	text = wrapArray(text);

	let arr = JSON.parse(text);

	return arr.length > 1 ? arr : arr[0]
}

const getStartBlocks = (template) => {
	return template.replace(/<\s{0,}\w+\s{0,}.*?\s{0,}>/gm, (block) => {
		return `{ "type":\"${getNameTag(block)}\",
			"props":${JSON.stringify(getProps(block))},
			"children":[${!isBlock(block) ? ']},' : ''}`
	});
}

const convertText = (template) => {
	template = template.replace(/>(.*?)<\/|><\//mg, (el) => {
		el = el.replace('>', '>\"')
			.replace('<\/', '\"<\/');

		return el;
	})

	return template;

}
const removeFinishComma = (template) => {
	return template.replace(/,$/, '');
}

const wrapArray = (template) => {
	return template.replace(/./, (e) => `[${e}`)
			.replace(/.$/, (e) => `${e}]`);
}

const getFinishBlocks = (template) => {
	template =  template.replace(/<\/\s{0,}\w+\s{0,}>/mg, (block) => {
		return '},'
	});

	template = finishChildren(template);

	return template;
}

const finishChildren = (template) => {
	template = template.replace(/\"\s{0,}},\s{0,}{/mg, '\"]},{');
	template = template.replace(/},\s{0,}},/mg, ']}]},');
	return template;
}

const getNameTag = (block) => {
	return block.match(/\w+/);
}

const isBlock = (block) => {
	return !block.match(/\/>$/)
}

const getProps = (block) => {
	let attrs = block.match(/<\w+\s{1,}((.|\s|\S)*?)>/m);

	if (!attrs || attrs[1] == '/') return '{}';

	attrs = attrs[1];

	let attr = attrs.match(/\w+\s{0,}=\s{0,}"(.*?)"/gm)
			.reduce((p, e) => {
				let attr = e.match(/(.*)\s{0,}=\s{0,}"(.*)"/);
				p[attr[1]] = attr[2];

				return p;
			}, {});	
	
	return attr;
}