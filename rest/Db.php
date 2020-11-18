<?php
class Db
{

    private static $db = null;
    private static function connect()
    {
        if (self::$db === null) {
            $dsn = "mysql:host=localhost;port=3306;dbname=stepbystep";;
            $user = "root";
            $pass = "";

            try {
                self::$db = new PDO(
                    $dsn,
                    $user,
                    $pass,
                    array(
                        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                        PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8",
                        PDO::ATTR_PERSISTENT => true
                    )
                );
            } catch (PDOException $e) {
                var_dump($e);
                exit();
            }
        }
        return self::$db;
    }

    private static $stmt = null;
    public static function query($sql, $params = null)
    {
        $result = false;
        try {
            $stmt = self::connect()->prepare($sql);
            Db::$stmt = $stmt;
            $result = $stmt->execute($params);
        } catch (PDOException $e) {
            var_dump($e);
            exit();
        }
        return $result;
    }

    public static function select($table, $id, $active, $orderby) // ok
    {
        $cond = "";
        $values = [];
        if(isset($active, $id)){
           $cond = "WHERE active=? AND id=?";
            array_push($values, $active, $id);
        }
        else if(isset($active)){
            $cond = "WHERE active=?";
            array_push($values , $active);
        }
        else if(isset($id)){
            $cond = "WHERE id=?";
            array_push($values , $id);
        }
        if(isset($orderby)){
            $cond .= "ORDER BY ?";
            array_push($values, $orderby);
        }
        $sql = "SELECT * FROM $table $cond";
        $resp = self::query($sql, $values);
        $rows = Db::$stmt->fetchAll(PDO::FETCH_ASSOC);
        return json_encode($rows);

    }

    public static function insert($table, $fields)
    {
        $colums = "";
        $cond = "";
        $values = [];
        foreach($fields as $k => $v){
            $colums .= $k .",";
            $cond .= "?,";
            array_push($values, $v);
        }
        $colums = trim($colums, ",");
        $cond = trim($cond, ",");
        $sql = "INSERT INTO $table ($colums) VALUES ($cond)";
        $resp = self::query($sql, $values);
        $resp = $resp && Db::$stmt->rowCount() == 1;
        return json_encode($resp);
    }

    public static function update($table, $id, $fields)
    {
        $cond = "";
        $values = [];
        foreach($fields as $k => $v){
            $cond .= $k."=?,";
            array_push($values, $v);
        }
        $cond = trim($cond, ",");
        $cond .= "WHERE id=?";
        array_push($values, $id)   ;  
        $sql = "UPDATE $table SET $cond";
        $resp = self::query($sql, $values);
        $resp = $resp && Db::$stmt->rowCount() == 1;
        return json_encode($resp);
    }

    public static function delete($table, $id) // ok
    {
        $values = [];
        $cond = "id =?";
        array_push($values, $id);
        $sql = "DELETE FROM $table WHERE $cond";
        $resp = self::query($sql, $values);
        $resp = $resp && Db::$stmt->rowCount() == 1;
        return json_encode($resp);
    }
}
