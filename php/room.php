<php
$db_host = "AnonymusHost";
$db_username = "AnonymusUsername";
$db_password = "AnonymusPassword";
$db_name = "AnonymusDatabaseName";
@mysql_connect("$db_host", "$db_username", "$db_password", "$db_name") or die('Could not connect to mySQL Database...');
@mysql_connect_db("$db_name") or die('No database');

?>
