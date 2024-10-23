export const reRender = async (component,domElement)=>{
    //component nào được render : AdminPost
    //domelement vị trí nó được render :content
   document.querySelector(domElement).innerHTML= await component.render();
   // render xong nếu component có afterender thì lại chạy vào afterrender
   if(component.Afterender) component.Afterender();
}