require('../src/db/mongoose')
const User = require('../src/models/user')


// User.findByIdAndUpdate('675edf86f506d0a7146fa270' ,{age: 2}).then((user) => {
//     console.log(user);
//     return User.countDocuments({age:2})
// }).then((result)=>{
//     console.log(result);
// }).catch((e) =>{
//     console.log(e);
// })

const updateage = async (id, age) =>{
    const user = await User.findByIdAndUpdate(id, { age})
    const count = await User.countDocuments({age})
    return count

}
updateage('675e9d4f39bbc74d9bbc37f3' ,2).then((count)=>{
    console.log(count);
}).catch((e)=>{
    console.log(e);
})