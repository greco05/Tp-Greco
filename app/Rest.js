class Rest{

    static get(data){//table, id, where, orderby
        return $.get('rest/index.php', {data})
    }

    static post(data){//table, fields (k,v)
        return $.post("rest/", {table, fields})
    }

    static put(data){//table, id, fields (k,v)
        return $.ajax({
            url: 'rest/',
            type: 'PUT',
            data: JSON.stringify({table, id, fields})
        })
    }

    static delete(data){//table, id
        return $.ajax({
            url: 'rest/',
            type: 'DELETE',
            data: JSON.stringify({table,id})
        })
    }

}

// class Rest{

//     static get(data){//table, id, where, orderby
//         return $.get('rest/', {table, id, where, order})
//     }

//     static post(data){//table, fields (k,v)
//         return $.post("rest/", {table, fields})
//     }

//     static put(data){//table, id, fields (k,v)
//         return $.ajax({
//             url: 'rest/',
//             type: 'PUT',
//             data: JSON.stringify({table, id, fields})
//         })
//     }

//     static delete(data){//table, id
//         return $.ajax({
//             url: 'rest/',
//             type: 'DELETE',
//             data: JSON.stringify({table, id})
//         })
//     }

//}