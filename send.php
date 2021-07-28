<?php
 
    
        $name= $_POST['name'];
        $email= $_POST['email'];
        $message= $_POST['message'];


        $name = htmlspecialchars($name);
        $email = htmlspecialchars($email);
        $message = htmlspecialchars($message);

        $name = urldecode($name);
        $email = urldecode($email);
        $message = urldecode($message);

        $name = trim($name);
        $email = trim($email);
        $message = trim($message);


        if (mail("rozan-ov@mail.ru",
                    "новое письмо с сайта",
                    "email : " .$email. "\n".
                    "name ".$name,
                    "From: no-reply@mydomain.ru \r\n")
        )  {
            echo ('Письмо успешно отправлено!');
        }

        else {
            echo ('Есть ошибки! Проверьте данные...');
        }
        
        ?>


