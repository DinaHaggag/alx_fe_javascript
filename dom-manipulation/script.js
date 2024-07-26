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
  newRandomQuote.addEventListener("click", displayRandomQuote );

  function  displayRandomQuote  (){
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    quoteDisplay.textContent = `${randomQuote.text} - ${randomQuote.category}`;
    let quoteText = quoteDisplay.textContent;
    sessionStorage.setItem('lastViewedQuote', quoteText);
  }

  // html variables 
  let newQuoteText = document.getElementById("newQuoteText");
  let newQuoteCategory = document.getElementById("newQuoteCategory");
  let addQuote = document.getElementById("addQuote");

  // Load the last viewed quote from session storage if available
  const lastViewedQuote = sessionStorage.getItem('lastViewedQuote');
  if (lastViewedQuote) {
    quoteDisplay.textContent = lastViewedQuote;
  }

  // Function to retrieve quotes from Local Storage
  function getQuotes() {
    const storedQuotes = JSON.parse(localStorage.getItem("quotes")) || [];
    return storedQuotes;
  }

   // Function to update and store quotes in Local Storage
   function updateQuotes(quotes) {
    localStorage.setItem("quotes", JSON.stringify(quotes));
  }

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
      const storedQuotes = getQuotes();
      quotes.push(newQuote );
      newQuoteText.value = '';
      newQuoteCategory.value = '';
      updateQuotes(quotes);
      console.log(quotes);
    }
  }
})


// document.addEventListener('DOMContentLoaded', () => {
//   const quoteDisplay = document.getElementById('quoteDisplay');
//   const newQuoteButton = document.getElementById('newQuote');
//   const addQuoteButton = document.getElementById('addQuote');
//   const newQuoteText = document.getElementById('newQuoteText');
//   const newQuoteCategory = document.getElementById('newQuoteCategory');
//   const exportQuotesButton = document.getElementById('exportQuotes');
//   const importFileInput = document.getElementById('importFile');

//   let quotes = getQuotes();

//   // Load the last viewed quote from session storage if available
//   const lastViewedQuote = sessionStorage.getItem('lastViewedQuote');
//   if (lastViewedQuote) {
//     quoteDisplay.textContent = lastViewedQuote;
//   }

//   // Function to retrieve quotes from Local Storage
//   function getQuotes() {
//     const storedQuotes = JSON.parse(localStorage.getItem('quotes')) || [];
//     return storedQuotes;
//   }

//   // Function to update and store quotes in Local Storage
//   function saveQuotes() {
//     localStorage.setItem('quotes', JSON.stringify(quotes));
//   }

//   // Function to display a random quote
//   function showRandomQuote() {
//     if (quotes.length === 0) {
//       quoteDisplay.textContent = 'No quotes available. Add some quotes!';
//       return;
//     }
//     const randomIndex = Math.floor(Math.random() * quotes.length);
//     const randomQuote = quotes[randomIndex];
//     const quoteText = `"${randomQuote.text}" - ${randomQuote.category}`;
//     quoteDisplay.textContent = quoteText;
//     sessionStorage.setItem('lastViewedQuote', quoteText);
//   }

//   // Function to add a new quote
//   function addQuote() {
//     const quoteText = newQuoteText.value.trim();
//     const quoteCategory = newQuoteCategory.value.trim();

//     if (quoteText && quoteCategory) {
//       const newQuote = { text: quoteText, category: quoteCategory };
//       quotes.push(newQuote);
//       saveQuotes();
//       newQuoteText.value = '';
//       newQuoteCategory.value = '';
//       alert('Quote added successfully!');
//     } else {
//       alert('Please enter both quote text and category.');
//     }
//   }

//   // Function to export quotes to JSON file
//   function exportQuotes() {
//     const dataStr = JSON.stringify(quotes, null, 2);
//     const dataBlob = new Blob([dataStr], { type: 'application/json' });
//     const url = URL.createObjectURL(dataBlob);

//     const link = document.createElement('a');
//     link.href = url;
//     link.download = 'quotes.json';
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   }

//   // Function to import quotes from JSON file
//   function importFromJsonFile(event) {
//     const fileReader = new FileReader();
//     fileReader.onload = function(event) {
//       const importedQuotes = JSON.parse(event.target.result);
//       quotes.push(...importedQuotes);
//       saveQuotes();
//       alert('Quotes imported successfully!');
//     };
//     fileReader.readAsText(event.target.files[0]);
//   }

//   // Event listeners
//   newQuoteButton.addEventListener('click', showRandomQuote);
//   addQuoteButton.addEventListener('click', addQuote);
//   exportQuotesButton.addEventListener('click', exportQuotes);
//   importFileInput.addEventListener('change', importFromJsonFile);

//   // // Show a random quote on initial load
//   // showRandomQuote();
// });
