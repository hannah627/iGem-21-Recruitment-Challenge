/**
 * comment
 */

"use strict";

(function() {

  const URL = "https://jsonplaceholder.typicode.com/posts";

  window.addEventListener("load", init);

  /**
   * the function that runs when the page loads;
   */
  function init() {
    id("new-post").addEventListener("click", newPost);
  }

  function newPost() {
    fetch(URL)
      .then(statusCheck)
      .then(res => res.json())
      .then(displayPost)
      .catch(handleError);
  }

  /**
   * Checks to ensure that data was fetched from the API successfully; if not, throws an error
   * @param {object} response - the response returned from the API call
   * @returns {object} response - the data returned from the API call
   */
  async function statusCheck(response) {
    if (!response.ok) {
      throw new Error(await response.text());
    }
    return response;
  }

  function displayPost(data) {
    console.log(data);
    for (let i = 0; i < data.length; i++) {
      let card = gen("section");
      let title = gen("h2");
      title.textContent = data[i]["body"];
      card.appendChild(title);

      let cardText = gen("p");
      cardText.textContent = data[i]["body"];
      card.appendChild(cardText);
      id("card-holder").appendChild(card);
    }
  }

  /**
   * a function to deal with any errors that may occur when trying to fetch data from the API.
   * Adds a message to the page informing the user that an error occured, what type the error was,
   * and then suggesting that the user refresh the page or try again later.
   * @param {string} err - the error that occured when trying to fetch data from the API
   */
  function handleError(err) {
    let errorMessage = gen("h3");
    errorMessage.textContent = "An error occured of type: " + err + ". Try refreshing the page or" +
     " trying again later.";
    id("card-holder").appendChild(errorMessage);
  }

  /**
   * a helper function to make returning an element based on id easier and faster
   * @param {string} idName - the id of the element to be located
   * @returns {Element} with id idName
   */
  function id(idName) {
    return document.getElementById(idName);
  }

  /**
   * Returns the first element that matches the given CSS selector.
   * @param {string} selector - CSS query selector.
   * @returns {object} The first DOM object matching the query.
   */
  function qs(selector) {
    return document.querySelector(selector);
  }

  /**
   * a helper function to make creating an element easier and faster
   * @param {string} tagName - the name of the element to create
   * @returns {Element} of type tagName
   */
  function gen(tagName) {
    return document.createElement(tagName);
  }

})();