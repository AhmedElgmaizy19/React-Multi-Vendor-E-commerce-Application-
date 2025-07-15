

function CartID() {
  const genrateRandomString = ()=> {
    const lenght = 30
    const string = 'ABCDEFGHJKLMNPIPQUSXYZabcdefghjklmnipqusxyz0123456789'
    let randomString = ""

    for (let i=0; i<lenght; i++ ) {
        const randomIdx = Math.floor(Math.random() * string.length)
        randomString += string.charAt(randomIdx)
    }

    localStorage.setItem("randomString" , randomString)
  }

  const existingString = localStorage.getItem("randomString")

  if (!existingString) {
    genrateRandomString()
  }

  return existingString 
}

export default CartID