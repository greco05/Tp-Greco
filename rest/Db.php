<?php
class Db
{

    private static $db = null;
    private static function connect()
    {
        if (self::$db === null) {
            // Paramètres de configuration DB
            /* ... */

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
            /* ... */
        } catch (PDOException $e) {
            var_dump($e);
            exit();
        }
        return $result;
    }

    public static function select($table, $id, $where, $orderby)
    {
        /* ... */
    }

    public static function insert($table, $fields)
    {
        /* ... */
    }

    public static function update($table, $id, $fields)
    {
        /* ... */
    }

    public static function delete($table, $id)
    {
        /* ... */
    }
}
