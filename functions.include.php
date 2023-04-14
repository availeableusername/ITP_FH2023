<?php

function emptyInputSignup($firstName, $lastName, $email, $username, $pwd, $repeatPwd) {
    $result = true;
    if(empty($firstName) || empty($lastName) || empty($email) || empty($username) || empty($pwd) || empty($repeatPwd)) {
    $result = true;
    } else {
        $result = false;
    }
    return $result;
}

function invalidUsername($username) {
    $result = true;
    if(!preg_match("/^[a-zA-Z0-9]*$/", $username)) {
    $result = true;
    } else {
        $result = false;
    }
    return $result;
}

function invalidEmail($email) {
    $result = true;
    if(!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $result = true;
    } else {
        $result = false;
    }
    return $result;
}

function passwordMatch($pwd, $repeatPwd) {
    $result = true;
    if($pwd !== $repeatPwd) {
    $result = true;
    } else {
        $result = false;
    }
    return $result;
}

function usernameExists($conn, $username, $email) {
    $sql = "SELECT * FROM users WHERE username = ? OR email = ?;";
    // prepared statement gegen sql injection
    $stmt = mysqli_stmt_init($conn);
    if(!mysqli_stmt_prepare($stmt, $sql)) {
        header("location: ../signup.php?error=statementfailed");
		exit();
    }

    mysqli_stmt_bind_param($stmt, "ss", $username, $email);
    mysqli_stmt_execute($stmt);

    $resultData = mysqli_stmt_get_result($stmt);

    if($row = mysqli_fetch_assoc($resultData)) {
        return $row;
    } else {
        $result = false;
        return $result;
    }

    mysqli_stmt_close($stmt);
}


function createUser($conn, $firstName, $lastName, $email, $username, $pwd) {
    $sql = "INSERT INTO users (firstName, lastName, email, username, pwd) VALUES (?, ?, ?, ?, ?);";
    $stmt = mysqli_stmt_init($conn);
    if(!mysqli_stmt_prepare($stmt, $sql)) {
        header("location: ../signup.php?error=statementfailed");
		exit();
    }

    $hashedPwd = password_hash($pwd, PASSWORD_DEFAULT);

    mysqli_stmt_bind_param($stmt, "sssss", $firstName, $lastName, $email, $username, $hashedPwd);
    mysqli_stmt_execute($stmt);
    mysqli_stmt_close($stmt);
    header("location: ../signup.php?error=none");
		exit();
}

function emptyInputLogin($username, $pwd) {
    $result = true;
    if(empty($username) || empty($pwd)) {
    $result = true;
    } else {
        $result = false;
    }
    return $result;
}

function loginUser($conn, $username, $pwd) {
    $usernameExists = usernameExists($conn, $username, $username);

    if($usernameExists === false) {
        header("location: ../login.php?error=wronglogin");
		exit();
    }

    $sql = "SELECT userStatus FROM users WHERE username = ?;";
    $stmt = mysqli_stmt_init($conn);
    if(!mysqli_stmt_prepare($stmt, $sql)){
        header("location: ../login.php?error=statementfailed");
        exit();
    }
    mysqli_stmt_bind_param($stmt, "s", $username);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);
    $row = mysqli_fetch_assoc($result);
    $status = $row["userStatus"];

    if($status == 1){
        header("location: ../login.php?error=inactive");
        exit();
    }

    $pwdHashed = $usernameExists["pwd"];
    $checkPwd = password_verify($pwd, $pwdHashed);

    if($checkPwd === false) {
        header("location: ../login.php?error=wronglogin");
		exit();
    }
    else if ($checkPwd === true) {
        session_start();
        $_SESSION["userid"] = $usernameExists["ID"];
        $_SESSION["useruid"] = $usernameExists["username"];
        header("location: ../home.php?");
		exit();
    }
}

function userProfile($conn, $username){
    $sql = "SELECT firstName, lastName, email, username FROM users WHERE username = ?;"; //$_SESSION["useruid"]
    $stmt = mysqli_stmt_init($conn);
    if(!mysqli_stmt_prepare($stmt, $sql)){
        header("location: ../profile.php?error=statementfailed");
        exit();
    } else {
        mysqli_stmt_bind_param($stmt, "s", $username);
        mysqli_stmt_execute($stmt);
        $result = mysqli_stmt_get_result($stmt);

        while($row = mysqli_fetch_assoc($result)){
            echo "<p>Vorname: " . $row ["firstName"] . "<p>";
            echo "<p>Nachname: " . $row["lastName"] . "<p>";
            echo "<p>Email: " . $row["email"] . "<p>";
            echo "<p>Benutzername: " . $row["username"] . "<p>";
        } 
    }
    
    
}


function updateUserData($conn, $firstName, $lastName, $email, $pwd, $pwdNew, $pwdRepeat, $username){
   // $username = $_SESSION["useruid"];
    
    $getPwd = getPwd($conn, $username);
    $pwdHashed = $getPwd["pwd"];
    $checkPwd = password_verify($pwd, $pwdHashed);


    if($checkPwd === false) {
        header("location: ../profile.php?error=wrongpassword");
		exit();
    }
    
    if($_POST["firstName"] != ""){
        $sql = "UPDATE users SET firstName = ? WHERE username = ?;";
        $stmt = mysqli_stmt_init($conn);
        if(!mysqli_stmt_prepare($stmt, $sql)){
            echo "Statement failed";
            header("location: ../profile.php?statementfailed");
            exit();
        }
        mysqli_stmt_bind_param($stmt, "ss", $firstName, $username);
        mysqli_stmt_execute($stmt);
        mysqli_stmt_close($stmt);
       // header("location: ../profile.php?update=successful");
        }
        print_r($_POST["firstName"]);
        if(!$_POST["lastName"] == ""){
            $sql = "UPDATE users SET lastName = ? WHERE username = ?;";
            $stmt = mysqli_stmt_init($conn);
            if(!mysqli_stmt_prepare($stmt, $sql)){
                echo "Statement failed";
                header("location: ../profile.php?statementfailed");
                exit();
            }
            mysqli_stmt_bind_param($stmt, "ss", $lastName, $username);
            mysqli_stmt_execute($stmt);
            mysqli_stmt_close($stmt);
       //     header("location: ../profile.php?update=successful");
        }

        if($_POST["email"] != ""){
            $sql = "UPDATE users SET email = ? WHERE username = ?;";
            $stmt = mysqli_stmt_init($conn);
            if(!mysqli_stmt_prepare($stmt, $sql)){
                echo "Statement failed";
         //       header("location: ../profile.php?statementfailed");
                exit();
            }
            mysqli_stmt_bind_param($stmt, "ss", $email, $username);
            mysqli_stmt_execute($stmt);
            mysqli_stmt_close($stmt);
       //     header("location: ../profile.php?update=successful");
        }

        if($_POST["email"] != ""){
            $sql = "UPDATE users SET email = ? WHERE username = ?;";
            $stmt = mysqli_stmt_init($conn);
            if(!mysqli_stmt_prepare($stmt, $sql)){
                echo "Statement failed";
                header("location: ../profile.php?statementfailed");
                exit();
            }
            mysqli_stmt_bind_param($stmt, "ss", $email, $username);
            mysqli_stmt_execute($stmt);
            mysqli_stmt_close($stmt);
         //   header("location: ../profile.php?update=successful");
        }

        if($_POST["pwdNew"] != ""){
            if($_POST["pwdRepeat"] != ""){
                if($pwdNew == $pwdRepeat){
                    $hashedPwd = password_hash($pwdNew, PASSWORD_DEFAULT);
                    $sql = "UPDATE users SET pwd = ? WHERE username = ?;";
                    $stmt = mysqli_stmt_init($conn);
                    if(!mysqli_stmt_prepare($stmt, $sql)){
                        echo "Statement failed";
                        header("location: ../profile.php?statementfailed");
                        exit();
                    }
                    mysqli_stmt_bind_param($stmt, "ss", $hashedPwd, $username);
                    mysqli_stmt_execute($stmt);
                    mysqli_stmt_close($stmt);
       //             header("location: ../profile.php?update=successful");
                } else {
                    header("location: ../profile.php?error=nomatch");
                    exit();
                }
            }
        }
        header("location: ../profile.php?update=successful");
        exit();
}

function emptyInputProfile($firstName, $lastName, $email, $username, $pwd, $repeatPwd) {
    $result = true;
    if(empty($firstName) && empty($lastName) && empty($email) && empty($username) && empty($pwd) && empty($pwdRepeat) && empty($pwdNew)) {
    $result = true;
    } else {
        $result = false;
    }
    return $result;
}

function checkDateRoom($beginn, $end){
        $result = true;
        if($beginn > $end){
            $result = true;
        }
        else{
            $result = false;
        }
        return $result;

}

function getPwd($conn, $username) {
    $sql = "SELECT * FROM users WHERE username = ?;";
    // prepared statement gegen sql injection
    $stmt = mysqli_stmt_init($conn);
    if(!mysqli_stmt_prepare($stmt, $sql)) {
        header("location: ../profile.php?error=statementfailed");
		exit();
    }

    mysqli_stmt_bind_param($stmt, "s", $username);
    mysqli_stmt_execute($stmt);

    $resultData = mysqli_stmt_get_result($stmt);

    if($row = mysqli_fetch_assoc($resultData)) {
        return $row;
    } else {
        $result = false;
        return $result;
    }

    mysqli_stmt_close($stmt);
}

function roomReservation($rooms, $beginn, $end, $breakfast, $parking, $pet, $conn, $total){     //foodReservation
    $username = $_SESSION["useruid"];
    
    $getId = getPwd($conn, $username);
    $id = $getId["ID"];

    if($rooms == "twoPerson"){
        $sql = "UPDATE rooms SET booked = 1, bookingStatus = 0, userID = ?, beginn = ?, ende = ?  WHERE roomID = (SELECT MIN(roomID) FROM rooms WHERE booked = 0 AND capacity = 2);";
        $sqlRoomID = "SELECT MAX(roomID) FROM rooms WHERE booked = 1 AND capacity = 2;";
    }
    else{
        $sql = "UPDATE rooms SET booked = 1, bookingStatus = 0, userID = ?, beginn = ?, ende = ? WHERE roomID = (SELECT MIN(roomID) FROM rooms WHERE booked = 0 AND capacity = 4);";
        $sqlRoomID = "SELECT MAX(roomID) FROM rooms WHERE booked = 1 AND capacity = 4;";
    }
    $stmt = mysqli_stmt_init($conn);
    if(!mysqli_stmt_prepare($stmt, $sql)) {
        header("location: ../rooms.php?error=noroomsleft");
		exit();
    }

    mysqli_stmt_bind_param($stmt, "sss", $id, $beginn, $end);
    mysqli_stmt_execute($stmt);
  //  mysqli_stmt_close($stmt);

    $stmt2 = mysqli_stmt_init($conn);

    if(!mysqli_stmt_prepare($stmt2, $sqlRoomID)) {
        header("location: ../rooms.php?error=statementfailed");
        exit();
    }
    mysqli_stmt_execute($stmt2);
    $resultData = mysqli_stmt_get_result($stmt2);
    $row = mysqli_fetch_array($resultData);
    $roomID = $row[0];

    $stmt3 = mysqli_stmt_init($conn);

    if($breakfast == 1){
        $sql = "UPDATE rooms SET breakfast = 1 WHERE roomID = ?";

        if(!mysqli_stmt_prepare($stmt3, $sql)) {
            header("location: ../rooms.php?error=statementfailed");
            exit();
        }
        mysqli_stmt_bind_param($stmt3, "i", $roomID);
        mysqli_stmt_execute($stmt3);
        
    }

    if($parking == 1){
        $sql = "UPDATE rooms SET parking = 1 WHERE roomID = ?";

        if(!mysqli_stmt_prepare($stmt3, $sql)) {
            header("location: ../rooms.php?error=statementfailed");
            exit();
        }
        mysqli_stmt_bind_param($stmt3, "i", $roomID);
        mysqli_stmt_execute($stmt3);
        
    }

    if($pet == 1){
        $sql = "UPDATE rooms SET pet = 1 WHERE roomID = ?";

        if(!mysqli_stmt_prepare($stmt3, $sql)) {
            header("location: ../rooms.php?error=statementfailed");
            exit();
        }
        mysqli_stmt_bind_param($stmt3, "i", $roomID);
        mysqli_stmt_execute($stmt3);
    }
    $sql = "UPDATE rooms SET price = ? WHERE roomID = ?";
    $stmt4 = mysqli_stmt_init($conn);
    if(!mysqli_stmt_prepare($stmt4, $sql)) {
        header("location: ../rooms.php?error=statementfailed");
		exit();
    }

    mysqli_stmt_bind_param($stmt4, "ii", $total, $roomID);
    mysqli_stmt_execute($stmt4);

}


function getRooms($conn, $username){
    $sql = "SELECT * FROM users WHERE username = ?;"; 
    $stmt = mysqli_stmt_init($conn);
    if(!mysqli_stmt_prepare($stmt, $sql)){
        header("location: ../rooms.php?error=statementfailed");
        exit();
    } 
     mysqli_stmt_bind_param($stmt, "s", $username);
     mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);
    $row = mysqli_fetch_assoc($result);
    $id = $row["ID"];

   // $row2 = mysql_fetch_assoc($result);
   // echo $row["ID"];
    //$id = $row["ID"];
    //print_r($id);

    $sql = "SELECT * FROM rooms WHERE userID = ?;";
    if(!mysqli_stmt_prepare($stmt, $sql)){
        header("location: ../rooms.php?error=statementfailed");
        exit();
    }
    mysqli_stmt_bind_param($stmt, "i", $id);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);
    $zimmer = 1;
 //   $preis = fucntion;
    while($row = mysqli_fetch_assoc($result)){
        echo "<tr>Zimmer: " . $zimmer++ . "<tr>";
        echo "<br>";
        echo "<tr>";
        echo "<td>Größe: " . $row ["capacity"] . " Bett Zimmer<td>";
        echo "<br>";
        echo "<td>Anreise: " . $row["beginn"] . "<td>";
        echo "<br>";
        echo "<td>Abreise: " . $row["ende"] . "<td>";
        echo "<br>";
        if($row["breakfast"] == 1){
            echo "<td>Mit Frühstück - 30€/Tag";
        }
        else{
            echo "<td>Ohne Frühstück";
        }
        echo "<br>";
        if($row["parking"] == 1){
            echo "<td>Mit Parkplatz - 10€/Tag";
        }
        else{
            echo "<td>Ohne Parkplatz";
        }
        echo "<br>";
        if($row["pet"] == 1){
            echo "<td>Mit Haustier - 50€/Tag";
        }
        else{
            echo "<td>Ohne Haustier";
        }
        echo "<br>";
        echo "<td>Preis: " . $row["price"] . "€<td>";
        echo "<br>";
        if($row["bookingStatus"] == 0){
            echo "<td>Status: Neu";
        }
        else if($row["bookingStatus"] == 1){
            echo "<td>Status: Bestätigt";      
        }
        else if($row["bookingStatus"] == 2){
            echo "<td>Status: Storniert";
        }

        echo "</tr>";
        echo "<br>";
        echo "<br>";
    } 
}
    
function compareDate($beginn, $end){
    $interval = (strtotime($end) - strtotime($beginn)) /60 /60 /24;

   // $interval = date_diff($beginn, $end);
    return $interval;
}

function adminCheck($conn, $username){
    $sql = "SELECT isAdmin FROM users WHERE username = ?;";
    $stmt = mysqli_stmt_init($conn);
    if(!mysqli_stmt_prepare($stmt, $sql)){
        header("location: ../rooms.php?error=statementfailed");
        exit();
    }
    mysqli_stmt_bind_param($stmt, "s", $username);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);
    $row = mysqli_fetch_assoc($result);
    $isAdmin = $row["isAdmin"];
    return $isAdmin;
    
}

function getUsername($conn){
    $sql = "SELECT * FROM users;";
    $stmt = mysqli_stmt_init($conn);
     if(!mysqli_stmt_prepare($stmt, $sql)){
            header("location: ../admin.php?error=statementfailed");
            exit();
        }
        mysqli_stmt_execute($stmt);
        $result = mysqli_stmt_get_result($stmt);
        $row = mysqli_fetch_assoc($result);
        
        
        while($row = mysqli_fetch_assoc($result)){
            echo "<tr>";
            echo "<td>User: " . $row ["username"] . "</td>";
            echo "<br>";
            echo "<td>Vorname: " . $row ["firstName"] . "</td>";
            echo "<br>";
            echo "<td>Nachname: " . $row ["lastName"] . "</td>";
            echo "<br>";
            echo "<td>Email: " . $row ["email"] . "</td>";
            echo "<br>";

            $active = $row["userStatus"];
            if($active == 0){
                echo "<td> - active</td>";
            }
            else{
                echo "<td> - inactive</td>";
            }
            echo "</tr>";
            echo "<br>";
            echo "<br>";
        }    
 }

function blockUser($conn, $userBlock){
    $sql = "SELECT userStatus FROM users WHERE username = ?;";
    $stmt = mysqli_stmt_init($conn);
    if(!mysqli_stmt_prepare($stmt, $sql)){
        header("location: ../admin.php?error=statementfailed");
        exit();
    }
    mysqli_stmt_bind_param($stmt, "s", $userBlock);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);
    $row = mysqli_fetch_assoc($result);
    $status = $row["userStatus"];

    if($status == 0){
        $sql = "UPDATE users SET userStatus = 1 WHERE username = ?;";
    }
    else{
        $sql = "UPDATE users SET userStatus = 0 WHERE username = ?;";
    }
    
    if(!mysqli_stmt_prepare($stmt, $sql)){
        header("location: ../admin.php?error=statementfailed");
        exit();
    }
    mysqli_stmt_bind_param($stmt, "s", $userBlock);
    mysqli_stmt_execute($stmt);


}

function showRooms($conn){
$sql = "SELECT * FROM rooms WHERE booked = 1;";
$stmt = mysqli_stmt_init($conn);
    if(!mysqli_stmt_prepare($stmt, $sql)){
        header("location: ../admin.php?error=statementfailed");
        exit();
    }
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);
    

    echo "<p>Gebuchte Zimmer:<p>";
    while($row = mysqli_fetch_assoc($result)){
        $sql = "SELECT username FROM users WHERE ID = ?;";
        $id = $row["userID"];
        if(!mysqli_stmt_prepare($stmt, $sql)){
            header("location: ../admin.php?error=statementfailed");
            exit();
        }
        mysqli_stmt_bind_param($stmt, "i", $id);
        mysqli_stmt_execute($stmt);
        $result2 = mysqli_stmt_get_result($stmt);
        $row2 = mysqli_fetch_assoc($result2);

        echo "<tr>";
        echo "<td>Gebucht von: " . $row2["username"] . "<td>";
        echo "<br>";
        echo "<td>Zimmer: " . $row["roomID"] . "<td>";
        echo "<br>";
        echo "<td>Größe: " . $row ["capacity"] . " Bett Zimmer<td>";
        echo "<br>";
        echo "<td>Anreise: " . $row["beginn"] . "<td>";
        echo "<br>";
        echo "<td>Abreise: " . $row["ende"] . "<td>";
        echo "<br>";
        if($row["breakfast"] == 1){
            echo "<td>Mit Frühstück - 30€/Tag";
        }
        else{
            echo "<td>Ohne Frühstück";
        }
        echo "<br>";
        if($row["parking"] == 1){
            echo "<td>Mit Parkplatz - 10€/Tag";
        }
        else{
            echo "<td>Ohne Parkplatz";
        }
        echo "<br>";
        if($row["pet"] == 1){
            echo "<td>Mit Haustier - 50€/Tag";
        }
        else{
            echo "<td>Ohne Haustier";
        }
        echo "<br>";
        echo "<td>Preis: " . $row["price"] . "€<td>";
        echo "<br>";
        if($row["bookingStatus"] == 0){
            echo "<td>Status: Neu";
        }
        else if($row["bookingStatus"] == 1){
            echo "<td>Status: Bestätigt";      
        }
        else if($row["bookingStatus"] == 2){
            echo "<td>Status: Storniert";
        }

        echo "</tr>";
        echo "<br>";
        echo "<br>";

    }
}

function changefName($username, $change, $conn){
    $sql = "UPDATE users SET firstName = ? WHERE username = ?;";
    $stmt = mysqli_stmt_init($conn);
    if(!mysqli_stmt_prepare($stmt, $sql)){
        header("location: ../admin.php?error=updatefailed");
        exit();
    }
    mysqli_stmt_bind_param($stmt, "ss", $change, $username);
    mysqli_stmt_execute($stmt);


}
function changelName($username, $change, $conn){
    $sql = "UPDATE users SET lastName = ? WHERE username = ?;";
    $stmt = mysqli_stmt_init($conn);
    if(!mysqli_stmt_prepare($stmt, $sql)){
        header("location: ../admin.php?error=updatefailed");
        exit();
    }
    mysqli_stmt_bind_param($stmt, "ss", $change, $username);
    mysqli_stmt_execute($stmt);


}
function changeMail($username, $change, $conn){
    $sql = "UPDATE users SET email = ? WHERE username = ?;";
    $stmt = mysqli_stmt_init($conn);
    if(!mysqli_stmt_prepare($stmt, $sql)){
        header("location: ../admin.php?error=updatefailed");
        exit();
    }
    mysqli_stmt_bind_param($stmt, "ss", $change, $username);
    mysqli_stmt_execute($stmt);


}

function changePwd($username, $pwd, $conn){

    $hashedPwd = password_hash($pwd, PASSWORD_DEFAULT);

    $sql = "UPDATE users SET pwd = ? WHERE username = ?;";
    $stmt = mysqli_stmt_init($conn);
    if(!mysqli_stmt_prepare($stmt, $sql)){
        header("location: ../admin.php?error=updatefailed");
        exit();
    }
    mysqli_stmt_bind_param($stmt, "ss", $hashedPwd, $username);
    mysqli_stmt_execute($stmt);
}