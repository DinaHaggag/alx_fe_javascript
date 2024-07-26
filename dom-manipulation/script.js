document.addEventListener("DOMContentLoaded",()=>{

  // html variables
  const newRandomQuote = document.getElementById("newQuote");
  const quoteDisplay = document.getElementById('quoteDisplay');

  // quotes array
  let quotes = [
    {
      text : "Keep your eyes on the stars, and your feet on the ground.",
      category : "Motivational Quotes"
    },
    {
      text : "The key is to keep company only with people who uplift you, whose presence calls forth your best.",
      category : "Motivational Quotes"
    },
    {
      text : "What you do today can improve all your tomorrows.",
      category : "Motivational Quotes"
    },
    {
      text : "We do not remember days, we remember moments.",
      category : "Life Quotes"
    },
    {
      text : "Do not take life too seriously. You will never get out of it alive.",
      category : "Funny Quotes"
    }
  ];

  // add random quote
  newRandomQuote.addEventListener("click",showRandomQuote);

  function showRandomQuote (){
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    quoteDisplay.innerHTML = `${randomQuote.text} - ${randomQuote.category}`;
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
      populateCategoryFilter();
    }
  }

  // Function to export quotes to JSON file
  const exportBtn = document.getElementById("exportFile");

  exportBtn.addEventListener("click",exportFromJsonFile);


  function exportFromJsonFile() {
    const dataStr = JSON.stringify(quotes, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'quotes.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // Function to import quotes to JSON file
  const importBtn = document.getElementById("importFile");

  importBtn.addEventListener("click",importFromJsonFile);

  function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
      const importedQuotes = JSON.parse(event.target.result);
      quotes.push(...importedQuotes);
      saveQuotes();
      alert('Quotes imported successfully!');
    };
    fileReader.readAsText(event.target.files[0]);
  }

  // Creating a Dynamic Content Filtering System Using Web Storage and JSON
  const categoryFilter = document.getElementById("categoryFilter");

  // Populate category filter
  function populateCategoryFilter() {
    const categories = [...new Set(quotes.map(quote => quote.category))];
    categoryFilter.innerHTML = '<option value="all">All Categories</option>';
    categories.forEach(category => {
      const option = document.createElement('option');
      option.value = category;
      option.textContent = category;
      categoryFilter.appendChild(option);
    });
  }

  // Filter quotes based on selected category
  function filterQuotes() {
    const selectedCategory = categoryFilter.value;
    const filteredQuotes = selectedCategory === "all" ? quotes : quotes.filter(quote => quote.category === selectedCategory);
    displayQuotes(filteredQuotes);
  }

  // Initialize category filter and display all quotes
  populateCategoryFilter();
  filterQuotes();

})