<?php
switch ($_SERVER["REQUEST_METHOD"]) {
    case 'GET': // table, id, where, ord
        $_get = validate_request($_GET);
        $table = isset($_get['table']) ? $_get['table'] : null;
        $id = isset($_get['id']) ? $_get['id'] : null;
        $where = isset($_get['where']) ? $_get['where'] : null;
        $ordered = isset($_get['order']) ? $_get['order'] : null;
        if($table == null){
         echo json_decode(false);
        }
        echo json_decode($table, $id, $where, $ordered);
        break;

        case 'POST': // table, fields 
        $_post = validate_request($_POST);
        $table = isset($_post['table']) ? $_post['table'] : null;
        $fields = isset($_post['fields']) ? $post['fields'] : null;
        if($table == null){
         echo json_decode(false);   
        }
        echo json_decode($table, $fields) 
        break;

        case 'UPDATE': // table, id, fields
        $_put = json_decode(file_get_contents('php://input'), true);
        $table = isset($_put['table']) ? $_put['table'] : null;
        $id = isset($_put['id']) ? $_put['id'] : null;
        $fields = isset($_post['fields']) ? $post['fields'] : null;
        if($table == null || $id == null){
         echo json_decode(false);
        }
        
        echo json_decode($table, $fields); 
        break;

        case 'DELETE': // table, id
        $_del = json_decode(file_get_contents('php://input'), true);
        $table = isset($_del['table']) ? $_del['table'] : null;
        $id = isset($_del['id']) ? $_del['id'] : null;
        if($table == null || $id == null){
         echo json_decode(false); 
        }
        echo json_decode($table, $id);
        break;
    }

function validate_request($request)
{
    foreach ($request as $k => $v) {
        if(is_array($v)){
            validate_request($v);
        }
        else{
            $request[$k] = htmlspecialchars(strip_tags(stripslashes(trim($v))));
        }
    }
    return $request;
}
