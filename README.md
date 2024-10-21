# **Time Log Application ⏱**

> A time log application using PrimeReact, allowing users to track their time spent on various tasks. In this updated version, several features are added in order to enhance the user experince as they use the app. Some of the features added is a search functionality. This application utilizes the local storage for storing data's received from the users and implemented some React hooks such as useState and useEffect.

## To _Run_ the Application

To run the application, simply launch the terminal and enter ``npm start``.

The application then will be displayed in the selected browser either edge or chrome.

## Assignment 1 
### Features Implemented

### A Time Log Entry.

Users may enter the task particulars which includes task name, start time, end time, and a date. The task particulars can be enterd inside the textboxes right above the _Add New_ button.

<div align="center">
    <img src="src/Img/inputBox.png" alt="input box"  width="500" height="100"/>
    <p>Input Boxes</p>
</div>

### Delete a Time Log Entry.

The delete button will appear on each row of the table alongside the data provided in a table, allowing the users to be able to _delete_ the log added to the list by row.
The delete button works as deleting data in a row.

<div align="center">
    <img src="src/Img/deleteBtn.png" alt="delete btn"  width="200" height="100"/>
    <p>Delete Button</p>
</div>

### Display the Time Logs.

The time log added by the users will be displayed in the format of a table right bellow the submit button. It will display all the data entered by user together with a duration and a delete button.

<div align="center">
    <img src="src/Img/table.png" alt="log table"/>
<p>Time Log List Table</p>
</div>

### Duration for Each Task.

The users need to enter the task start time and their end time for it to calculate the total duration in minutes.

```
    const diff = (end - start) / 1000 / 60;
```
<p align="center">Part of code to calculate the duration and convert it to minutes.</p>


## Assignment 1.1
### Updated Version

- Introduced a card component to `app.js` to have a more appealing and structured appearance.
- Replaced the plain text box input together with add new button and delete button with PrimeReact components for a more interactive and better user interaction.
    <div align="center">
        <img src="src/Img/inputBox1.png" style="width: 500px;">
    <p>Input box</p>
    </div>

- Implemented sorting, filtering, and pagination to display the time logs in a proper manner.
      <div align="center">
        <img src="src/Img/filter1.png" style="width: 350px;">
    <p>Filter component for each header</p>
    </div>
        <div align="center">
        <img src="src/Img/pagination1.png" style="width: 350px;">
    <p>Pagination</p>
    </div>


- Applied a confirmation dialog along with a toast for deletion activity to avoid accidental deletion of logs.
    <div align="center">
        <img src="src/Img/confirmdialog1.png" style="width: 350px;">
    <p>Confirmation dialog</p>
    </div>
    <div align="center">
        <img src="src/Img/deletetoast.png" style="width: 350px;">
    <p>Delete toast</p>
    </div>

- All activities, including adding a new time log and deleting a time log, will have a toast prompt to keep the user aware of their activities.
    <div align="center">
        <img src="src/Img/addtime1.png" style="width: 350px;">
    <p>Add new time log activity</p>
    </div>

- Adapted the styling to be responsive to work on different screen sizes.
    <div align="center">
        <p>Medium screensize</p>
        <img src="src/Img/medium1.png" style="width: 350px;">
    </div>
    <div align="center">
        <img src="src/Img/medium2.png" style="width: 350px;">
        </div>
    </div>

    <div align="center">
        <p>Small screensize</p>
        <img src="src/Img/small1.png" style="width: 350px;">
    </div>
      <div align="center">
        <img src="src/Img/small2.png" style="width: 350px;">
    </div>


- Added a search function to allow users to find time logs conveniently.
      <div align="center">
        <img src="src/Img/search1.png" style="width: 300px;">
    <p>Search function</p>
    </div>


## Challenges Faced

Encountered several issues and challenges along the way to complete the application as :

- Getting familiarized with the PrimeReact and PrimeFlex library.
- Difficulties in styling the delete button as it sits a table.
- Adding a search function.
- Making the layout of the app to be responsive.
- To write the .env file.
