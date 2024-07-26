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
      populateCategories();
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
  function populateCategories() {
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
  populateCategories();
  filterQuotes();

  // Fetching data from the server
  const SERVER_URL = 'https://jsonplaceholder.typicode.com/posts'; // Replace with the actual server URL

async function fetchQuotesFromServer() {
  try {
    const response = await fetch(SERVER_URL);
    const serverQuotes = await response.json();
    return serverQuotes.map(quote => ({
      text: quote.title,
      category: 'Server Quotes'
    }));
  } catch (error) {
    console.error('Error fetching quotes from server:', error);
  }
}

// Posting data to the server
async function postQuoteToServer(quote) {
  try {
    await fetch(SERVER_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: quote.text,
        body: quote.category,
        userId: 1
      })
    });
  } catch (error) {
    console.error('Error posting quote to server:', error);
  }
}

// Syncing data
async function syncQuotes() {
  const serverQuotes = await fetchQuotesFromServer();
  const localQuotes = getQuotes();

  const mergedQuotes = mergeQuotes(serverQuotes, localQuotes);
  updateQuotes(mergedQuotes);
}

function mergeQuotes(serverQuotes, localQuotes) {
  // Merge server quotes and local quotes, giving precedence to server quotes in case of conflict
  const quoteMap = {};

  serverQuotes.forEach(quote => {
    quoteMap[quote.text] = quote;
  });

  localQuotes.forEach(quote => {
    if (!quoteMap[quote.text]) {
      quoteMap[quote.text] = quote;
    }
  });

  return Object.values(quoteMap);
}

// Setting up periodic sync
setInterval(syncQuotes, 30000); // Sync every 30 seconds

// Handling conflicts
function notifyConflictResolution() {
  alert('Data has been updated from the server. Conflicts have been resolved.');
}

async function syncQuotesWithNotification() {
  const serverQuotes = await fetchQuotesFromServer();
  const localQuotes = getQuotes();

  if (JSON.stringify(serverQuotes) !== JSON.stringify(localQuotes)) {
    const mergedQuotes = mergeQuotes(serverQuotes, localQuotes);
    updateQuotes(mergedQuotes);
    notifyConflictResolution();
  }
}

setInterval(syncQuotesWithNotification, 30000); // Sync every 30 seconds with conflict notification

// Implement JavaScript for Manual Conflict Resolution
// Fetch elements
const conflictNotification = document.getElementById('conflictNotification');
const conflictResolutionUI = document.getElementById('conflictResolution');
const conflictList = document.getElementById('conflictList');

let conflictResolutions = [];

// Show conflict resolution UI
function showConflictResolutionUI() {
  conflictResolutionUI.style.display = 'block';
  conflictNotification.style.display = 'none';

  conflictResolutions.forEach(conflict => {
    let listItem = document.createElement('li');
    listItem.innerHTML = `
      <p>Quote: ${conflict.local.text}</p>
      <p>Category: ${conflict.local.category}</p>
      <button onclick="resolveConflict(${conflict.id}, 'local')">Keep Local</button>
      <button onclick="resolveConflict(${conflict.id}, 'server')">Use Server</button>
    `;
    conflictList.appendChild(listItem);
  });
}

// Resolve a specific conflict
function resolveConflict(conflictId, choice) {
  const conflict = conflictResolutions.find(conflict => conflict.id === conflictId);
  conflict.choice = choice;
}

// Apply conflict resolutions
function applyConflictResolutions() {
  const localQuotes = getQuotes();

  conflictResolutions.forEach(conflict => {
    if (conflict.choice === 'server') {
      // Update local storage with server data
      const index = localQuotes.findIndex(quote => quote.text === conflict.local.text && quote.category === conflict.local.category);
      if (index !== -1) {
        localQuotes[index] = conflict.server;
      } else {
        localQuotes.push(conflict.server);
      }
    }
  });

  updateQuotes(localQuotes);
  conflictResolutionUI.style.display = 'none';
}

// Sync quotes with conflict detection
async function syncQuotesWithNotification() {
  const serverQuotes = await fetchQuotesFromServer();
  const localQuotes = getQuotes();

  // Detect conflicts
  conflictResolutions = detectConflicts(serverQuotes, localQuotes);

  if (conflictResolutions.length > 0) {
    conflictNotification.style.display = 'block';
  } else {
    const mergedQuotes = mergeQuotes(serverQuotes, localQuotes);
    updateQuotes(mergedQuotes);
  }
}

function detectConflicts(serverQuotes, localQuotes) {
  const conflicts = [];

  serverQuotes.forEach(serverQuote => {
    const localQuote = localQuotes.find(localQuote => localQuote.text === serverQuote.text);
    if (localQuote && (localQuote.category !== serverQuote.category)) {
      conflicts.push({
        id: conflicts.length,
        local: localQuote,
        server: serverQuote,
        choice: null
      });
    }
  });

  return conflicts;
}

// Setup periodic sync
setInterval(syncQuotesWithNotification, 30000); // Sync every 30 seconds with conflict notification


})