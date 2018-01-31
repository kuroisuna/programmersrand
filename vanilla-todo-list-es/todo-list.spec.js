// Loads the application markup
const html = require('fs')
  .readFileSync('./index.html')
  .toString();

const TodoList = class {};

describe('to do list', () => {
  beforeEach(() => {
    document.documentElement.innerHTML = html.replace('<body>', '<body env="__testing__">');
  });

  test('shows the list wrapper', () => {
    new TodoList('#app', []);
    const wrapper = document.querySelector('.todo-list');
    expect(wrapper).toBeTruthy();
  });

  test('loads an empty message if no elements', () => {
    new TodoList('#app', []);
    const listItems = document.querySelectorAll('.todo-list__item');
    expect(listItems.length).toBe(1);
    expect(listItems[0].className).toContain('todo-list__item--empty');
    expect(listItems[0].innerHTML).toContain('No items, please create one');
  });

  test('creates list elements, hides empty message', () => {
    const items = Array.from('ABC', title => ({ title, done: 0 }));
    new TodoList('#app', items);
    const listItems = document.querySelectorAll('.todo-list__item');
    expect(listItems.length).toBe(items.length);
    const emptyMessage = document.querySelector('.todo-list__item--empty');
    expect(emptyMessage).toBeFalsy();
  });
});

const items = Array.from('ABC', (title) => {
  return {
    title,
    done: 0
  };
});
