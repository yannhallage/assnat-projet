const btn_for_declencheur = ()=>{
    // btn return
btn_return.addEventListener('click', function(){
    window.location.href="/acceuil"
    console.log(true)
})
// solde
btn_sold.addEventListener('click' , ()=>{
    console.log(true)
    second.classList.add('hidden')
    third.classList.add('hidden')
    sold.classList.remove('hidden')
    file.classList.add('hidden')
})
// versement
btn_versmt.addEventListener('click', ()=>{
    console.log(true)
    sold.classList.add('hidden')
    third.classList.add('hidden')
    second.classList.remove('hidden')
    file.classList.add('hidden')
})
// retrait 
btn_retrt.addEventListener('click', ()=>{
    console.log(true)
    console.log(second)
    second.classList.add('hidden')
    sold.classList.add('hidden')
    third.classList.remove('hidden')
    file.classList.add('hidden')
})
// consulter 
file_c.addEventListener('click', ()=>{
    console.log(true)
    file.classList.remove('hidden')
    second.classList.add('hidden')
    third.classList.add('hidden')
    sold.classList.add('hidden')
})

}
export default btn_for_declencheur