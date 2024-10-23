import Navigo from "navigo";
import Header from "./components/header";
import Homepage from "./page/Homepage";
import Footer from "./components/footer";
import DetailsPage from "./page/Details";

import addPost from "./admin/addPost";
import AdminEdit from "./admin/edit";
import SignUp from "./page/SignUp";
import signIn from "./page/SignIn";
import Category from "./category";
import Products from "./products";
import DetailProduct from "./products/detailsProduct";
import CartPage from "./cart/cart";
import Checkout from "./cart/checkout";
import CheckoutSuccess from "./cart/checkoutsuccess";
import Order from "./cart/orders";
import AoNam from "./products/Aonam";
import DashboardProduct from "./admin/DashBoardProducts";
import DashboardPost from "./admin/DashBoardPost";
import AddProducts from "./admin/addProducts";
import dasboardAdmin from "./admin/DashBordAdmin";
import EditProducts from "./admin/EditProduct";



const router = new Navigo("/",{linksSelector:"a",hash:true})  // biến router được khởi tạo từ navigo: có 2 tham số linkse..a k load lại trang
//router on duyệt ra tất cả các đường dẫn của chúng ta
const print =  async (content,id)=>{
    // đổi về sau phải import header và footer vào từng page
   // document.getElementById("header").innerHTML=Header.render()   // header k thay đổi
    document.getElementById("content").innerHTML=  await content.render(id)  // đây là content nội dung thay đổi
  
   // document.getElementById("footer").innerHTML=Footer.render();  // footer k thay đổi
    if(content.Afterender) content.Afterender(id);
}
//const userId=2
// sử dụng hook trong navigo nó nếu trùng đường link 
router.on("/admin/*/",()=>{},{
    before:(done)=>{ 
        // done là ở là hàm tiếp theo để chạy cũng là callback
        if(localStorage.getItem('user')) // nếu localstorage có user
        {
          // console.log("1")
          const userId =JSON.parse(localStorage.getItem('user')).id // nếu trong localtrorage có id 
          if(userId === 2) // nếu id bằng 1
          {
            done()    // thì chạy hàm tiếp theo
          }else{
            document.location.href="/"  // nếu k bằng thì sẽ load về trang chủ
          }
        } else{
            document.location.href="/signin"
        }
        // if(userId==1)
        // {
        //   done()
        // }else{
        //     document.location.href="/#/"  // nếu k bằng thì sẽ load về trang chủ
        // }
    }
   })
router.on(
    {
        "/":  ()=>{
         print( Homepage)
        },
        "/about":()=>{
            console.log("about page")
        },
        "/category":()=>{
            print(Category)
        },
        "/products":()=>{
           print(Products)
        },
        "/sanpham/:id":(data)=>{
            const {id} = data.data
            console.log(id)
            print(AoNam,id)
        },
        "/products/:id":(data)=>{
           
            const {id} = data.data
            console.log(id)
             print( DetailProduct,id)
        },
        "/news/:id":(data)=>{  // navigo cho thằng data trả về 1 object để lấy giá trị id của nó
            const {id} = data.data
            console.log(id)
             print(DetailsPage,id)
        },
        "/admin/dasboard":()=>{
            print(dasboardAdmin)
        },
        "/admin/dasboardPost":()=>{
          print(DashboardPost);
        },
        "/admin/addpost":()=>{
            print(addPost);
        },
        "/admin/edit/:id":(data)=>{
            const {id} = data.data
            console.log(id)
            print(AdminEdit,id)
        },
        "/admin/editProducts/:id":(data)=>{
            const {id} = data.data
            console.log(id)
            print(EditProducts,id)
        },
        "/admin/dasboardProduct":()=>{
          print(DashboardProduct);
        },
        "/admin/addproduct":()=>{
            print(AddProducts);
        },
        "/signup":()=>{
            print(SignUp)
        },
        "/signin":()=>{
            print(signIn)
        },
        "/cartPage":()=>{
            print(CartPage)
        },
        "/checkout":()=>{
            print(Checkout)
        },
        "/checkoutsuccess":()=>{
            print(CheckoutSuccess)
        },
        "/orders":()=>{
            print(Order)
        }

        
    }
)
router.resolve()



// call back
// const a = 20;
// const b = 30;

// function sum(a,b,callback)
// {
 
//   const c = (a+b)*2
//   callback(c);
// }
// sum(a,b,function(result)
// {
//   document.write(result)
// })



// bất đồng bộ trong callback
// 
//promise
 function loads(src)
 {
     return new Promise((resolve,reject)=>{
         const script = document.createElement('script')
         script.src=src
         script.load =() =>{
             resolve(script)
        }
         script.erooor =()=>{
           reject(new Error("lỗi kết nối"))       }
         document.head.append(script)
    })

    
 }
 loads("https://www.facebook.com/anhss.ngocss.75098")
// .then((script)=>{
//     console.log(script)
// })
// .catch(eroor =>{
//     console.log(eroor)
// })

//aync /await
async function asynload()
{
    const result = await loads("https://www.facebook.com/anhss.ngocss.75098")
    
}
asynload()