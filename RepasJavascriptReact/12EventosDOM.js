const heading = document.querySelector('header')

const clickHeading = () =>{
    console.log("diste click!")
}

heading.addEventListener('click', clickHeading )

const enlaces = document.querySelectorAll('nav a')

enlaces.forEach(enlace =>{
    enlace.addEventListener('click', clickHeading)
})