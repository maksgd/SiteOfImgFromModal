const slides = document.querySelectorAll('.slide') // массив объектов с классом .slide

for (const slide of slides) {
    slide.addEventListener('click', () => {
        clearActiveClasses()

        slide.classList.add('active') // Добавление класса active объекту при клике
    })
}

function clearActiveClasses() {
    slides.forEach((slide) => {
        slide.classList.remove('active')
    })
}