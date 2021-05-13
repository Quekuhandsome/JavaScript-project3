a; // alert("hey");
// variable
const courses = document.querySelector("#courses-list");

const shoppingCartContent = document.querySelector("cart-content tbody");

const clearCartBtn = document.querySelector("#clear-cart");

// event listeners
loadEventListeners();

function loadEventListeners() {
  //when a new course is added to
  courses.addEventListener("click", buyCourse);

  //when the remove  button is clicked
  shoppingCartContent.addEventListener("click", removeCourse);

  //when the clear cart btn is clicked
  clearCartBtn.addEventListener("click", clearCart);

  //document ready

  document.addEventListener("DOMContentlLoaded", getFromLocalStorage);
}

// functions
function buyCourse(e) {
  e.preventDefault();
  //Use delegation to find courses that was added
  if (e.target.classList.contains("add-to-cart")) {
    //read the course value from the
    const course = e.target.preventElement.parentElement;
    //ead the values
    getCourseInfo(course);
  }
}

//Read the HTML information  of the  selected course
function getCourseInfo(course) {
  //creating an object with course data
  const courseInfo = {
    image: course.querySelector("img").src,
    title: course.querySelector("h4").textContent,
    price: course.querySelector(".price span").textContent,
    id: course.querySelector("a").getAttribute("data-id"),
  };

  //insert into the shopping cart
  addIntoCart(courseInfo);
}
// display selected courses into the shopping cart

function addIntoCart(course) {
  //creat a <tr>

  const row = document.createElement("tr");

  //build a template
  row.innerHTML = `
  <tr>
    <td>
    <img src="${course.image}" width=100>
    </td>
    <td>${course.title}</td>
    <td>${course.price}</td>
    <td>
    <a a href="#" class="remove" data-id="${course.id}">X</a>
    </td>
  </tr>
  `;

  //adding into the shopping cart
  shoppingCartContent.appendChild(row);

  //add course into shopping cart
  saveIntoStorage(course);
}

//add the course into local storage

function saveIntoStorage(course) {
  let courses = getCoursesFromStorage();

  //add the course into the Tray
  courses.push(course);

  //since storage only saves string we need  to convert JSON into string
  localStorage.setItem("courses", JSON.stringify(courses));
}

//get the content from storage

function getCoursesFromStorage() {
  let courses;

  if (localStorage.getItem("courses") === null) {
    courses = [];
  } else {
    courses = JSON.parse(localStorage.getItem("courses"));
  }
  return courses;
}

//remove course from the dom

function removeCourse(e) {
  let course, courseId;

  //remove from the DOM

  if (e.target.classList.contains("remove")) {
    e.target.parentElement.parentElement.remove();
    course = e.target.parentElement.parentElement;
    courseId = course.querySelector("a").getAttribute("data-id");
  }
  console.log(courseId);
  //remove from localStorage
  removeCourseLocalStorage(courseId);
}

//removefrom local storage
function removeCourseLocalStorage(id) {
  //get the local storage Data
  let coursesLS = getCoursesFromStorage();

  //loop through the array and find the index to remove

  coursesLS.forEach(function (courseLS, index) {
    if (courseLS.id === id) {
      coursesLS.splice(index, 1);
    }
  });

  //add the rest of the array
  localStorage.setItem("courses", JSON.stringify(courseLS));
}

//clear shopping cart

function clearCart() {
  //shopping cartContent.HTML='';

  while (shoppingCartContent.firstChild) {
    shoppingCartContent.removeChild(shoppingCartContent.firstChild);
  }

  //clear from local storage
  clearlocalStorage();
}
//clear the whole local storage
function clearLocalStorage() {
  localStorag.clear();
}

//loads when document is ready and print courses into shopping cart

function getFromLocalStorage() {
  let coursesLS = getCoursesFromStorage();

  // loop through courses and print into the course
  coursesLS.forEach(function (course) {
    //creat the <tr>
    const row = document.createElement("tr");

    //print the content
    row.innerHTML = `
     <tr>
    <td>
    <img src="${course.Image}" width=100>
    </td>
    <td>${course.title}</td>
    <td>${course.price}</td>

    <a href="#" class="remove" data-id="${course.id}>X</a>
    </a>
  </tr>
     `;
    shoppingCartContent.appendChild(row);
  });
}
