# Finco - Personal Finance Tracker

## Original Repository and Alterations

The original repository can be found [here](https://github.com/allbutgold/finco).

Since the original project was developed collaboratively, there was some repetitive code. After reviewing the project, I made improvements by restructuring directories and optimizing components and pages. These changes were made to enhance code readability and promote the DRY (Don't Repeat Yourself) principle.

## Description

Finco is a personal finance tracker. This web application allows users to add and manage transactions, display and filter them in various ways. Additional features include setting a spending limit and creating a user account with a credit card and a profile image.

## Tech Stack

- **React.js**: Frontend UI components
- **Node.js & Express.js**: Backend Server
- **Chart.js**: Chart generation
- **MongoDB**: Database storage
- **SASS**: Styling

## Design

The design was provided by our bootcamp via a Figma file.

## Features

- **Animated Onboarding**: Users will meet an animated onboarding section after visiting for better engagement.
- **User Account Creation**: Create a personal account with a credit card and a profile image.
- **Transaction Management**: Add and manage your transactions efficiently.
- **Filtering and Display**: Display and filter your transactions in various ways to better understand your spending habits.
- **Spending Limit**: Set a spending limit to manage your finances better.

## Screenshots

Here are some screenshots of our application:

<p align="center">
<img src="https://github.com/ngynngchn/finco/assets/107808109/e8b6af0d-70d5-4dbf-8ce9-2abc567ed76d" width=45% height=50%>
</p>

<p>
    <img align="left" src="https://github.com/ngynngchn/finco/assets/107808109/744286a4-9f69-4f28-b0e9-7a8aead4d37d" width=22% height=30% >
    <img align="left" src="https://github.com/ngynngchn/finco/assets/107808109/66be818d-6e49-4e4f-9df2-e41c82a151ce" width=22% height=30%  >
    <img align="left" src="https://github.com/ngynngchn/finco/assets/107808109/50fb519b-d219-4fba-a5ba-11ea599d06fa" width=22% height=30%   >
    <img align="left" src="https://github.com/ngynngchn/finco/assets/107808109/3367d6bb-7380-4414-b560-6ef3b687c2ae" width=22% height=30% >
</p>

<br>

---

---

## Future Features

- **Forget Passoword**: Be able to reset your password.
- **Personal Description**: Add personal descriptions to transactions.
- **Delete and Edit**: Delete or Edit your transactions.

## Installation for further development

1. Clone the repository to your local machine.
2. This project is a mono-repository therefore run `npm install` to install the necessary dependencies after moving in to the backend and frontend directory.
3. Ensure you have a MongoDB account and your MongoDB connection string ready.
4. Update the `.env` file with the corresponding `env-sample` file for backend and frontend.
5. Change in to the backend directory and run `npm run dev` if you have the latest version of npm installed. Otherwise run `npm run dev:nodemon` to start the server.
6. Change in to the frontend directory and run `npm run dev -- --open` to open the finco application in your browser.
7. To check out our application on you phone you might as well run `npm run dev -- --host` and copy the IP address to youe mobile browser.

## Usage

After setting up your environment, create an account and test out our web-application!

## Credits and Acknowledgements

The original project was developed as the final project for our web development bootcamp. It's a collaborative work of three developers, mentioned under "Contributors". Special thanks to our instructors and everyone who provided their invaluable feedback during the development process.

## License

This project is licensed under the terms of the MIT license. See [LICENSE](LICENSE) for more details.
