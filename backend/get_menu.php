<?php
$id = $_GET["id"];

$username = "id6406501_admin";
$password = "Password1";
$url = "localhost";
$db = "id6406501_menu_app_db";

$conn = new mysqli($url, $username, $password, $db);

$select = "select fastfood_outlet_id  from fastfood_table where fastfood_outlet_name ='". $id . "'";

if($conn->connect_error){
    echo "Failed to connect";
}else{
    $data = array();

    $result = mysqli_query($conn, $select);
    if(mysqli_num_rows($result) > 0){
        $row = mysqli_fetch_assoc($result);
           $id =  $row["fastfood_outlet_id"];
           $select = "select * from meal_table where outlet_id=" . $id;
            echo "<br>";
           $result = mysqli_query($conn, $select);
           if(mysqli_num_rows($result) > 0){
               while($row = mysqli_fetch_assoc($result)){
                   array_push($data, array('id' => $row["meal_id"], 'name' => $row["meal_name"], 
                   'description' => $row["meal_description"], 'price' => $row["meal_price"], 
                   'image' => str_replace(" ", "_", $row["meal_image"]), 'category' => $row["meal_category"]));
               }
           }
           $data = json_encode($data);
           print_r($data);
    }
    $conn->close();
}
?>