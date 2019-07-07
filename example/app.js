var myTodo = objDOM('#todoList', {
	input: {
		$attrs: {
			type: 'text'
		},
		$props: {
			onkeyup: function (event) {
				if (event.key === 'Enter') {
					addItem(createItem());
				}
			}
		}
	},
	button: {
		$props: {
			innerHTML: 'add',
			onclick: function (event) {
				addItem(createItem());
			}
		}
	},
	ul: [{
		li: 'a default item'
	}, {
		li: 'another default item'
	}]
});

function getAndClearValue (element) {
	var value = element.value;
	element.value = '';
	return value;
}

function createItem () {
	var item = {
		li: {
			$attrs: {
				class: 'todoItem'
			},
			a: {
				$props: {
					innerHTML: '✗',
					onclick: function (event) {
						deleteItem(item.li.$element);
					}
				}
			},
			span: getAndClearValue(myTodo.input.$element)
		}
	};

	return item;
}

function retrieveItems (list) {
	return Array.prototype.slice.call(list.children);
}

function addItem (item) {
	if (item.li.span.length > 0) {
		objDOM(myTodo.ul.$element, retrieveItems(myTodo.ul.$element).concat([item]));
	}
}

function deleteItem (item) {
	myTodo.ul.$element.removeChild(item);
}
