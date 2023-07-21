# 🔗shortener
**🔗shortener** is an open-source link shortening web application that allows users to beautify their URLs for easy sharing.

![🔗shortener homepage](client/public/trimurl.png)

## Features
1. Shorten long URLs to easily share them with others.
2. Redirect users to the original URL when they access the shortened link.
3. Saves shortened URLs in local storage.
4. Redirect URLs can be modified after creation.
5. URLs can be removed both from server and local storage.

## Technologies Used
### Frontend 
* **React** - For leveraging the sites interactivity and performance with the component model.
* **React Router** - Leveraging client side navigation.
* **Tailwind CSS** - Building modern user interface rapidly fast.
* **Shandcn UI** - UI library for accessible and beautifully designed components.

### Backend
* **Express** - For handling API requests and responses
* **MongoDB** - Used for storing all the urls with a unique identifier.
  
## Installation and Setup
    git clone https://github.com/johurul-haque/url-shortener

Navigate to the **client** directory and install dependencies: `npm install`

Run the frontend development server: `npm run host`

Access the application at http://localhost:3000.

Navigate to the **server** directory and add the MongoDB connection string to the .env file.

Run the backend server: `node index.js` or `nodemon .`

Access the application at http://localhost:5000.

## License
This project is licensed under the MIT License.
