# CS 257 Project - Improving Data Integration with Fuzzy Matching Algorithms for Inconsistent Real-World Data

## Minimum Requirements
* Windows Operating System (might need extra setup with Mac/Linux)
* Node.JS v18.18.0
* Apache Server (preferred to use XAMPP)
* MySQL server (expected to run in localhost port 80) (preferred to use XAMPP)

## Setup
* First step of setup involves importing the SQL.
* Connect to MySQL and perform the following steps:
    * Create database: ```ecommerce```
    * Import the file: ```ecommerce.sql``` available in the root directory of the project.
* Second step of setup involves installation of dependencies, both for the frontend and backend.
* In the terminal (in the project root directory): 
    * ```npm install```
    * ```cd frontend```
    * ```npm install```

## Usage
* In the terminal (in the project root directory): 
    * ```npm start```
    * Open a browser, and go to: ```http://localhost:3001```
* The above command (```npm start```) will build the frontend and merge it with the backend, so that it works in the same port.
* If there is a failure in the above command (possibly with Mac/Linux), follow the below commands:
    * ```npm run easyStart```
    * ```cd frontend```
    * ```npm start```
    * Open a browser, and go to: ```http://localhost:3000```
    * Note that the port is different. This is because the frontend and backend are not running separately on independent ports (with backend running on port 3000).

## Contributions
### Ashish Agarwal: 
* Frontend Development on React.JS (Join Analysis)
* Backend Development (Join Analysis, Search feature, API creation, Database Development)
* Fuzzy Matching Engine Development (Levenshtein Distance)
* Documentation
* Research Analysis (Levenshtein Distance)
* Presentation 

### Mihir Satra
* Backend Development (Join Analysis, API creation, Database Development, Server Creation)
* Fuzzy Matching Engine Development (Soundex, Metaphone)
* Documentation
* Research Analysis (Soundex, Metaphone)
* Presentation

### Parth Joshi:
* Frontend Development on React.JS (Search Feature)
* Database Creation
* Fuzzy Matching Engine Development (Cosine Similarity)
* Documentation
* Research Analysis (Cosine Similarity)
* Presentation