// App.start();

//Test API Rest (1 à la  fois)

Rest.get({
     table:"table1", 
     id: "5",
     where:"2",
     order:"5",
     } 
).done((resp) => {
    $('#main').hide().html("Select : "+resp).fadeIn();
})

// Rest.post({
//          table:"table1", 
//          id: "5",
//          where:"2",
//          order:"5",
//          } ).done((resp) => {
//     $('#main').hide().html('Insert : '+ resp).fadeIn();
// })

// Rest.put({
//          table:"table1", 
//          id: "5",
//          where:"2",
//          order:"5",
//          }).done((resp) => {
//     $('#main').hide().html('Update : '+ resp).fadeIn();
// })

// Rest.delete({
        //  table:"table1", 
        //  id: "5",
        //  where:"2",
        //  order:"5",
        //  }).done((resp) => {
//     $('#main').hide().html('Delete : '+resp).fadeIn();
// })