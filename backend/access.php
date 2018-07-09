<?php
//set this header to allow Cross Origin Resource Sharing CORS
header("Access-Control-Allow-Origin: *");

//get the user input required for registration or logging in
$customer_name = $_GET["name"];
$customer_surname = $_GET["surname"];
$customer_username = $_GET["username"];
$customer_email = $_GET["email"];
$customer_password = $_GET["password"];

//required to open a connection to the database
$username = "id6406501_admin";
$password = "Password1";
$url = "localhost";
$db = "id6406501_menu_app_db";

//establish a connection to the database
$conn = new mysqli($url, $username, $password, $db);
if($conn->connect_error){
    echo "Failed to connect";
}else{
//if customer name and surname are empty, consider it as a login, else consider it as a registration request.

//default response from the server
$response = array("result" => "failde", "message" => "Could not process request.");

$select = "select * from customer_table where customer_username='" . $customer_username . "'";
$insert = "insert into customer_table (customer_name, customer_surname, customer_username, customer_email, password) Values ('".$customer_name ."','".$customer_surname."','".$customer_username."','".$customer_email."','".$customer_password."')";
if(strlen($customer_name) == 0 && strlen($customer_surname) == 0){
    echo 'login';
    //perform login operation here
    $result = mysqli_query($conn, $select);
    if(mysqli_num_rows($result) > 0){
        $row = mysqli_fetch_assoc($result);
        $rs_pword = $row["password"];
        if($customer_password === $rs_pword){
            $response = array("result" => "success");
        }else{
            $response = array("result" => "failed", "message" => "Invalid username and password combination.");
        }
    }else{
        $response = array("result" => "failed", "message" => "User not found");
    }
}else{
    echo 'register';
    // perform registration operation here
    $result = mysqli_query($conn, $select);

    if(mysqli_num_rows($result) > 0){
        $response = array("result" => "failed", "message" => "The user name entered has been taken.");
    }else{
        if($conn->query($insert) === TRUE){
            $response = array("result" => "success");
        }else{
            $response = array("result" => "failed", "message" => "Failed registration.");
        }
    }

}
}

echo json_encode($response);
$conn->close();
?>