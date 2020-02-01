const BlogModel=require('../../models/blog');
const User = require("../../models/user")

user = userID =>{
    console.log(userID)
    return User.findById(userID)
    .then(res=>{
        return{
            ...res._doc,
            _id:res.id,
            blogsWritten:blog.bind(this,res.blogsWritten)
        }
    })
}
blog = blogIDS =>{
   return BlogModel.find({_id: {$in:blogIDS}})
   .then(blogs=>{
       return blogs.map(blog=>{
           return{
               ...blog._doc,
               _id: blog.id,
               creator: user.bind(this,blog.creator)
           }
       })
   })
   .catch(err=>console.log(err))
}
module.exports={
    blogs:async (args, request)=>{
        if(!request.isAuth){
            console.log("Error");
            throw new Error("Unauthenticated");
        }
        const uid=request.userId;
        console.log(uid)
        return BlogModel.find()
        .then((blogs_)=>{
            return blogs_.map(blog=>{
                
                return {...blog._doc, _id:blog.id,creator:user.bind(this,blog.creator)};
            })
        }).catch((err)=>{
            console.log(err);
        })
    },
    createBlog: async (args, request)=>{
        if(!request.isAuth){
            console.log("Authentication Error!");
            throw new Error("Unauthenticated");
        }
        const uid=request.userId;
        const blog=new BlogModel({
            title:args.blogInput.title,
            image:args.blogInput.image,
            body:args.blogInput.body,
            creator:uid,
            created:new Date().toDateString()
        })
        let WrittenBlogs
        return blog.save()
        .then((result)=>{
            WrittenBlogs = {...result._doc,_id:result._doc._id.toString(),creator:user.bind(this,result.creator)};
            return User.findById(uid)
        })
        .then(user =>{
            console.log("WORKING WELL!!")
            console.log(user)
            user.blogsWritten.push(blog)
            return user.save()
            
        })
        .then(result=>{
            return WrittenBlogs;
        })
        .catch(err=>console.log(err))
       
    },
    getAllBlogs: async (args, request)=>{
        console.log("Get All")
        return BlogModel.find()
        .then((blogs)=>{
          
            return blogs.map(blog=>{
                return {...blog._doc,
                         _id:blog.id,
                         creator:user.bind(this,blog.creator)
                        };
            })
        }).catch((err)=>{
            console.log(err);
        })
    }
}