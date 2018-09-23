/*trim*/
if (!String.prototype.trim) {
	String.prototype.trim = () =>
		this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
}