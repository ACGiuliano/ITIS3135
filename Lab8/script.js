'use strict';
/*  json data is from https://api.sampleapis.com/ */

// event listeners for the buttons
const icedButton = document.querySelector('button:nth-child(1)');
const hotButton = document.querySelector('button:nth-child(2)');

// function for adding drinks to page
function addDrinks(drinks) {
    const container = document.querySelector('.container');
    container.innerHTML = '';

    drinks.forEach(drink => {
        // creates article
        const art = document.createElement('article');
        art.className = 'card';

        // adds image element
        const image = document.createElement('img');
        image.src = drink.image;
        image.alt = drink.title;
        art.appendChild(image);

        // content div
        const contDiv = document.createElement('div');
        contDiv.className = 'content';
        art.appendChild(contDiv);

        // h3 element
        const title = document.createElement('h3');
        title.textContent = drink.title;
        contDiv.appendChild(title);

        // para element
        const desc = document.createElement('p');
        desc.textContent = drink.description + ' Ingredients include:';
        contDiv.appendChild(desc);

        // ingredients
        const ingredients = document.createElement('div');
        ingredients.className = 'ingredients';
        contDiv.appendChild(ingredients);

        drink.ingredients.forEach(ingredient => {
            const ingredDiv = document.createElement('div');
            ingredDiv.textContent = ingredient;
            ingredDiv.className = 'ingredient';
            ingredients.appendChild(ingredDiv);
        });

        // append to container
        container.appendChild(art);
    });
}

// iced coffee button
icedButton.addEventListener('click', function() {
    fetch('data/iced.json')
    .then(response => response.json())
    .then(data => {
        addDrinks(data);
    })
    .catch(error => console.error('Error fetching iced coffee data', error));
});

// hot coffee button
hotButton.addEventListener('click', function() {
    fetch('data/hot.json')
    .then(response => response.json())
    .then(data => {
        addDrinks(data);
    })
    .catch(error => console.error('Error fetching hot coffee data', error));
});

