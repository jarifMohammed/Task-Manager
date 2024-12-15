const Task = require('../src/models/task'); // Correct import

require('../src/db/mongoose'); // Ensure this file connects to the database

// Task.findByIdAndDelete('675ee22a8fe98db77961edd6') // Use `Task`, not `task`
//     .then((task) => {
//         if (!task) {
//             return console.log('No task found with the given ID.');
//         }
//         console.log('Deleted Task:', task);
//         return Task.countDocuments({ completed: false });
//     })
//     .then((result) => {
//         console.log('Incomplete tasks count:', result);
//     })
//     .catch((e) => {
//         console.log('Error:', e);
//     });

const  deleteandcount  = async (id) =>{
    const task = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({completed:false})
    return count
}

deleteandcount('675e9ea2ecac15ba67418224').then((count)=>{
    console.log(count);
}).catch((e)=>{
    console.log(e);
})