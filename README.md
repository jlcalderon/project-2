# Household Optimizer
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Contents
* [Overview](#Overview)
* [License](#License)
* [Contributing](#Contributing)
* [Database Structure](#Database_Structure)
* [Privilege](#Privilege)
* [Demo](#Demo)
* [Questions](#Questions)
* [Go to live app](https://vast-mesa-04959.herokuapp.com/)

## Overview
Simple application that allows users keep track of essentials in their household. This app was made using NodeJS, Express, Handlebars, Sequelize ORM with MySQL Dialect, Passport package with Local Strategy, Jquery Ajax requests, Bootstrap CSS Library, and custom CSS stylings.


## License
This is an open source app. This app is cover under the **MIT** licences terms. For more information open this link to see the app licence terms of use [*Licence*](https://opensource.org/licenses/MIT)

## Contributing
Special thanks to Anees Azes, Brock Ehnert and Cyrus Hanson for their contributions to this project. If you would like to contribute like them, feel free to do so, please knos that any contribution will be check and verify before to add it to the production app environment. you can `fork` and `clone` this repository make your changes `push to your branch` and make a `pull request` to compare your code and the main branch across forks and put your changes/additions/corrections on this project.

## Database_Structure
Before to start contributing take a moment to analyze the app database structure:
![Database Relationships](/public/img/Household_optimizer.png)
[Link to open diagram online](https://dbdiagram.io/d/5f8f1aa53a78976d7b78710f)

## Privilege
The app allows two types of user to interact and take roles to update the inventory.
- Admin
- Regular

The Admin users have all granted access to: 
- create items in the inventory
- update the inventory manually
- create shopping list and assign them to a specific user including itself

The regular users have acceess to:
- see the inventory list but they can not edit it
- they can not create shoppingglists or items on the inventory
- they are allow to complete their asigned shopping list

## Users

By default we have two users set up for this project. one with admin privileges and one regular/standard user. Please see the users details below:

```
Admin user:
{ 
    userName: "admin",
    password: "admin"
}
Regular User:

{ 
    userName: "jhon",
    password: "1234"
}
```
Once you run the app you can create new regular/standarf users by clicking on the signing up button on the index page. Also if you need to create another admin, you can do so by hitting the following [ API POST Request ](https://vast-mesa-04959.herokuapp.com/api/signup/admin)
within the request body you need to send along the following ```JSON``` data:

```
{
    "userName": "Your user here",
    "email": "User's email here",
    "password": "your password here"
}
```


## Demo
![A Glimpse of this app](/public/img/Household-Optimizer_gif.gif)

## Questions
Any further question about this project email direct to <jlcalderonfuentes@gmail.com> feel free to reach out and follow me on [Github](https://github.com/jlcalderon)