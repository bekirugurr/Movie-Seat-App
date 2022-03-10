const container = document.querySelector(".container");
//seat clasındaki koltuklar showcase divinde de var o yüzden altta container class ının içindeki seat classındaki divleri aldık
const allSeats = document.querySelectorAll(".container .seat");
// container class ına sahip div in içindeki seat classında ancak occupied classında olamayn div ler
const notOccupiedSeats = document.querySelectorAll(
  ".container .seat:not(.occupied)"
);
const count = document.getElementById("count");
const film = document.getElementById("film");
const total = document.getElementById("total");
const movieSelectBox = document.getElementById("movie");
// eğer film seçilip local storageye gönderildi ise orada seçilen filmin fiyatını alsın, seçilmesi ise ilk option olan 0. index teki filmin value sini al
let currentTicketPrice = localStorage.getItem("selectedMoviePrice")
  ? localStorage.getItem("selectedMoviePrice")
  : movieSelectBox.value;

//Güncel movieIndex (Aynı üsttekinin mantığı)
let currentMovieIndex = localStorage.getItem("selectedMovieIndex")
  ? localStorage.getItem("selectedMovieIndex")
  : movieSelectBox.selectedIndex;

window.onload = () => {
  displaySeats();
  updateMovieInfo();
};

//! Change film and localStorage
movieSelectBox.addEventListener("change", (e) => {
  let ticketPrice = e.target.value;
  let movieIndex = e.target.selectedIndex;
  updateMovieInfo();
  setMovieDataToLocalStorage(ticketPrice, movieIndex);
});

//! Add to storage 
const setMovieDataToLocalStorage = (ticketPrice, movieIndex) => {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", ticketPrice);
};

//! Capturing 
container.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    // classlist.toggle yoksa ekliyor, varsa çıkarıyor
    e.target.classList.toggle("selected");
  }
  if (
    e.target.classList.contains("seat") &&
    e.target.classList.contains("occupied")
  ) {
    alert("Lütfen rezerve olmayan koltuk seçiniz");
  }

  updateMovieInfo();
});

//! Update and calculation 
const updateMovieInfo = () => {
  let selectedSeats = document.querySelectorAll(".row .seat.selected");
  let selectedSeatsIndexArray = [...selectedSeats].map((seat) =>
    [...allSeats].indexOf(seat)
  );
  //console.log(selectedSeatsIndexArray);
  localStorage.setItem(
    "selectedSeats",
    JSON.stringify(selectedSeatsIndexArray)
  );
  count.innerText = selectedSeatsIndexArray.length;
  total.innerText = selectedSeatsIndexArray.length * movieSelectBox.value;
  film.innerText =
    movieSelectBox.options[movieSelectBox.selectedIndex].innerText.split(
      "("
    )[0];
};

//! after refreshing get selectedSeats and add class 'selected' 
const displaySeats = () => {
    movieSelectBox.selectedIndex = currentMovieIndex;
    let selectedSeatsFromStorage = JSON.parse(localStorage.getItem("selectedSeats"));
    if(selectedSeatsFromStorage.length){
        selectedSeatsFromStorage.forEach(seat =>{
            allSeats[seat].classList.add('selected');
        })
    }
}


//?let selectedSeats = document.querySelectorAll('.row .seat.selected') daki gibi .seat.selected bitişik yazarsak hem seat hem selected classına sahip element

//?let selectedSeats = document.querySelectorAll('.row .seat .selected') daki gibi .seat .selected ayrı ayrı  yazarsak hem seat class ının içindeki selected classına sahip elementleri alır

//? localStorage array leri kaydetmiyor. o yüzden JSON.stringify() yaparak string e çevirip localStorage de o şekilde saklıyoruz
