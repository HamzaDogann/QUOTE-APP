
//Part 1

const api_url = "https://api.quotable.io/random";
const quote = document.getElementById("quote");
const author = document.getElementById("author");

async function getQuote(url) {
  const response = await fetch(url);
  const data = await response.json();
  quote.innerHTML = data.content;
  author.innerHTML = data.author;
  saveButton.innerHTML = `
    <span class="material-symbols-outlined">star</span>
    <h3>Save</h3>`;

}


getQuote(api_url);

// Part 2

const FavoriteQuoteBox = document.getElementById('FQB');
const quoteBox = document.querySelector('.quote-box');
const exitFromFavorite = document.getElementById('exitFromFavorite');


// Menüleri Açma kapatma

function FavoriteQuotesPannelOpen() {
  FavoriteQuoteBox.style.display = "block";
  quoteBox.style.display = "none";
}

function QuoteMenuOpen() {
  FavoriteQuoteBox.style.display = "none";
  exitFromFavorite.style.display = "block";
  quoteBox.style.display = "block";
}


// Local Storage Kısmı;

let Quotes = new Set(JSON.parse(localStorage.getItem('savedQuotes')) || []); // Kaydedilen alıntıları depolamak için Set kullanıyoruz.

const quoteList = document.getElementById("quote-list");
const saveButton = document.getElementById("save-btn");

saveButton.addEventListener("click", function () {
  SaveQuote(quote.innerHTML);
});

function SaveQuote(quoteValue) {

  Quotes.add(quoteValue);

  localStorage.setItem('savedQuotes', JSON.stringify(Array.from(Quotes)));

  saveButton.innerHTML = `
  <span class="material-symbols-outlined">check</span>
  <h3>Saved</h3>`

  listSavedQuotes();
  QuoteStatus();
}

function listSavedQuotes() {

  quoteList.innerHTML = "";

  Quotes.forEach(function (quoteText) {
    const li = document.createElement("li");
    li.innerHTML = `
      <span id="quote-content">${quoteText}</span>
      <div class="quote-options">
        <span class="material-symbols-outlined copy-icon">content_copy</span>
        <span class="material-symbols-outlined delete-icon">delete</span>
      </div>
    `;

    quoteList.insertBefore(li, quoteList.firstChild);

    const copyIcon = li.querySelector('.copy-icon');
    copyIcon.addEventListener('click', function () {
      const textToCopy = li.querySelector('#quote-content').textContent;

      document.querySelectorAll('.copy-icon').forEach(function (icon) {
        icon.textContent = 'content_copy';
      });

      copyIcon.textContent = 'check';
      copyTextToClipboard(textToCopy);
    });
  });
}

// Silme metodu

quoteList.addEventListener("click", function (event) {
  if (event.target.classList.contains("delete-icon")) {
    const li = event.target.closest("li"); // Silinecek li öğesini bulun

    if (li) {
      const quoteText = li.querySelector("#quote-content").textContent;


      Quotes.delete(quoteText);

      const savedQuotes = JSON.parse(localStorage.getItem("savedQuotes")) || [];
      const updatedQuotes = savedQuotes.filter((quote) => quote !== quoteText);
      localStorage.setItem("savedQuotes", JSON.stringify(updatedQuotes));


      listSavedQuotes();
      QuoteStatus();
    }
  }
});



const contentCopy = document.getElementById("content-copy");

// Kopyalama Fonksiyonu

function copyTextToClipboard(text) {
  const dummy = document.createElement('textarea');
  document.body.appendChild(dummy);
  dummy.value = text;
  dummy.select();
  document.execCommand('copy');
  document.body.removeChild(dummy);
  contentCopy.innerHTML = "check";

}


// Kaydedilen Alıntıların hepsini temizle;

const allQuotesDelete = document.getElementById("allQuotesDelete");
const InfoAlert = document.getElementById('info-alert');
const overlay = document.getElementById("overlay");

const YesBtn = document.getElementById("YesBtn");
const NoBtn = document.getElementById("NoBtn");
const allquote = document.getElementById("AllquoteItem");

allQuotesDelete.addEventListener("click", () => {
  overlay.style.display = "block";
  InfoAlert.style.display = "flex";

  function hideOverlayAndInfoAlert() {
    overlay.style.display = "none";
    InfoAlert.style.display = "none";
  }


  NoBtn.addEventListener("click", hideOverlayAndInfoAlert)

  YesBtn.addEventListener("click", () => {

    Quotes.clear();
    localStorage.clear();
    QuoteStatus();
    saveButton.innerHTML = `
    <span class="material-symbols-outlined">star</span><h3>Save</h3>`;
    listSavedQuotes();
    hideOverlayAndInfoAlert();

  })

})


// Temizleme sonrası işlemleri

function QuoteStatus() {
  if (Quotes.size <= 0) {
    allquote.style.backgroundImage = "url('img/ThereAreNoQuote.png')";
    allQuotesDelete.style.display = "none";
  }
  else {
    allquote.style.backgroundImage = "";
    allQuotesDelete.style.display = "flex";
  }
}


// Sayfa yüklendiğinde kaydedilen alıntıları listele
window.onload = listSavedQuotes
QuoteStatus();



// Informations about my links.
// script codes

const mainButton = document.getElementById("main-button");
const infoButtons = document.getElementById("info-buttons");


let infoVisible = false;

mainButton.addEventListener("click", (event) => {
  event.stopPropagation();
  infoVisible = !infoVisible;
  if (infoVisible) {
    infoButtons.style.display = "block";
    infoButtons.style.right = "-130px";
  } else {
    infoButtons.style.display = "none";
  }
});


document.addEventListener("click", () => {
  if (infoVisible) {
    infoButtons.style.display = "none";
    infoVisible = false;
  }
});