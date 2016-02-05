<php
$db_host = "mysql6.000webhost.com";
$db_username = "a2192796_romDat";
$db_password = "password";
$db_name = "a2192796_roomDat";
@mysql_connect("$db_host", "$db_username", "$db_password", "$db_name") or die('Could not connect to mySQL Database...');
@mysql_connect_db("$db_name") or die('No database');

?>