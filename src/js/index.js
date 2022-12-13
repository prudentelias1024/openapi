function closeNav(){
    document.getElementById("mobile__nav").style.display = 'none'
}
function openNav(){
    document.getElementById("mobile__nav").style.display = 'block'
}
async function copyCode(){
    
    let textToCopy = document.getElementById('copy__code').innerText
   document.execCommand("copy")
  await navigator.clipboard.writeText(textToCopy)

}
// function animate(){
//    let elements = document.querySelectorAll('.code')
//    console.log(elements)
//    const observer = new IntersectionObserver((entries) => {
//        entries.forEach(entry => {
//            if(entry.isIntersecting){
//                entry.target.classList.add('show')
//             } else{
//                 entry.target.classList.add('show')
//             }
//         })
//     })
//     elements.forEach((elem) => {observer.observe(elem)})
//     console.log(elements)
// }