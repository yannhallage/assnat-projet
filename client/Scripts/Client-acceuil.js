
if (document.cookie !== ""){
    console.log(true)
    console.log(document.cookie)
}else{
    console.log(false)
    window.location.href='/'
}
 
let nextpage_administrateur = document.querySelector('#nextpage-administrateur')
let nextpage_historique = document.querySelector('#nextpage-historique')
let nextpage_transaction =document.querySelector('#nextpage-transaction')
let btn_transaction = document.querySelector('#btn-transaction')
let variable_bool = false
let option = document.querySelector('#option')
let mini_menu  = document.querySelector('#mini-menu')
let btn_with_pic = document.querySelector('#btn_with_pic')
let btn_deconnexion = document.querySelector('#Deconnexion')
let exportss = document.querySelector('#nextpage-export')

// deconnexion et fermerture de la session 
// btn_deconnexion.addEventListener('click', () =>{
//     console.log('deconnection de la session')
//     document.cookie = "session=; expires=Thu, 01 Jan 1970 00"
// })
// on lui donne ici un click 
btn_with_pic.addEventListener('click', () =>{
    // on cache le menu-mini
    variable_bool = !variable_bool
    console.log(variable_bool)
    changeMiniMenu(variable_bool)
})

// fonction qui ecoute seulemnt le changement
const changeMiniMenu = (a) =>{
    if(a == true){
        mini_menu.style.visibility = 'visible'
    }else{
        mini_menu.style.visibility = 'hidden'
    }
}
// cacher et afficher 
// btn_transaction.addEventListener('click', () =>{
//     // on cache le menu-mini
//     variable_bool = !variable_bool
//     console.log(variable_bool)
//     changeTransaction(variable_bool)
// })

const changeTransaction = (a) =>{
    if(a == true){
        option.classList.remove('hidden')
    }else{
        option.classList.add('hidden')
    }
}

// teste 
nextpage_transaction.addEventListener('click' ,(e)=>{
    e.preventDefault()
    console.log('test')
    window.location.href="transaction"
})

nextpage_administrateur.addEventListener('click' ,(e)=>{
    e.preventDefault()
    console.log('test')
    window.location.href="admin"
})
nextpage_historique.addEventListener('click' ,(e)=>{
    e.preventDefault()
    console.log('test')
    window.location.href="historique"
})

exportss.addEventListener('click', (e)=>{ e.preventDefault(); console.log(true) ;window.location.href='export'})