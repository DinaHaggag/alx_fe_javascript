document.addEventListener("DOMContentLoaded",()=>{

  // html variables
  const newRandomQuote = document.getElementById("newQuote");
  const quoteDisplay = document.getElementById('quoteDisplay');

  // quotes array
  let quotes = [
    {
      text : "To live is the rarest thing in the world. Most people exist, that is all.",
      category : "Oscar Wilde"
    },
    {
      text : "That it will never come again is what makes life so sweet.",
      category : "Emily Dickinson"
    },
    {
      text : "It is never too late to be what you might have been.",
      category : "George Eliot"
    },
    {
      text : "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.",
      category : "Ralph Waldo Emerson"
    },
    {
      text : "Don't let your happiness depend on something you may lose.",
      category : "C.S. Lewis"
    }
  ];

  // add random quote
  newRandomQuote.addEventListener("click",showRandomQuote);

  function showRandomQuote (){
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    quoteDisplay.textContent = `${randomQuote.text} - ${randomQuote.category}`;
  }

  // html variables 
  let newQuoteText = document.getElementById("newQuoteText");
  let newQuoteCategory = document.getElementById("newQuoteCategory");
  let addQuote = document.getElementById("addQuote");

  addQuote.addEventListener("click",createAddQuoteForm)
  
  // add new quote dynamically
  function createAddQuoteForm(){
    const quoteText = newQuoteText.value.trim();
    const quoteCategory = newQuoteCategory.value.trim();

    if(quoteText !== "" && quoteCategory !== ""){
      let newQuote  = {
        text : quoteText,
        category : quoteCategory
      };
      quotes.push(newQuote );
      newQuoteText.value = '';
      newQuoteCategory.value = '';
      console.log(quotes);
    }
  }
})