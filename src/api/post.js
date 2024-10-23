import instance from "./config";
export const getAll=()=>{
     const url=`/posts`
     return instance.get(url)
}
export const get=(id)=>{
    const url=`/posts/${id}`
    return instance.get(url)
}
export const Delete=(id)=>{    // xóa cần phải có 1 id
    const url=`/posts/${id}`
    return instance.delete(url)
}

export const Add=(post)=>{
    const url=`/posts`
    return instance.post(url,post)
}
export const Edit=(post)=>{
    const url=`/posts/${post.id}`
    return instance.put(url,post)
}


