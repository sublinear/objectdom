var objDOM = objDOM || (function () {
	var reservedWords = ['$attrs', '$props', '$element'];

	function attach (target, schema) {
		if (typeof target === 'string') {
			target = document.querySelector(target);
		}

		target.append(build(schema));
		return schema;
	}

	function build (subtree) {
		if (typeof subtree === 'object') {
			if (Array.isArray(subtree)) {
				subtree = subtree.reduce(function (result, item) {
					result.append(build(item));
					return result;
				}, document.createDocumentFragment());
			}

			else {
				subtree = Object.keys(subtree).reduce(function (result, tag) {
					if (reservedWords.indexOf(tag) < 0) {
						var element = document.createElement(tag);
						var attrs = subtree[tag]['$attrs'];
						var props = subtree[tag]['$props'];

						if (attrs) {
							Object.keys(attrs).map(function (attr) {
								element.setAttribute(attr, attrs[attr]);
							});
						}

						if (props) {
							Object.keys(props).map(function (prop) {
								element[prop] = props[prop];
							});
						}

						if (typeof subtree[tag] !== 'object') {
							element.innerHTML = subtree[tag];
							subtree[tag] = {};
						}

						subtree[tag].$element = element;

						element.append(build(subtree[tag]));
						result.append(element);
					}

					return result;
				}, document.createDocumentFragment());
			}
		}

		return subtree;
	}

	return attach;
})();
