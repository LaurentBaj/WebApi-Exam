# Candidate Number: 8033 - PG6301-Exam 

 *A web application for a messaging system* ✨

---

### Installation and Startup

1.Extracted zipped folder write 

2.Run this command in terminal to install the necessary dependencies ``` npm i ```

3.Run the app from terminal with ``` npm start ```

4.Enter the url: ```http://localhost:3000``` in your browser to see the application


## Design

The application comprises a chat, and a login section. 

The login section allows you to create users for your web app and edit their info.
Admin will be able to login with their Google account where they can create 
users and edit them. Only initiated users can log in to the chat where they can write messages 
that will be shown on the page. All these actions should be easy to navigate through the nav-bar 




## Shortcomings
These were all attempted but not successfully implemented: 

    - Users won't be able to write to each other
    
    - Messages written use web-sockets and show the names of the senders
        - However, should you open it in another browser then the messages will 
          render as if they all were written by the same user who is logged in 
    
    - Messages where supposed to be stored in in express and then filtered by 
      the user that wrote them
    
    - If a user logs in with a wrong incorrect username or password then it will not
      notify them 
   
---

### Shared 
The skeleton for the web app uses the mock exam which I did with another student (8086).
I suspect that we will structure our exams similarly. 
``https://github.com/LaurentBaj/MockExam-PG6301.git`` 
 





