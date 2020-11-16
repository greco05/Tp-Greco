//App.start();

//Test API Rest (1 à la  fois)

Rest.get({
     table:"table1", 
     id: "5",
     where:"2",
     order:"5"
     } 
).done((resp) => {
    $('#main').hide().html("Select : "+resp).fadeIn();
})

// Rest.post(/* ... */).done((resp) => {
//     $('#main').hide().html(resp).fadeIn();
// })

// Rest.put(/* ... */).done((resp) => {
//     $('#main').hide().html(resp).fadeIn();
// })

// Rest.delete(/* ... */).done((resp) => {
//     $('#main').hide().html(resp).fadeIn();
// })