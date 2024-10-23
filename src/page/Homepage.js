
import Banner from "../components/banner";
import Footer from "../components/footer";
import Header from "../components/header";
import NewList from "../components/Newlist";





const Homepage = {
 async render() 
  {
    
   
    return /*html*/`
     <!-- Import the Header here -->
     <div id="header">
     ${await Header.render()}
     </div>
     <div class="banner">
       ${Banner.render()}
     </div>
   
   <div class="bg-white py-16">
      ${ await NewList.render()}
   </div>
   <div id="footer">
   ${Footer.render()}
   </div>
    `
  },
  Afterender()
  {
    Header.Afterender()
  }
}

export default Homepage;