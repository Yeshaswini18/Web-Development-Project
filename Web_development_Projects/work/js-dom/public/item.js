(function IIFE() {

    const counter = () =>  {
        let count = 0;
        return () => {
          count += 1;
          return count;
        };
    };
    const nextId = counter();
    
    const items = {};

    const addButton = document.querySelector('.outgoing button');
    const list = document.querySelector('.items');
    const newTaskEl = document.querySelector('.to-add');
  
    const renderList = (items) => {
        list.innerHTML = Object.keys(items).map( (key) => {
          const item = items[key];
          return `
            <li>   
              <span class="left-elements">          
              <button data-id="${key}" class="delete">X</button>
              <span
                data-id="${key}"
                class="item">${item.name}</span>
              </span>
              <span class="right-elements">
              <button data-id="${key}" class="subtract" type="button" ${item.quantity>0 ? "" : "disabled"}>-</button>
              <span
                data-id="${key}"
                class="quantity">${item.quantity}</span>
              <button data-id="${key}" class="add" type="button">+</button>
              </span>
            </li>
          `;
        }).join('\n');
    };

    list.addEventListener('click', function (event) {
        const id = event.target.dataset.id;
        item = items[id];

        if(event.target.classList.contains('add')) {
          item.quantity += 1;
        } else if(event.target.classList.contains('delete')) {
            delete items[id];
        } else if (event.target.classList.contains('subtract')) {
            if (item.quantity > 0) {
                item.quantity -= 1;
            }
        }
        renderList(items);
    });
    

    addButton.addEventListener('click', function (event) {
    // get item to add
    const text = newTaskEl.value;

    items[ nextId() ] = { name: text, quantity: 0 };
    renderList(items);

    newTaskEl.value = '';
    addButton.disabled = true;
    });

    addButton.disabled = true;
  
    newTaskEl.addEventListener('keyup', function (event) {
      const text = event.target.value;
      addButton.disabled = !text;
    });

    // initial render
    addButton.disabled = true;
    renderList(items);
  })();
