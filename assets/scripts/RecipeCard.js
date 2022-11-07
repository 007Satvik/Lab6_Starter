// RecipeCard.js

class RecipeCard extends HTMLElement {
  // Called once when document.createElement('recipe-card') is called, or
  // the element is written into the DOM directly as <recipe-card>
  constructor() {
    super(); // Inheret everything from HTMLElement

    // EXPOSE - START (All expose numbers start with A)
    // A1. TODO - Attach the shadow DOM to this Web Component (leave the mode open)
    var shadowE1 = this.attachShadow({mode: 'open'});
    // A2. TODO - Create an <article> element - This will hold our markup once our data is set
    var article = document.createElement('article');
    // A3. TODO - Create a style element - This will hold all of the styles for the Web Component
    var styleEl = document.createElement('style');
    // A4. TODO - Insert all of the styles from cardTemplate.html into the <style> element you just made
    styleEl.textContent = `
    * {
    font-family: sans-serif;
    margin: 0;
    padding: 0;
  }

  a {
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }

  article {
    align-items: center;
    border: 1px solid rgb(223, 225, 229);
    border-radius: 8px;
    display: grid;
    grid-template-rows: 118px 56px 14px 18px 15px 36px;
    height: auto;
    row-gap: 5px;
    padding: 0 16px 16px 16px;
    width: 178px;
  }

  div.rating {
    align-items: center;
    column-gap: 5px;
    display: flex;
  }

  div.rating>img {
    height: auto;
    display: inline-block;
    object-fit: scale-down;
    width: 78px;
  }

  article>img {
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    height: 118px;
    object-fit: cover;
    margin-left: -16px;
    width: calc(100% + 32px);
  }

  p.ingredients {
    height: 32px;
    line-height: 16px;
    padding-top: 4px;
    overflow: hidden;
  }

  p.organization {
    color: black !important;
  }

  p.title {
    display: -webkit-box;
    font-size: 16px;
    height: 36px;
    line-height: 18px;
    overflow: hidden;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  p:not(.title),
  span,
  time {
    color: #70757A;
    font-size: 12px;
  }`;
    // A5. TODO - Append the <style> and <article> elements to the Shadow DOM
    shadowE1.append(styleEl);
    shadowE1.append(article);
  
  }

  /**
   * Called when the .data property is set on this element.
   *
   * For Example:
   * let recipeCard = document.createElement('recipe-card'); // Calls constructor()
   * recipeCard.data = { foo: 'bar' } // Calls set data({ foo: 'bar' })
   *
   * @param {Object} data - The data to pass into the <recipe-card>, must be of the
   *                        following format:
   *                        {
   *                          "imgSrc": "string",
   *                          "imgAlt": "string",
   *                          "titleLnk": "string",
   *                          "titleTxt": "string",
   *                          "organization": "string",
   *                          "rating": number,
   *                          "numRatings": number,
   *                          "lengthTime": "string",
   *                          "ingredients": "string"
   *                        }
   */
  set data(data) {
    // If nothing was passed in, return
    if (!data) return;

    // A6. TODO - Select the <article> we added to the Shadow DOM in the constructor
    var articleCurr =  this.shadowRoot.querySelector('article');
    // A7. TODO - Set the contents of the <article> with the <article> template given in
    //           cardTemplate.html and the data passed in (You should only have one <article>,
    //           do not nest an <article> inside another <article>). You should use Template
    //           literals (tempalte strings) and element.innerHTML for this.
    articleCurr.innerHTML = `
    <img src="data:image/jpeg;base64,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"
    alt="Recipe Title">
  <p class="title">
    <a href="https://www.allrecipes.com/recipe/260588/halloween-ghost-cookies/">Title</a>
  </p>
  <p class="organization">The Chef's Organization</p>
  <div class="rating">
    <span>5</span>
    <img src="/assets/images/icons/5-star.svg" alt="5 stars">
    <span>(500)</span>
  </div>
  <time>50 min</time>
  <p class="ingredients">
    Comma, Separated, List, of, Ingredients
  </p>`
  }
}

// A8. TODO - Define the Class as a customElement so that you can create
//           'recipe-card' elements
customElements.define('recipe-card', RecipeCard);
