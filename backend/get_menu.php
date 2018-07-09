<?php
header("Access-Control-Allow-Origin: *");
$restaurantName = $_GET["id"];

$username = "id6406501_admin";
$password = "Password1";
$url = "localhost";
$db = "id6406501_menu_app_db";

$conn = new mysqli($url, $username, $password, $db);

$select = "select fastfood_outlet_id  from fastfood_table where fastfood_outlet_name ='". $restaurantName . "'";

if($conn->connect_error){
    echo "Failed to connect";
}else{
    $data = array();

    $result = mysqli_query($conn, $select);
    if(mysqli_num_rows($result) > 0){
        $row = mysqli_fetch_assoc($result);
           $id =  $row["fastfood_outlet_id"];
           $select = "select * from meal_table where outlet_id=" . $id;
           $result = mysqli_query($conn, $select);
           if(mysqli_num_rows($result) > 0){
               while($row = mysqli_fetch_assoc($result)){
                   if(strpos($row["meal_image"], "none") !== false){
                       $image = "No_Image_Available.png";
                   }else{
                       $image = $restaurantName . "/" . str_replace(" ", "_", $row["meal_image"]);
                   }
                   $image = "http://congos3.000webhostapp.com/menu_app/" . $image;
                   array_push($data, array('id' => $row["meal_id"], 'name' => $row["meal_name"], 
                   'description' => $row["meal_description"], 'price' => $row["meal_price"], 
                   'image' => $image, 'category' => $row["meal_category"]));
               }
           }
         
          echo json_encode($data);
    }
    $conn->close();
}
?>