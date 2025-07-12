---

# Library Internal Management Application

Welcome to the **Library Internal Management Application** project! This project was developed during my summer internship at Agevole Innovation Private Limited. It is designed to streamline library operations and enhance user experience. Below is a detailed account of the project's progress and the technologies used.

## Project Overview

The Library Internal Management Application is a web-based application that allows librarians to manage books, track borrowing and returning of books, manage user accounts, and generate insightful reports. The system includes functionalities such as:

- **Book Management**: Add, update, and delete books from the inventory.
- **User Management**: Register, update, and manage user profiles.
- **Transaction Management**: Handle the borrowing and returning of books.
- **Search and Filtering**: Search for books and users, filter results based on various criteria.
- **Reporting**: Generate reports on book availability and user activities.

## Development Progress

### Week 1: Introduction and Basics

- **13/5/24 (Monday)**: Introduction to the company and internship plan.
- **14/5/24 (Tuesday)**: Started learning frontend development.
- **15/5/24 (Wednesday)**: Learned React basics.
- **16/5/24 (Thursday)**: Learned Node.js basics.
- **17/5/24 (Friday)**: Learned Express.js basics.

### Week 2: Initial Tasks

- **20/5/24 (Monday)**: 
  - Task 1: Create a Database.
  - Task 2: Develop the Home page.
- **21/5/24 (Tuesday)**: 
  - Task 3: Create the Login Page.
- **22/5/24 (Wednesday)**: 
  - Task 3: Continued work on the Login Page.
- **23/5/24 (Thursday)**: 
  - Task 4: Develop the Signup Page.
  - Task 5: Create the Dashboard.
- **24/5/24 (Friday)**: 
  - Task 6: Implement the Add Book Form.

### Week 3: Intermediate Tasks

- **27/5/24 (Monday)**: 
  - Task 7: Display books by category.
- **28/5/24 (Tuesday)**: 
  - Task 7: Continued work on displaying books by category.
- **29/5/24 (Wednesday)**: 
  - Task 8: Implement the Delete Book Function.
  - Task 9: Create the Update Book Form.
- **30/5/24 (Thursday)**: 
  - Task 10: Add users form.
- **31/5/24 (Friday)**: 
  - Task 11: Display, delete, and update user functionality.

### Week 4: Advanced Tasks and Finalization

- **3/6/24 (Monday)**: 
  - Task 12: Add Loan Form.
- **5/6/24 (Wednesday)**: 
  - Task 13: Display, return, and delete loan functionality.
- **7/6/24 (Friday)**: 
  - Task 14: Implement Inventory Management.
  - Task 15: Exporting Loan Data.
- **10/6/24 (Monday)**: 
  - Task 15: Continued work on exporting loan data.
  - Task 16: Create Loan Data CSV.

## Summary of Technologies and Concepts Learned

- **GitHub**: Version control, repositories, branches, pull requests, issues, project boards, GitHub Actions.
- **HTML/CSS/JavaScript**: Front-end development, responsive design, user experience enhancements.
- **React**: Components, state management, hooks, component lifecycle.
- **Node.js/Express**: Server-side development, API creation, MongoDB integration.
- **MongoDB**: NoSQL database management, schema design, data handling.
- **Authentication/Authorization**: User registration, login, JWT, secure session handling.
- **Performance Optimization**: Caching strategies, query optimization.

## How to Run the Project

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/priyanshu6091/library-management-system.git
   ```

2. **Navigate to the Project Directory**:
   ```bash
   cd library-management-system
   ```

3. **Install Dependencies**:
   ```bash
   npm install
   ```

4. **Set Up the Environment Variables**:
   Create a `.env` file in the root directory and add your MongoDB connection string and other environment variables.
   ```
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   ```

5. **Run the Backend Server**:
   ```bash
   npm run server
   ```

6. **Run the Frontend**:
   Open another terminal window and start the React development server:
   ```bash
   npm start
   ```

7. **Access the Application**:
   Open your web browser and go to `http://localhost:3000`.

## Contributing

Contributions are welcome! Please fork this repository and submit a pull request with your improvements or suggestions.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Feel free to adjust this README to better suit your project's specifics and your personal experiences. Happy coding!
