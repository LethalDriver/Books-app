const queryForm = document.querySelector("#query-form");
const shelfDiv = document.querySelector(".shelf");

queryForm.addEventListener("submit", event => {
  event.preventDefault();
  const query = event.target.searchbox.value;
  shelfDiv.innerHTML = "<h1>Wyszukiwanie...</h1>";

  fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`)
    .then(response => response.json())
    .then(localStorage.setItem("books", response))
    .then(({ items }) => {
      shelfDiv.innerHTML = "";

      // for(let i=0; i< items.length;i++){
      //   console.log(items[i])
      // }

      //     for(const item of items){
      //       console.log(item);
      //     }

      items.forEach(({ volumeInfo }) => {
        const { authors, imageLinks, title, previewLink } = volumeInfo;
        addBook({
          authors: authors,
          imageLinks: imageLinks,
          title: title,
          previewLink: previewLink
        });
      });
    });
});

function addBook({title, imageLinks, previewLink}) {
  const bookDiv = document.createElement("div");
  bookDiv.className = "book";
  console.log(previewLink)
  if(imageLinks){
      bookDiv.style.backgroundImage = `url('${imageLinks.thumbnail}')`;
  }else{
    bookDiv.innerHTML = `<h1 class="title">${title}</h1>`;
  }
  
  shelfDiv.appendChild(bookDiv);
}
