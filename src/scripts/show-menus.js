const burguerMenuBtn = document.getElementById('burguer_menu_btn')
const drinkMenuBtn = document.getElementById('drink_menu_btn')
const menuBurguer = document.getElementById('menu_burguer')
const menuDrink = document.getElementById('menu_drink')

burguerMenuBtn.addEventListener('click', function () {
    burguerMenuBtn.classList.remove('text-gray-500')
    burguerMenuBtn.classList.add('bg-white', 'text-black', 'shadow-xl')
    drinkMenuBtn.classList.remove('bg-white', 'text-black', 'shadow-xl')
    drinkMenuBtn.classList.add('text-gray-500')
    showMenuBurguer()
    window.scrollTo(0, 0)
})

function showMenuBurguer() {
        menuBurguer.classList.remove('hidden')
        menuBurguer.classList.add('grid')
        menuDrink.classList.add('hidden')
        menuDrink.classList.remove('grid')
}

drinkMenuBtn.addEventListener('click', function () {
    drinkMenuBtn.classList.remove('text-gray-500')
    drinkMenuBtn.classList.add('bg-white', 'text-black', 'shadow-xl')
    burguerMenuBtn.classList.remove('bg-white', 'text-black', 'shadow-xl')
    burguerMenuBtn.classList.add('text-gray-500')
    showMenuDrink()
    window.scrollTo(0, 0)
})

function showMenuDrink() {
    menuDrink.classList.remove('hidden')
    menuDrink.classList.add('grid')
    menuBurguer.classList.add('hidden')
    menuBurguer.classList.remove('grid')
}